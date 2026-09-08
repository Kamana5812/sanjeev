import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const packages = [
  {
    title: 'Complete Health Checkup',
    tag: 'Foundational',
    items: ['Full blood panel', 'ECG & chest screening', 'Physician consultation', 'Detailed health report'],
  },
  {
    title: 'Executive Health Package',
    tag: 'Most comprehensive',
    featured: true,
    items: ['Advanced cardiac screening', 'Full-body imaging', 'Specialist consultations', 'Personalized wellness plan', 'Priority scheduling'],
  },
  {
    title: "Women's Wellness Package",
    tag: 'Tailored care',
    items: ['Gynecological screening', 'Bone density scan', 'Hormonal panel', 'Nutrition consultation'],
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

export default function HealthPackages() {
  return (
    <section id="packages" className="container">
      <div className="section-head">
        <span className="tagline">Health packages</span>
        <h2>Preventive care, structured around your life stage.</h2>
        <p>Curated screening packages designed with our specialists, not a price list.</p>
      </div>

      <motion.div
        className="packages-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {packages.map((p) => (
          <motion.div className={`package-card ${p.featured ? 'featured' : ''}`} key={p.title} variants={fadeUp}>
            <h3>{p.title}</h3>
            <span className="package-tag">{p.tag}</span>
            <ul className="package-list">
              {p.items.map((it) => (
                <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Check size={15} /> {it}
                </li>
              ))}
            </ul>
            <a href="#appointment" className={`btn ${p.featured ? 'btn-light' : 'btn-outline'}`}>
              Enquire Now
            </a>
          </motion.div>
        ))}
      </motion.div>

      <p style={{ marginTop: 40, fontSize: '0.85rem', color: 'var(--graphite-soft)' }}>
        Additional packages, including Senior Citizen Health and Heart Health
        Screening, are available on consultation.
      </p>
    </section>
  )
}