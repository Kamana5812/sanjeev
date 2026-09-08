import { motion } from 'framer-motion'

const facilities = [
  { name: 'Modern Consultation Rooms', wide: true },
  { name: 'Advanced Diagnostic Equipment', wide: false },
  { name: 'Laboratory', wide: false },
  { name: 'Pharmacy', wide: true },
  { name: 'Comfortable Patient Areas', wide: false },
  { name: 'Emergency Facilities', wide: false },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const reveal = { hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

export default function Facilities() {
  return (
    <section className="container">
      <div className="section-head">
        <span className="tagline">Facilities</span>
        <h2>Spaces built for comfort as much as capability.</h2>
      </div>

      <motion.div
        className="facilities-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {facilities.map((f) => (
          <motion.div
            className={`facility-tile ${f.wide ? 'wide' : ''}`}
            key={f.name}
            variants={reveal}
            whileHover={{ scale: 1.015 }}
          >
            <div className="facility-label">{f.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}