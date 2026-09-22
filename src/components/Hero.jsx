import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Shield, Stethoscope, Clock, Search, ChevronRight, ChevronLeft } from 'lucide-react'
import heroSlide1 from '../assets/hero-slide-1.jpg'
import heroSlide2 from '../assets/hero-slide-2.jpg'
import heroSlide3 from '../assets/hero-slide-3.jpg'

const EASE = [0.16, 1, 0.3, 1]

const slides = [
  {
    image: heroSlide1,
    badge: 'Compassionate Care. Expert Guidance.',
    headline: ['Your Health', 'Our Priority'],
    sub: 'At Sanjeev, we provide comprehensive, advanced and affordable healthcare for you and your family. Because your health matters — today and always.',
  },
  {
    image: heroSlide2,
    badge: 'Experienced Team. Trusted Care.',
    headline: ['Expert Doctors', 'Trusted Results'],
    sub: 'Our team of 30+ specialist doctors brings decades of clinical experience to deliver accurate diagnoses and personalized treatment plans.',
  },
  {
    image: heroSlide3,
    badge: 'Advanced Technology. Precise Diagnostics.',
    headline: ['Modern Equipment', 'Better Outcomes'],
    sub: 'State-of-the-art diagnostic and treatment technology for fast, accurate results — because precision matters when it comes to your health.',
  },
]

const trustItems = [
  { icon: Stethoscope, title: 'Experienced Doctors', sub: 'Skilled & Trusted' },
  { icon: Shield, title: 'Advanced Technology', sub: 'For Accurate Diagnosis' },
  { icon: Clock, title: '24/7 Support', sub: 'Always Here for You' },
]

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const SLIDE_INTERVAL = 5000

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index, dir) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1)
  }, [current, goTo])

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [next, paused, reduceMotion])

  const slide = slides[current]

  return (
    <>
      <section
        id="top"
        className="hero-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Sliding background images */}
        <div className="hero-slides-bg" aria-hidden="true">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              className="hero-slide-img"
              custom={direction}
              variants={reduceMotion ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: EASE }}
            >
              <img src={slide.image} alt="" loading={current === 0 ? 'eager' : 'lazy'} />
            </motion.div>
          </AnimatePresence>
          <div className="hero-slide-overlay" />
        </div>

        <div className="hero-inner">
          <motion.div
            className="hero-content"
            variants={container}
            initial={reduceMotion ? 'show' : 'hidden'}
            animate="show"
            key={`content-${current}`}
          >
            <motion.div className="hero-badge" variants={fadeUp}>
              <Shield size={16} />
              {slide.badge}
            </motion.div>

            <motion.h1 variants={fadeUp}>
              {slide.headline.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              {slide.sub}
            </motion.p>

            <motion.div className="hero-ctas" variants={fadeUp}>
              <a href="#contact" className="btn btn-primary">
                Book Appointment <ChevronRight size={16} />
              </a>
              <a href="#services" className="btn btn-secondary">
                Our Services <ChevronRight size={16} />
              </a>
            </motion.div>

            <motion.div className="hero-trust-indicators" variants={fadeUp}>
              {trustItems.map(item => (
                <div className="hero-trust-item" key={item.title}>
                  <div className="hero-trust-icon">
                    <item.icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="hero-trust-text">
                    <strong>{item.title}</strong>
                    <span>{item.sub}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Slide controls */}
          <div className="hero-slide-controls">
            <button type="button" className="hero-slide-arrow" onClick={prev} aria-label="Previous slide">
              <ChevronLeft size={20} />
            </button>
            <div className="hero-slide-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-dot ${i === current ? 'active' : ''}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" className="hero-slide-arrow" onClick={next} aria-label="Next slide">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <p className="demo-notice" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px 20px', color: 'rgba(255,255,255,0.6)' }}>
          Demonstration website · Clinic information, profiles and statistics are sample content.
        </p>
      </section>

      {/* Doctor Search Bar */}
      <div className="layout-container">
        <motion.div
          className="doctor-search-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
        >
          <div className="search-bar-title">
            <h3>Find a Doctor or Specialty</h3>
            <p>Search by doctor name, specialty or treatment...</p>
          </div>
          <div className="search-bar-grid">
            <div className="search-field">
              <label htmlFor="hero-search">Search</label>
              <input id="hero-search" type="text" placeholder="Search doctor, specialty or treatment..." />
            </div>
            <div className="search-field">
              <label htmlFor="hero-specialty">Specialty</label>
              <select id="hero-specialty" defaultValue="">
                <option value="">All Specialties</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>Dermatology</option>
                <option>Gynecology</option>
                <option>General Medicine</option>
                <option>Diagnostic Services</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="hero-location">Location</label>
              <select id="hero-location" defaultValue="">
                <option value="">All Locations</option>
                <option>New Delhi</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="hero-date">Date &amp; Time</label>
              <select id="hero-date" defaultValue="">
                <option value="">Next Available</option>
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
              </select>
            </div>
            <a href="#doctors" className="btn btn-primary" style={{ alignSelf: 'end' }}>
              <Search size={16} /> Search
            </a>
          </div>
        </motion.div>
      </div>
    </>
  )
}