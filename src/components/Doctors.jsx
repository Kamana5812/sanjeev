import { motion } from 'framer-motion'
import ananyaRao from '../assets/doctors/ananya-rao.jpg'
import vikramSen from '../assets/doctors/vikram-sen.jpg'
import meeraKapoor from '../assets/doctors/meera-kapoor.jpg'
import arjunMalhotra from '../assets/doctors/arjun-malhotra.jpg'

const doctors = [
  { name: 'Dr. Ananya Rao', spec: 'Cardiology', exp: '18 years experience', desc: 'Specializes in interventional cardiology and preventive heart health.', photo: ananyaRao },
  { name: 'Dr. Vikram Sen', spec: 'Neurology', exp: '15 years experience', desc: 'Focused on complex neurological disorders and stroke recovery.', photo: vikramSen },
  { name: 'Dr. Meera Kapoor', spec: 'Pediatrics', exp: '12 years experience', desc: 'Dedicated to compassionate, evidence-based child healthcare.', photo: meeraKapoor },
  { name: 'Dr. Arjun Malhotra', spec: 'Orthopedics', exp: '20 years experience', desc: 'Expert in joint replacement and sports injury rehabilitation.', photo: arjunMalhotra },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

export default function Doctors() {
  return (
    <section id="doctors" className="container">
      <div className="section-head">
        <span className="tagline">Our specialists</span>
        <h2>Experienced hands. Trusted judgment.</h2>
        <p>A team of specialists selected as much for their bedside manner as their credentials.</p>
      </div>

      <motion.div
        className="doctors-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {doctors.map((d) => (
          <motion.div className="doctor-card" key={d.name} variants={fadeUp}>
            <motion.div className="doctor-photo" whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }}>
              <img src={d.photo} alt={d.name} className="doctor-photo-img" />
            </motion.div>
            <div className="doctor-info">
              <h3>{d.name}</h3>
              <div className="doctor-spec">{d.spec}</div>
              <div className="doctor-exp">{d.exp}</div>
              <p className="doctor-desc">{d.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}