import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Car, Accessibility, MessageCircle } from 'lucide-react'
import { DEPARTMENTS, EMPTY_CONTACT, validateContact } from '../../shared/contact.js'

const info = [
  { icon: MapPin, title: 'Clinic Location', text: '123 Wellness Street, Green Park, New Delhi – 110016' },
  { icon: Clock, title: 'Opening Hours', text: 'Mon – Sat: 8:00 AM – 8:00 PM\nSunday: 9:00 AM – 1:00 PM' },
  { icon: Car, title: 'Parking', text: 'Free parking available.' },
  { icon: Accessibility, title: 'Accessibility', text: 'Wheelchair friendly.' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ ...EMPTY_CONTACT })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ loading: false, kind: '', message: '' })
  const pending = useRef(null)

  useEffect(() => () => { pending.current?.abort(); pending.current = null }, [])

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))
    setErrors(previous => ({ ...previous, [name]: undefined }))
    setStatus({ loading: false, kind: '', message: '' })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (pending.current) return
    const { data, errors: validationErrors, valid } = validateContact(formData)
    setErrors(validationErrors)
    if (!valid) {
      setStatus({ loading: false, kind: 'error', message: 'Please correct the highlighted fields.' })
      document.getElementById(Object.keys(validationErrors)[0])?.focus()
      return
    }
    const controller = new AbortController()
    pending.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 35000)
    setStatus({ loading: true, kind: '', message: '' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), signal: controller.signal,
      })
      const result = await response.json().catch(() => null)
      if (pending.current !== controller) return
      if (!response.ok) {
        if (result?.details) setErrors(result.details)
        throw new Error(result?.error || 'The enquiry service is unavailable. Please try again later.')
      }
      if (!result || !['sent', 'preview'].includes(result.delivery)) {
        throw new Error('The server did not confirm the enquiry. Please contact the clinic before trying again.')
      }
      setStatus({ loading: false, kind: result.delivery === 'preview' ? 'preview' : 'success', message: result.message })
      if (result.delivery === 'sent') setFormData({ ...EMPTY_CONTACT })
    } catch (error) {
      if (pending.current !== controller) return
      setStatus({ loading: false, kind: 'error', message: error.name === 'AbortError'
        ? 'The request timed out. Delivery is uncertain; contact the clinic before submitting again.'
        : error instanceof TypeError ? 'Could not reach the server. Check your connection and try again.' : error.message })
    } finally {
      window.clearTimeout(timeout)
      if (pending.current === controller) pending.current = null
    }
  }

  const fieldProps = name => ({
    id: name, name, value: formData[name], onChange: handleChange,
    'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const fieldError = name => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null

  return (
    <section id="contact" className="contact-section">
      <div className="layout-container">
        <div className="section-head">
          <span className="section-label">Get in Touch</span>
          <h2>Visit Our Clinic</h2>
          <p>We're here to help. Get in touch or visit us at our convenient location.</p>
        </div>

        <div className="contact-grid">
          <div>
            <ul className="contact-info-list">
              {info.map(item => (
                <li key={item.title}>
                  <item.icon size={20} aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 12, padding: '16px', background: 'var(--soft-mint-light)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--deep-teal)', marginBottom: 4 }}>Sanjeev Health Clinic</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Green Park, New Delhi</p>
            </div>

            <div className="contact-actions">
              <a href="https://wa.me/919876543210" className="btn btn-primary btn-sm">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href="tel:+919876543210" className="btn btn-secondary btn-sm">
                <Phone size={16} /> Call Us
              </a>
            </div>

            <p className="contact-note">This template contains sample clinic details. Confirm the address and phone number with the clinic before travelling.</p>
            <p className="contact-note">This enquiry form is not monitored for emergencies.</p>
          </div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Appointment enquiry"
            aria-busy={status.loading}
            aria-describedby="contact-note"
          >
            {status.message && (
              <div className={`form-status ${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}>
                {status.message}
              </div>
            )}
            <fieldset disabled={status.loading}>
              <legend className="sr-only">Appointment enquiry details</legend>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input {...fieldProps('name')} type="text" autoComplete="name" required minLength={2} maxLength={50} placeholder="Your name" />
                  {fieldError('name')}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone number</label>
                  <input {...fieldProps('phone')} type="tel" autoComplete="tel" required maxLength={25} placeholder="Your phone" />
                  {fieldError('phone')}
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input {...fieldProps('email')} type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
                {fieldError('email')}
              </div>
              <div className="field">
                <label htmlFor="department">Department</label>
                <select {...fieldProps('department')} required>
                  <option value="" disabled>Select a department</option>
                  {DEPARTMENTS.map(department => <option key={department}>{department}</option>)}
                </select>
                {fieldError('department')}
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea {...fieldProps('message')} required minLength={5} maxLength={1000} placeholder="Briefly describe your callback request" />
                {fieldError('message')}
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input {...fieldProps('website')} tabIndex={-1} autoComplete="off" />
              </div>
              <p id="contact-note" className="contact-note">Your details will be emailed to the clinic for a callback. Avoid sending medical records or other sensitive information. An enquiry does not reserve an appointment.</p>
              <button type="submit" className="btn btn-primary btn-block" disabled={status.loading}>
                {status.loading ? 'Sending…' : 'Send Appointment Enquiry'}
              </button>
            </fieldset>
          </motion.form>
        </div>
      </div>
    </section>
  )
}