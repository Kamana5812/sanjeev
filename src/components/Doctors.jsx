import { motion } from 'framer-motion'
import { Award, Clock, GraduationCap, ChevronRight } from 'lucide-react'
import ananyaRao from '../assets/doctors/ananya-rao.jpg'
import vikramSen from '../assets/doctors/vikram-sen.jpg'
import meeraKapoor from '../assets/doctors/meera-kapoor.jpg'
import arjunMalhotra from '../assets/doctors/arjun-malhotra.jpg'

const doctors = [
  {
    name: 'Dr. Rajesh Mehta',
    spec: 'General Physician',
    exp: '15+ years experience',
    qual: 'MBBS, MD (General Medicine)',
    avail: 'Available Today 9:00 AM – 2:00 PM',
    photo: ananyaRao,
  },
  {
    name: 'Dr. Anita Sharma',
    spec: 'Cardiologist',
    exp: '12+ years experience',
    qual: 'MBBS, MD (Cardiology)',
    avail: 'Available Today 10:00 AM – 4:00 PM',
    photo: vikramSen,
  },
  {
    name: 'Dr. Vikram Singh',
    spec: 'Orthopedic Surgeon',
    exp: '18+ years experience',
    qual: 'MBBS, MS (Orthopedics)',
    avail: 'Available Tomorrow 9:00 AM – 1:00 PM',
    photo: meeraKapoor,
  },
  {
    name: 'Dr. Meera Kapoor',
    spec: 'Pediatrics',
    exp: '10+ years experience',
    qual: 'MBBS, DCH (Pediatrics)',
    avail: 'Available Today 11:00 AM – 5:00 PM',
    photo: arjunMalhotra,
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

export default function Doctors() {
  return (
    <section id="doctors" className="doctors-section">
      <div className="layout-container">
        <div className="section-head-row">
          <div className="section-head">
            <span className="section-label">Our Doctors</span>
            <h2>Meet Our Expert Doctors</h2>
            <p>Compassionate. Experienced. Always here for you.</p>
          </div>
          <a href="#doctors" className="view-all-link">
            View All Doctors <ChevronRight size={16} />
          </a>
        </div>

        <motion.div
          className="doctors-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {doctors.map((d) => (
            <motion.div className="doctor-card" key={d.name} variants={fadeUp}>
              <div className="doctor-photo">
                <img src={d.photo} alt={d.name} className="doctor-photo-img" loading="lazy" width="600" height="800" />
              </div>
              <div className="doctor-info">
                <h3>{d.name}</h3>
                <div className="doctor-spec">{d.spec}</div>
                <div className="doctor-exp">
                  <Award size={14} /> {d.exp}
                </div>
                <div className="doctor-qual">
                  <GraduationCap size={14} /> {d.qual}
                </div>
                <div className="doctor-avail">
                  <Clock size={14} /> {d.avail}
                </div>
                <a href="#contact" className="btn btn-primary btn-sm">Book Appointment</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}