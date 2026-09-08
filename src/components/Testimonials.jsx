import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  { quote: 'From the first consultation to recovery, I felt genuinely looked after — not just treated.', name: 'Rajesh Kumar', service: 'Cardiology', rating: 5 },
  { quote: 'The care my daughter received was thorough and remarkably gentle.', name: 'Priya Sharma', service: 'Pediatrics', rating: 5 },
  { quote: 'Every question was answered before I even asked it. Rare, these days.', name: 'Sunita Nair', service: "Women's Wellness", rating: 5 },
  { quote: 'The diagnostic accuracy saved us weeks of uncertainty.', name: 'Arvind Menon', service: 'Diagnostics', rating: 5 },
]

export default function Testimonials() {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 460, behavior: 'smooth' })
  }

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head">
          <span className="tagline">Patient stories</span>
          <h2>What patients say after they leave.</h2>
        </div>

        <motion.div
          className="testimonial-track"
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="testimonial-quote">“{t.quote}”</p>
              <div className="testimonial-meta">
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-service">{t.service}</div>
                </div>
                <div className="testimonial-rating">{'★'.repeat(t.rating)}</div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="testimonial-nav">
          <button onClick={() => scroll(-1)} aria-label="Previous"><ArrowLeft size={18} /></button>
          <button onClick={() => scroll(1)} aria-label="Next"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}