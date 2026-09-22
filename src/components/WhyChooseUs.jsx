import { motion } from 'framer-motion'
import { Award, Users, Star, Calendar, Shield, CheckCircle, HeartPulse, Microscope } from 'lucide-react'

const stats = [
  { icon: Calendar, num: '10+', label: 'Years of Service' },
  { icon: Users, num: '25+', label: 'Expert Doctors' },
  { icon: HeartPulse, num: '50,000+', label: 'Happy Patients' },
  { icon: Star, num: '4.8/5', label: 'Patient Rating' },
]

const credentials = [
  { icon: Shield, text: 'Quality Healthcare Standards' },
  { icon: Award, text: 'Certified Medical Team' },
  { icon: Microscope, text: 'Modern Facilities & Equipment' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeIn = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="layout-container">
        <div className="why-wrap">
          <div className="why-left">
            <span className="section-label">Why Choose Us</span>
            <h2>Trusted by Thousands for Better Health</h2>
            <p>
              We are committed to delivering safe, effective and personalized care to every patient.
            </p>

            <motion.div
              className="why-stats"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
            >
              {stats.map((s) => (
                <motion.div className="why-stat" key={s.label} variants={fadeIn}>
                  <s.icon className="why-stat-icon" strokeWidth={1.6} />
                  <div className="why-stat-num">{s.num}</div>
                  <div className="why-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="why-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
          >
            <div className="why-credentials">
              <h4>Accreditations &amp; Credentials</h4>
              <ul className="why-list">
                {credentials.map((c) => (
                  <li className="why-item" key={c.text}>
                    <c.icon size={18} strokeWidth={1.6} />
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="why-testimonial-preview">
              <h4>What Our Patients Say</h4>
              <div className="why-preview-stars">★★★★★</div>
              <p className="why-preview-quote">
                "The staff is very friendly and professional. I felt well cared for throughout my visit. Highly recommended!"
              </p>
              <div className="why-preview-name">— Priya S.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}