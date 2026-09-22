import { motion } from 'framer-motion'
import { Check, ChevronRight, Heart, Users, Baby, UserCheck } from 'lucide-react'

const packages = [
  {
    icon: Heart,
    title: 'General Health Checkup',
    tag: 'Foundational',
    desc: 'Basic screening for overall wellness.',
    price: '₹1,499',
    items: ['Full blood panel', 'ECG & chest screening', 'Physician consultation', 'Detailed health report'],
  },
  {
    icon: Users,
    title: "Women's Wellness",
    tag: 'Tailored care',
    desc: 'Comprehensive care for women.',
    price: '₹2,499',
    items: ['Gynecological screening', 'Bone density scan', 'Hormonal panel', 'Nutrition consultation'],
  },
  {
    icon: UserCheck,
    title: 'Senior Citizen Care',
    tag: 'Most comprehensive',
    featured: true,
    desc: 'Stay healthy, stay independent.',
    price: '₹2,999',
    items: ['Advanced cardiac screening', 'Full-body imaging', 'Specialist consultations', 'Personalized wellness plan', 'Priority scheduling'],
  },
  {
    icon: Baby,
    title: 'Child Health Package',
    tag: 'For children',
    desc: 'Healthy kids, brighter future.',
    price: '₹1,099',
    items: ['Growth assessment', 'Nutritional screening', 'Vaccination review', 'Pediatric consultation'],
  },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

export default function HealthPackages() {
  return (
    <section id="packages" className="packages-section">
      <div className="layout-container">
        <div className="section-head-row">
          <div className="section-head">
            <span className="section-label">Health Packages</span>
            <h2>Preventive Care for a Healthier Tomorrow</h2>
            <p>Choose from our curated health packages for complete wellness and early detection.</p>
          </div>
          <a href="#packages" className="view-all-link">
            View All Packages <ChevronRight size={16} />
          </a>
        </div>

        <motion.div
          className="packages-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {packages.map((p) => (
            <motion.div className={`package-card ${p.featured ? 'featured' : ''}`} key={p.title} variants={fadeUp}>
              <h3>{p.title}</h3>
              <span className="package-tag">{p.tag}</span>
              <p style={{ fontSize: '0.88rem', color: p.featured ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginBottom: 14 }}>
                {p.desc}
              </p>
              <ul className="package-list">
                {p.items.map((it) => (
                  <li key={it}>
                    <Check size={15} /> {it}
                  </li>
                ))}
              </ul>
              <div className="package-price">
                From <strong>{p.price}</strong>
              </div>
              <a href="#contact" className={`btn btn-sm ${p.featured ? 'btn-gold' : 'btn-secondary'}`}>
                View Details <ChevronRight size={14} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}