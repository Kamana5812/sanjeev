import { motion } from 'framer-motion'
import { DoorOpen, ScanLine, Microscope, Pill, Armchair, ShieldCheck } from 'lucide-react'

const facilities = [
  { name: 'Consultation Rooms', icon: DoorOpen },
  { name: 'Diagnostic Lab', icon: ScanLine },
  { name: 'Pharmacy', icon: Pill },
  { name: 'Waiting Lounge', icon: Armchair },
  { name: 'Clean & Safe Environment', icon: ShieldCheck },
  { name: 'Laboratory', icon: Microscope },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

export default function Facilities() {
  return (
    <section className="facilities-section">
      <div className="layout-container">
        <div className="section-head">
          <span className="section-label">Our Facilities</span>
          <h2>Modern Infrastructure for Better Care</h2>
          <p>State-of-the-art facilities designed for your comfort and safety.</p>
        </div>

        <motion.div
          className="facilities-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {facilities.map(facility => (
            <motion.div
              key={facility.name}
              className="facility-tile"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <facility.icon size={40} strokeWidth={1.4} aria-hidden="true" />
              <h3 className="facility-label">{facility.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}