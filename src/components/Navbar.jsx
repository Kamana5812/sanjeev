import { useEffect, useRef, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'Departments', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60)
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  const trigger = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1101px)')
    const onResize = () => { if (desktop.matches) dialog.current?.close() }
    desktop.addEventListener('change', onResize)
    return () => desktop.removeEventListener('change', onResize)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  const closeMenu = () => dialog.current?.close()

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="navbar-inner">
          <a href="#top" className="navbar-logo">
            <span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="logo-leaf">🌿</span> Sanjeev
              </span>
              <span className="logo-tagline">Health Today — Brighter Tomorrow</span>
            </span>
          </a>

          <ul className="nav-links">
            {links.map(link => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>

          <div className="nav-right">
            <a href="tel:+919876543210" className="navbar-phone">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </a>
            <a href="#contact" className="btn appointment-link">Book Appointment</a>
            <button
              ref={trigger}
              type="button"
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {open && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <button 
            type="button" 
            className="menu-close" 
            autoFocus 
            aria-label="Close menu" 
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>
          {links.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => {
                setOpen(false)
                // Fallback smooth scroll to handle overflow hidden delays
                if (link.href.startsWith('#')) {
                  e.preventDefault()
                  setTimeout(() => {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', link.href)
                  }, 50)
                }
              }}
            >
              {link.label}
            </a>
          ))}
          <a 
            className="btn btn-gold" 
            href="#contact" 
            onClick={(e) => {
              setOpen(false)
              e.preventDefault()
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                window.history.pushState(null, '', '#contact')
              }, 50)
            }}
          >
            Book Appointment
          </a>
        </div>
      )}
    </>
  )
}