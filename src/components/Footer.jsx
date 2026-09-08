import { useState } from 'react'

const quickLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '#about' },
  { label: 'Departments', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Health Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  { label: 'Cardiology', href: '#services' },
  { label: 'Neurology', href: '#services' },
  { label: 'Orthopedics', href: '#services' },
  { label: 'Health Checkups', href: '#packages' },
  { label: 'Book Appointment', href: '#appointment' },
]

const legal = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Refund Policy', href: '#' },
  { label: 'Support: care@sanjeevclinic.com', href: 'mailto:care@sanjeevclinic.com' },
]

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/915224001234', icon: WhatsappIcon },
  { label: 'Call us', href: 'tel:+915224001234', icon: PhoneIcon },
  { label: 'Email us', href: 'mailto:care@sanjeevclinic.com', icon: MailIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'YouTube', href: '#', icon: YoutubeIcon },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <SuusriLogo className="footer-logo" />

            <p className="footer-desc">
              Lucknow&rsquo;s trusted destination for calm, human-centered
              healthcare. 25+ years of excellence, 50,000+ patients served, and
              ISO-certified hygiene &mdash; medicine practiced with dignity.
            </p>

            <p className="footer-powered">Powered by Suusri AI</p>

            <div className="footer-contact">
              <span className="footer-contact-item footer-address">
                <MapPinIcon />
                <span>221 Wellness Avenue, Lucknow, Uttar Pradesh 226001</span>
              </span>
              <span className="footer-contact-item">
                <a href="tel:+915224001234"><PhoneIcon /> +91 522 400 1234</a>
                <a href="mailto:care@sanjeevclinic.com"><MailIcon /> care@sanjeevclinic.com</a>
              </span>
            </div>

            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`footer-social ${s.label === 'WhatsApp' ? 'is-whatsapp' : ''}`}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" links={quickLinks} />
          <FooterCol title="Services" links={services} />
          <FooterCol title="Legal & Help" links={legal} />
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {year} SANJEEV Healthcare. All rights reserved. Lucknow, Uttar Pradesh
          </span>
          <span className="footer-bottom-contact">
            <a href="tel:+915224001234">+91 522 400 1234</a>
            <span className="dot">&bull;</span>
            <a href="mailto:care@sanjeevclinic.com">care@sanjeevclinic.com</a>
          </span>
        </div>

        <div className="footer-credit">
          Built by <strong>Kamana Agrawal</strong>
          <span className="sep">&bull;</span>
          Powered &amp; Represented by
          <SuusriLogo className="footer-credit-logo" />
          <span className="sep">&bull;</span>
          Advancing Care. Enriching Life.
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div className="footer-col">
      <h4>{title}</h4>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Falls back to a styled gold wordmark until /suusri-logo.png is added to public/. */
function SuusriLogo({ className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span className={`suusri-wordmark ${className}`}>
        Suusri<span className="ai">AI</span>
      </span>
    )
  }
  return (
    <img
      src="/SuuSri_AI_Dark_Theme_UltraHD.svg"
      alt="Suusri AI"
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

/* ---------- inline icons ---------- */

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.12.82.83-3.04-.19-.31a8.02 8.02 0 0 1-1.26-4.36c0-4.46 3.63-8.09 8.09-8.09Zm-2.6 4.35c-.15 0-.4.06-.6.29-.2.23-.79.77-.79 1.88 0 1.1.81 2.17.92 2.32.11.15 1.57 2.5 3.9 3.4 1.94.76 2.34.61 2.76.57.42-.04 1.36-.55 1.55-1.09.19-.53.19-.99.13-1.09-.06-.09-.2-.15-.42-.26-.23-.11-1.36-.67-1.57-.75-.21-.08-.36-.11-.51.12-.15.23-.58.75-.71.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.28-1.59-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.4.11-.13.15-.22.23-.37.08-.15.04-.29-.02-.4-.06-.12-.5-1.24-.7-1.7-.18-.44-.37-.38-.5-.39l-.43-.01Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9V7c0-.9.6-1.1 1-1.1h2V2.9L14.3 2.9C11.6 2.9 11 4.9 11 6.5V9H9v3h2v9h3v-9h2.2l.3-3H14Z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 12s0-3.1-.4-4.6a2.6 2.6 0 0 0-1.8-1.8C19.2 5.2 12 5.2 12 5.2s-7.2 0-8.8.4A2.6 2.6 0 0 0 1.4 7.4C1 8.9 1 12 1 12s0 3.1.4 4.6a2.6 2.6 0 0 0 1.8 1.8c1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4a2.6 2.6 0 0 0 1.8-1.8C23 15.1 23 12 23 12ZM9.8 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
  )
}

