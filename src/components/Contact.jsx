import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react'

const info = [
  { icon: MapPin, title: 'Clinic Address', text: '221 Wellness Avenue, Lucknow, Uttar Pradesh 226001' },
  { icon: Phone, title: 'Phone', text: '+91 522 400 1234' },
  { icon: Mail, title: 'Email', text: 'care@sanjeevclinic.com' },
  { icon: Clock, title: 'Opening Hours', text: 'Mon–Sat, 8:00 AM – 8:00 PM' },
  { icon: AlertCircle, title: 'Emergency', text: '+91 522 400 9999 (24/7)' },
]

export default function Contact() {
  return (
    <section id="contact" className="container">
      <div className="section-head">
        <span className="tagline">Get in touch</span>
        <h2>Visit us, call us, or request a callback.</h2>
      </div>

      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ul className="contact-info-list">
            {info.map((i) => (
              <li key={i.title}>
                <i.icon size={20} strokeWidth={1.5} />
                <div>
                  <h4>{i.title}</h4>
                  <p>{i.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="map-placeholder">Map placeholder</div>
        </motion.div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" type="tel" placeholder="Your phone" required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="department">Department</label>
            <select id="department" defaultValue="">
              <option value="" disabled>Select a department</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Orthopedics</option>
              <option>Pediatrics</option>
              <option>Dermatology</option>
              <option>Gynecology</option>
              <option>General Medicine</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Tell us briefly what you need" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            Request Appointment
          </button>
        </motion.form>
      </div>
    </section>
  )
}