import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  { quote: 'From the first consultation to recovery, I felt genuinely looked after — not just treated.', name: 'Rajesh Kumar', service: 'Cardiology', rating: 5 },
  { quote: 'The care my daughter received was thorough and remarkably gentle.', name: 'Priya Sharma', service: 'Pediatrics', rating: 5 },
  { quote: 'Every question was answered before I even asked it. Rare, these days.', name: 'Sunita Nair', service: "Women's Wellness", rating: 5 },
  { quote: 'The diagnostic accuracy saved us weeks of uncertainty.', name: 'Arvind Menon', service: 'Diagnostics', rating: 5 },
]

export default function Testimonials() {
  const trackRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = () => {
    const track = trackRef.current
    if (track) setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 })
  }

  useEffect(() => {
    const track = trackRef.current
    const observer = new ResizeObserver(updateEdges)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  const scroll = direction => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    const step = (card?.getBoundingClientRect().width || track.clientWidth) + 24
    track.scrollBy({ left: direction * step, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return (
    <section className="testimonials-section">
      <div className="layout-container">
        <div className="section-head">
          <span className="section-label">Patient stories</span>
          <h2>What patients say after they leave.</h2>
          <p className="footer-note">Sample testimonials for this demonstration.</p>
        </div>

        <motion.div
          className="testimonial-track"
          id="patient-stories"
          aria-label="Sample patient stories"
          tabIndex={0}
          onScroll={updateEdges}
          ref={trackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
        >
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="testimonial-quote">\u201C{t.quote}\u201D</p>
              <div className="testimonial-meta">
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-service">{t.service}</div>
                </div>
                <div className="testimonial-rating" aria-label={`${t.rating} out of 5 stars`}>
                  {'★'.repeat(t.rating)}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="testimonial-nav">
          <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-controls="patient-stories" aria-label="Previous testimonial">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-controls="patient-stories" aria-label="Next testimonial">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}