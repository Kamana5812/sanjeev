import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'How do I book an appointment?', a: 'You can book an appointment through our website by filling out the contact form, calling us at +91 98765 43210, or visiting us directly at our clinic during working hours.' },
  { q: 'What are your consultation fees?', a: 'Consultation fees vary by specialty and doctor. Please contact our reception or check with the specific department for current fee details.' },
  { q: 'Do you accept insurance?', a: 'Yes, we accept most major health insurance plans. Please bring your insurance card and policy details during your visit. Contact us for specific insurance queries.' },
  { q: 'What should I bring to my first visit?', a: 'Please bring a valid photo ID, your insurance card (if applicable), any previous medical records, current medication list, and referral letters if any.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq-section">
      <div className="layout-container">
        <div className="section-head">
          <span className="section-label">Frequently Asked Questions</span>
          <h2>Quick Answers to Common Questions</h2>
          <p>Find answers to your most common questions about appointments, treatments and more.</p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} />
              </button>
              {openIndex === index && (
                <div className="faq-answer" id={`faq-answer-${index}`} role="region">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
