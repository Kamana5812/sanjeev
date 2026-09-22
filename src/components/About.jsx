import { motion } from 'framer-motion'
import { Hospital } from 'lucide-react'

const stats = [
  { num: '25+', label: 'Years of Excellence' },
  { num: '50K+', label: 'Patients Served' },
  { num: '30+', label: 'Medical Specialists' },
  { num: '24/7', label: 'Patient Support' },
]

const pillars = [
  { title: 'Patient-first philosophy', text: 'Every decision is shaped around the person in front of us, not the process behind us.' },
  { title: 'Medical excellence', text: 'Specialists trained at leading institutions, held to a single standard of care.' },
  { title: 'Advanced technology', text: 'Diagnostic and treatment tools chosen for precision, not novelty.' },
  { title: 'Continuous presence', text: "Support that doesn't end when the appointment does." },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="layout-container">
        <motion.div
          className="about-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.div className="about-visual" variants={fadeUp}>
            <Hospital aria-hidden="true" /><strong>SANJEEV</strong>
            <div className="about-visual-caption">A quieter kind of hospital</div>
          </motion.div>

          <motion.div className="about-copy" variants={fadeUp}>
            <span className="section-label">A philosophy of care</span>
            <h2>Medicine practiced with restraint, precision, and attention.</h2>
            <p style={{ marginTop: 20 }}>
              SANJEEV was founded on a simple premise: exceptional healthcare
              should feel calm, not clinical in the cold sense of the word. Our
              mission is to combine deep medical expertise with an environment
              that respects the dignity of every patient who walks through our
              doors.
            </p>
            <p>
              From diagnosis to recovery, our specialists work as one team,
              supported by technology that removes guesswork — so care decisions
              are made with clarity, not urgency.
            </p>

            <div className="about-pillars">
              {pillars.map((p) => (
                <div className="about-pillar" key={p.title}>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="stats-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <AnimatedStat key={s.label} num={s.num} label={s.label} delay={i * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AnimatedStat({ num, label, delay }) {
  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  )
}