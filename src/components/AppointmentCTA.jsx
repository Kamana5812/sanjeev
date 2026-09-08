import { motion } from 'framer-motion'

export default function AppointmentCTA() {
  return (
    <section id="appointment" className="cta-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Your Health Deserves Exceptional Care.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Take the first step toward better health with SANJEEV.
        </motion.p>
        <motion.a
          href="#contact"
          className="btn btn-light"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Book an Appointment
        </motion.a>
      </div>
    </section>
  )
}