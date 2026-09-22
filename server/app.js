import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'node:url'
import { validateContact, isEmail } from '../shared/contact.js'

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true })

// Best-effort protection for one instance. Add an edge/shared limit before
// accepting public traffic across multiple server instances.
function createLimiter(now) {
  const clients = new Map()
  return (req, res, next) => {
    const time = now()
    for (const [key, value] of clients) {
      if (value.reset <= time) clients.delete(key)
    }
    // Do not trust caller-supplied forwarding headers.
    const key = req.socket.remoteAddress || 'unknown'
    let bucket = clients.get(key)
    if (!bucket) {
      if (clients.size >= 10000) {
        res.set('Retry-After', '60')
        return res.status(429).json({ error: 'Please try again in a minute.' })
      }
      bucket = { count: 0, reset: time + 60000 }
      clients.set(key, bucket)
    }
    bucket.count += 1
    if (bucket.count > 5) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((bucket.reset - time) / 1000))))
      return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' })
    }
    next()
  }
}

function smtpConfig(env) {
  const port = Number(env.SMTP_PORT)
  const user = env.SMTP_USER?.trim()
  const recipient = env.COMPANY_EMAIL?.trim()
  const sender = env.SMTP_FROM?.trim() || user
  if (!env.SMTP_HOST?.trim() || !Number.isInteger(port) || port < 1 || port > 65535 ||
      !user || !env.SMTP_PASS || !isEmail(sender) || !isEmail(recipient)) return null
  return {
    options: {
      host: env.SMTP_HOST.trim(), port, secure: port === 465, requireTLS: port !== 465,
      auth: { user, pass: env.SMTP_PASS },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
      disableFileAccess: true, disableUrlAccess: true,
    },
    sender, recipient,
  }
}

export function createApp({ env = process.env, createTransport = nodemailer.createTransport, now = Date.now, logger = console } = {}) {
  const app = express()
  app.disable('x-powered-by')
  const allowedOrigins = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean)
  const limiter = createLimiter(now)
  let transporter

  app.use('/api', (req, res, next) => {
    res.set({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
    const origin = req.get('origin')
    let sameHost = false
    try {
      const url = new URL(origin)
      sameHost = ['http:', 'https:'].includes(url.protocol) && url.host === req.get('host')
    } catch { /* Non-browser clients need not send Origin. */ }
    if (origin && !sameHost && !allowedOrigins.includes(origin)) {
      return res.status(403).json({ error: 'This origin is not allowed.' })
    }
    cors({ origin: origin || false, methods: ['POST', 'GET', 'OPTIONS'], allowedHeaders: ['Content-Type'] })(req, res, next)
  })

  app.get('/api/health', (_req, res) => res.json({ ok: true }))
  app.post('/api/contact', limiter, (req, res, next) => {
    if (!req.is('application/json')) return res.status(415).json({ error: 'Send the request as JSON.' })
    next()
  }, express.json({ limit: '16kb' }), async (req, res) => {
    const { data, errors, valid } = validateContact(req.body)
    if (!valid) return res.status(400).json({ error: 'Please correct the highlighted fields.', details: errors })
    // Local preview never sends mail and is forbidden on Vercel/production.
    if (env.MAIL_MODE === 'preview' && env.NODE_ENV !== 'production' && !env.VERCEL) {
      return res.json({ delivery: 'preview', message: 'Preview only: the form works, but no email was sent or appointment booked.' })
    }
    const config = smtpConfig(env)
    if (!config) return res.status(503).json({ error: 'Email requests are currently unavailable. Please contact the clinic directly.' })
    try {
      transporter ??= createTransport(config.options)
      const result = await transporter.sendMail({
        from: { name: 'SANJEEV Website', address: config.sender },
        to: config.recipient,
        replyTo: { name: data.name, address: data.email },
        subject: `Appointment enquiry - ${data.department}`,
        text: [
          'New appointment enquiry (not a confirmed booking).', '',
          `Name: ${data.name}`, `Phone: ${data.phone}`, `Email: ${data.email}`,
          `Department: ${data.department}`, '', 'Message:', data.message,
        ].join('\n'),
      })
      if (!result.accepted?.length) throw new Error('Recipient not accepted')
      return res.json({ delivery: 'sent', message: 'Your enquiry was accepted by our email service. The clinic must contact you to confirm an appointment.' })
    } catch {
      // Never log submitted data, credentials, or raw SMTP errors.
      logger.error('Contact email could not be delivered.')
      return res.status(502).json({ error: 'We could not send your enquiry. Please try again later or contact the clinic.' })
    }
  })
  app.all('/api/contact', (_req, res) => {
    res.set('Allow', 'POST, OPTIONS').status(405).json({ error: 'Use POST for this endpoint.' })
  })
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API endpoint not found.' }))
  app.use((err, _req, res, next) => {
    if (res.headersSent) return next(err)
    if (err.type === 'entity.too.large') return res.status(413).json({ error: 'The request is too large.' })
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'The request contains invalid JSON.' })
    logger.error('Contact API request failed.')
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' })
  })
  return app
}