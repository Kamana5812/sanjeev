import { motion } from 'framer-motion'
import { HeartPulse, Brain, Bone, Baby, Sparkles, Stethoscope, Activity, ScanLine } from 'lucide-react'

const services = [
  { icon: HeartPulse, title: 'Cardiology', text: 'Comprehensive heart care from prevention to advanced intervention.' },
  { icon: Brain, title: 'Neurology', text: 'Diagnosis and treatment of conditions of the brain and nervous system.' },
  { icon: Bone, title: 'Orthopedics', text: 'Joint, bone, and mobility care for every stage of life.' },
  { icon: Baby, title: 'Pediatrics', text: 'Gentle, thorough care for infants, children, and adolescents.' },
  { icon: Sparkles, title: 'Dermatology', text: 'Medical and cosmetic skin care from experienced dermatologists.' },
  { icon: Stethoscope, title: 'Gynecology', text: 'Women’s health care across every life stage, delivered with dignity.' },
  { icon: Activity, title: 'General Medicine', text: 'Whole-person primary care and preventive health management.' },
  { icon: ScanLine, title: 'Diagnostic Services', text: 'Advanced imaging and lab diagnostics with fast, accurate results.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }

export default function Services() {
  return (
    <section id="services" className="container">
      <div className="section-head">
        <span className="tagline">Departments &amp; services</span>
        <h2>Specialized care, organized around you.</h2>
        <p>Eight core departments, each staffed by specialists who treat the full picture — not just the symptom.</p>
      </div>

      <motion.div
        className="services-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {services.map((s) => (
          <motion.div
            className="service-card"
            key={s.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <s.icon className="service-icon" size={30} strokeWidth={1.4} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}