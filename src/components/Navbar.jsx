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
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={() => { dialog.current.showModal(); setOpen(true) }}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Mobile navigation"
        onKeyDown={event => {
          if (event.key !== 'Tab') return
          const controls = [...event.currentTarget.querySelectorAll('button, a[href]')]
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
        }}
        onClick={event => { if (event.target === event.currentTarget) closeMenu() }}
        onClose={() => {
          setOpen(false)
          if (trigger.current?.getClientRects().length) trigger.current.focus()
        }}
      >
        <button type="button" className="menu-close" autoFocus aria-label="Close menu" onClick={closeMenu}>
          <X size={28} />
        </button>
        {links.map(link => (
          <a key={link.label} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a className="btn btn-gold" href="#contact" onClick={closeMenu}>Book Appointment</a>
      </dialog>
    </>
  )
}