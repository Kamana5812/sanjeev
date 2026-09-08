import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'on-dark'}`}>
        <div className="navbar-inner">
          <a href="#top" className="navbar-logo">SANJEEV</a>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>

          <div className="nav-right">
            <a href="#appointment" className="btn btn-outline" style={scrolled ? {} : { borderColor: 'rgba(247,243,234,0.5)' }}>
              Book an Appointment
            </a>
            <button className="nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{ position: 'absolute', top: 26, right: 26, background: 'none', border: 'none', color: 'inherit' }}
            >
              <X size={30} />
            </button>
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}