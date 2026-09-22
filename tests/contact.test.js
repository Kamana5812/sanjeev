import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createApp } from '../server/app.js'
import { DEPARTMENTS, validateContact } from '../shared/contact.js'

const valid = { name: 'Demo Visitor', email: 'visitor@example.test', phone: '+91 90000 00000', department: 'Cardiology', message: 'Please arrange a callback.', website: '' }
const smtpEnv = { MAIL_MODE: 'smtp', SMTP_HOST: 'smtp.example.test', SMTP_PORT: '587', SMTP_USER: 'sender@example.test', SMTP_PASS: 'test-only-value', COMPANY_EMAIL: 'clinic@example.test' }
async function serve(t, options = {}) {
  const messages = []
  const logs = []
  const app = createApp({
    env: { MAIL_MODE: 'preview' },
    createTransport: () => ({ sendMail: async mail => { messages.push(mail); return { accepted: ['clinic@example.test'] } } }),
    logger: { error: value => logs.push(value) }, ...options,
  })
  const server = app.listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(() => { server.closeAllConnections(); server.close() })
  const url = `http://127.0.0.1:${server.address().port}`
  const post = (body = valid, options = {}) => fetch(`${url}/api/contact`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), ...options,
  })
  return { url, post, messages, logs }
}

test('all advertised departments are accepted by shared validation', () => {
  for (const department of DEPARTMENTS) assert.equal(validateContact({ ...valid, department }).valid, true)
})
test('valid submissions are trimmed without mutating caller data', () => {
  const original = { ...valid, name: '  Demo Visitor  ' }
  const result = validateContact(original)
  assert.equal(result.data.name, valid.name)
  assert.equal(original.name, '  Demo Visitor  ')
})
for (const [label, body] of [
  ['missing body', undefined], ['null', null], ['array', []], ['number', 3],
  ['object name', { ...valid, name: {} }], ['numeric phone', { ...valid, phone: 9000000000 }],
  ['alphabetic phone', { ...valid, phone: 'abcdefghij' }], ['short phone', { ...valid, phone: '1234' }],
  ['invalid email', { ...valid, email: 'invalid@' }], ['long email', { ...valid, email: `${'a'.repeat(250)}@example.test` }],
  ['header injection', { ...valid, name: 'User\r\nBcc: attack@example.test' }],
  ['unknown department', { ...valid, department: 'Unlisted' }],
  ['blank message', { ...valid, message: '     ' }], ['nonstring message', { ...valid, message: {} }],
  ['long message', { ...valid, message: 'a'.repeat(1001) }], ['long name', { ...valid, name: 'a'.repeat(51) }],
  ['honeypot', { ...valid, website: 'https://spam.example.test' }],
]) {
  test(`shared validation rejects ${label}`, () => assert.equal(validateContact(body).valid, false))
}
test('preview confirms no mail was sent', async t => {
  const { post, messages } = await serve(t)
  const response = await post()
  assert.equal(response.status, 200)
  assert.equal((await response.json()).delivery, 'preview')
  assert.equal(messages.length, 0)
})
test('malformed field types return JSON 400 and never send mail', async t => {
  const { post, messages } = await serve(t, { env: smtpEnv })
  const response = await post({ ...valid, name: {}, phone: 1 })
  assert.equal(response.status, 400)
  const body = await response.json()
  assert.ok(body.details.name && body.details.phone)
  assert.equal(messages.length, 0)
})
test('malformed JSON returns a safe JSON error', async t => {
  const { post } = await serve(t)
  const response = await post(valid, { body: '{bad json' })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).error, 'The request contains invalid JSON.')
})
test('oversized JSON is rejected before email delivery', async t => {
  const { post, messages } = await serve(t)
  const response = await post({ ...valid, message: 'x'.repeat(20000) })
  assert.equal(response.status, 413)
  assert.equal(messages.length, 0)
})
test('only JSON content is accepted', async t => {
  const { post } = await serve(t)
  const response = await post(valid, { headers: { 'Content-Type': 'text/plain' } })
  assert.equal(response.status, 415)
})
test('missing SMTP settings return 503 without leaking configuration', async t => {
  const { post } = await serve(t, { env: {} })
  const response = await post()
  assert.equal(response.status, 503)
  assert.doesNotMatch(await response.text(), /SMTP|PASS|COMPANY_EMAIL/)
})
for (const production of [{ NODE_ENV: 'production' }, { VERCEL: '1' }]) {
  test(`preview cannot bypass email configuration in ${Object.keys(production)[0]}`, async t => {
    const { post } = await serve(t, { env: { MAIL_MODE: 'preview', ...production } })
    const response = await post()
    assert.equal(response.status, 503)
  })
}
test('SMTP success uses fixed sender and visitor reply-to', async t => {
  let transportOptions
  const messages = []
  const { post } = await serve(t, { env: smtpEnv, createTransport: options => {
    transportOptions = options
    return { sendMail: async mail => { messages.push(mail); return { accepted: [smtpEnv.COMPANY_EMAIL] } } }
  } })
  const response = await post()
  assert.equal(response.status, 200)
  assert.equal((await response.json()).delivery, 'sent')
  assert.deepEqual(messages[0].from, { name: 'SANJEEV Website', address: smtpEnv.SMTP_USER })
  assert.deepEqual(messages[0].replyTo, { name: valid.name, address: valid.email })
  assert.equal(messages[0].to, smtpEnv.COMPANY_EMAIL)
  assert.equal(transportOptions.requireTLS, true)
  assert.equal(transportOptions.secure, false)
  assert.equal(transportOptions.disableFileAccess, true)
})
test('implicit TLS is enabled on port 465', async t => {
  let configuration
  const { post } = await serve(t, { env: { ...smtpEnv, SMTP_PORT: '465' }, createTransport: options => {
    configuration = options
    return { sendMail: async () => ({ accepted: [smtpEnv.COMPANY_EMAIL] }) }
  } })
  assert.equal((await post()).status, 200)
  assert.equal(configuration.secure, true)
})
test('SMTP rejection produces safe JSON and no personal data in logs', async t => {
  const { post, logs } = await serve(t, { env: smtpEnv, createTransport: () => ({ sendMail: async () => { throw new Error(`${smtpEnv.SMTP_PASS} ${valid.email}`) } }) })
  const response = await post()
  assert.equal(response.status, 502)
  const output = (await response.text()) + logs.join(' ')
  assert.ok(!output.includes(smtpEnv.SMTP_PASS) && !output.includes(valid.email))
})
test('unaccepted SMTP recipient cannot produce success', async t => {
  const { post } = await serve(t, { env: smtpEnv, createTransport: () => ({ sendMail: async () => ({ accepted: [] }) }) })
  assert.equal((await post()).status, 502)
})
test('invalid SMTP port is a configuration error', async t => {
  const { post } = await serve(t, { env: { ...smtpEnv, SMTP_PORT: 'not-a-port' } })
  assert.equal((await post()).status, 503)
})
test('disallowed browser origin is blocked', async t => {
  const { post, messages } = await serve(t)
  const response = await post(valid, { headers: { 'Content-Type': 'application/json', Origin: 'https://untrusted.example.test' } })
  assert.equal(response.status, 403)
  assert.equal(messages.length, 0)
  assert.equal(response.headers.get('access-control-allow-origin'), null)
})
test('same-origin browser submission and preflight work', async t => {
  const { post, url } = await serve(t)
  const response = await post(valid, { headers: { 'Content-Type': 'application/json', Origin: url } })
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('access-control-allow-origin'), url)
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.equal(response.headers.get('x-powered-by'), null)
  const options = await fetch(`${url}/api/contact`, { method: 'OPTIONS', headers: { Origin: url, 'Access-Control-Request-Method': 'POST' } })
  assert.equal(options.status, 204)
})
test('explicit allowed cross-origin frontend works', async t => {
  const origin = 'https://frontend.example.test'
  const { post } = await serve(t, { env: { MAIL_MODE: 'preview', ALLOWED_ORIGINS: origin } })
  const response = await post(valid, { headers: { 'Content-Type': 'application/json', Origin: origin } })
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('access-control-allow-origin'), origin)
})
test('rate limiting returns Retry-After and expires', async t => {
  let time = 1000
  const { post } = await serve(t, { now: () => time })
  for (let i = 0; i < 5; i += 1) assert.equal((await post()).status, 200)
  const limited = await post()
  assert.equal(limited.status, 429)
  assert.equal(limited.headers.get('retry-after'), '60')
  time += 60001
  assert.equal((await post()).status, 200)
})
test('health, unknown API route and unsupported methods have defined responses', async t => {
  const { url } = await serve(t)
  const health = await fetch(`${url}/api/health`)
  assert.deepEqual(await health.json(), { ok: true })
  assert.equal((await fetch(`${url}/api/missing`)).status, 404)
  const get = await fetch(`${url}/api/contact`)
  assert.equal(get.status, 405)
  assert.equal(get.headers.get('allow'), 'POST, OPTIONS')
})