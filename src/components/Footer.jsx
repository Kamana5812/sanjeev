import { useState } from 'react'
import { MapPin, Phone, Mail, Heart } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#top' }, { label: 'Our Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' }, { label: 'Departments', href: '#services' },
  { label: 'About Us', href: '#about' }, { label: 'Contact', href: '#contact' },
]
const services = [
  { label: 'General Medicine', href: '#services' }, { label: 'Cardiology', href: '#services' },
  { label: 'Dermatology', href: '#services' }, { label: 'Gynecology', href: '#services' },
  { label: 'Orthopedics', href: '#services' }, { label: 'Pediatrics', href: '#services' },
]
const resources = [
  { label: 'Health Articles', href: '#' }, { label: 'FAQs', href: '#faq' },
  { label: 'Patient Forms', href: '#' }, { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="layout-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo-text">
              <span className="logo-leaf">🌿</span> Sanjeev
            </div>
            <p className="footer-desc">
              SANJEEV healthcare website demonstration. Explore departments, meet the illustrative specialist team and try the appointment enquiry form.
            </p>
            <p className="footer-powered">Powered by Suusri AI</p>
            <div className="footer-contact">
              <span className="footer-contact-item footer-address">
                <MapPin aria-hidden="true" />
                <span>123 Wellness Street, Green Park, New Delhi – 110016</span>
              </span>
              <span className="footer-contact-item">
                <a href="tel:+919876543210"><Phone aria-hidden="true" /> +91 98765 43210</a>
              </span>
              <span className="footer-contact-item">
                <a href="mailto:care@sanjeevclinic.com"><Mail aria-hidden="true" /> care@sanjeevclinic.com</a>
              </span>
            </div>
            <div className="footer-socials">
              <a href="tel:+919876543210" className="footer-social" aria-label="Call the clinic"><Phone size={16} /></a>
              <a href="mailto:care@sanjeevclinic.com" className="footer-social" aria-label="Email the clinic"><Mail size={16} /></a>
            </div>
          </div>
          <FooterCol title="Quick Links" links={quickLinks} />
          <FooterCol title="Services" links={services} />
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              {resources.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="footer-tagline">
          <Heart size={16} /> Your Health, Our Commitment.
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Sanjeev Health Clinic. All rights reserved.</span>
          <span>New Delhi, India</span>
        </div>

        <div className="footer-credit">
          Built by <strong>Kamana Agrawal</strong>
          <span aria-hidden="true">•</span>
          Powered &amp; Represented by <SuusriLogo className="footer-credit-logo" />
          <span aria-hidden="true">•</span>
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
      <ul>{links.map(link => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
    </div>
  )
}

function SuusriLogo({ className = '' }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className={`suusri-wordmark ${className}`}>Suusri<span className="ai">AI</span></span>
  return <img src="/SuuSri_AI_Dark_Theme_UltraHD.svg" alt="Suusri AI" className={className} loading="lazy" onError={() => setFailed(true)} />
}