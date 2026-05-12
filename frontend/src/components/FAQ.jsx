import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: "What is HealthSync AI and how does it work?", a: "HealthSync AI is an intelligent health records platform that uses advanced AI to analyze your medical reports, providing simple summaries and tracking your health trends automatically." },
    { q: "Is my medical data safe and secure?", a: "Yes, we use bank-grade AES-256 encryption. Your data is 100% private and fully compliant with HIPAA and India's Digital Health Mission (ABHA) standards." },
    { q: "Can I add my family members to the app?", a: "Absolutely! You can create multiple profiles under one account to manage the health records of your parents, spouse, and children securely." },
    { q: "How accurate is the AI analysis?", a: "Our AI is trained on millions of medical data points and validated by healthcare professionals. However, it is meant to assist understanding and should not replace professional medical advice." },
    { q: "What types of reports can the app analyze?", a: "We support Blood tests, X-rays, MRIs, Prescriptions, and many other types of diagnostic reports in PDF or image format." }
  ]

  return (
    <section id="faqs" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>Got questions? We've got clear answers.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: '1px solid var(--border)',
              borderRadius: '14px',
              marginBottom: '12px',
              overflow: 'hidden',
              transition: 'var(--transition)'
            }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '16px'
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: '500', color: 'var(--dark)' }}>{faq.q}</span>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: openIndex === i ? 'var(--primary)' : 'var(--bg3)',
                  color: openIndex === i ? 'white' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s',
                  transform: openIndex === i ? 'rotate(45deg)' : 'none'
                }}>+</div>
              </button>
              <div style={{
                maxHeight: openIndex === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                padding: openIndex === i ? '0 24px 20px' : '0 24px'
              }}>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
