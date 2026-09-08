import { motion, useReducedMotion } from 'framer-motion'
import HeroVideoBackground from './HeroVideoBackground.jsx'

const EASE = [0.16, 1, 0.3, 1]

const lineWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
}
const line = {
  hidden: { y: '112%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

const outlineBtnStyle = { borderColor: 'rgba(247,243,234,0.5)', color: '#f7f3ea' }

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero-wrapper">
      <div className="hero-pin is-static">
        <HeroVideoBackground />
        <div className="hero-scrim" />

        <div className="hero-frame">
          <span className="hero-frame-corner tl" />
          <span className="hero-frame-corner tr" />
        </div>

        <div className="hero-content">
          <motion.span
            className="hero-brand"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            SANJEEV
          </motion.span>

          <motion.h1 variants={lineWrap} initial="hidden" animate="show">
            <span className="hero-line-mask">
              <motion.span className="hero-line" variants={line}>Advanced Healthcare.</motion.span>
            </span>
            <span className="hero-line-mask">
              <motion.span className="hero-line" variants={line}>Human-Centered Care.</motion.span>
            </span>
          </motion.h1>

          <motion.span
            className="hero-accent-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 1.05 }}
          />

          <motion.p className="hero-sub" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 1.15 }}>
            Exceptional medical care combining experienced specialists, advanced
            technology, and a patient-first approach.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 1.3 }}>
            <a href="#appointment" className="btn btn-primary">Book an Appointment</a>
            <a href="#services" className="btn btn-outline" style={outlineBtnStyle}>Explore Our Services</a>
          </motion.div>
        </div>

        <div className="hero-meta">Advancing Care. Enriching Life.</div>

        {!reduceMotion && (
          <div className="hero-scroll-cue">
            <span>Scroll</span>
            <div className="hero-scroll-line">
              <motion.span
                animate={{ y: ['-100%', '140%'] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}