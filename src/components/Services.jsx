import { motion } from 'framer-motion'
import { HeartPulse, Brain, Bone, Baby, Sparkles, Stethoscope, Activity, ScanLine, ChevronRight } from 'lucide-react'

const services = [
  { icon: HeartPulse, title: 'General Medicine' },
  { icon: HeartPulse, title: 'Cardiology' },
  { icon: Sparkles, title: 'Dermatology' },
  { icon: Stethoscope, title: 'Gynecology' },
  { icon: Bone, title: 'Orthopedics' },
  { icon: Baby, title: 'Pediatrics' },
  { icon: Brain, title: 'ENT' },
  { icon: Activity, title: 'Ophthalmology' },
  { icon: ScanLine, title: 'Dental Care' },
  { icon: Brain, title: 'Physiotherapy' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="layout-container">
        <div className="section-head-row">
          <div className="section-head">
            <span className="section-label">Our Services</span>
            <h2>Comprehensive Care Across Specialties</h2>
            <p>From preventive care to advanced treatment, we offer a wide range of medical services under one roof.</p>
          </div>
          <a href="#services" className="view-all-link">
            View All Services <ChevronRight size={16} />
          </a>
        </div>

        <motion.div
          className="services-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {services.map((s) => (
            <motion.div
              className="service-card"
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="service-icon">
                <s.icon size={26} strokeWidth={1.6} />
              </div>
              <h3>{s.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}