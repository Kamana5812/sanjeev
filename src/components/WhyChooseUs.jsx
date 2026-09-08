import { motion } from 'framer-motion'

const reasons = [
  { title: 'Advanced technology', text: 'Diagnostic and treatment equipment kept at the leading edge.' },
  { title: 'Experienced specialists', text: 'Every department led by physicians with deep clinical experience.' },
  { title: 'Patient-centered care', text: 'Treatment plans built around your circumstances, not a template.' },
  { title: 'Modern facilities', text: 'Spaces designed to feel calm, private, and genuinely comfortable.' },
  { title: 'Accurate diagnostics', text: 'In-house labs and imaging for fast, dependable results.' },
  { title: '24/7 support', text: 'A team reachable around the clock, for urgent needs and quiet questions alike.' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeIn = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function WhyChooseUs() {
  return (
    <section className="container">
      <div className="why-wrap">
        <div>
          <span className="tagline">Why SANJEEV</span>
          <h2>Care built on trust, not convenience.</h2>
        </div>

        <motion.ul
          className="why-list"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reasons.map((r) => (
            <motion.li className="why-item" key={r.title} variants={fadeIn}>
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}