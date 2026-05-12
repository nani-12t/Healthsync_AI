export default function Testimonials() {
  const testimonials = [
    { name: "Ananya Sharma", loc: "Mumbai", text: "HealthSync AI made it so easy to understand my thyroid reports. The AI summary was spot on and very helpful!", tag: "Patient" },
    { name: "Dr. Vikram Seth", loc: "Delhi", text: "A fantastic tool for patients to keep their history organized. Highly recommended for long-term health tracking.", tag: "Doctor" },
    { name: "Rahul Verma", loc: "Bangalore", text: "Managing my parents' health records was a nightmare until I found this app. The family vault is a lifesaver.", tag: "Premium User" },
    { name: "Sneha Kapur", loc: "Pune", text: "The health score feature is very motivating. It helps me stay on top of my fitness goals every month.", tag: "Fitness Enthusiast" },
  ]

  // Double the array for infinite scroll effect
  const trackItems = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" style={{ background: 'var(--bg2)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">Loved by thousands of users</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--dark)' }}>50k+</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Active Families</div>
            </div>
            <div style={{ width: '1px', height: '50px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--dark)' }}>4.9/5</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>App Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-track-wrap" style={{ position: 'relative' }}>
        <div className="track" style={{
          display: 'flex',
          gap: '20px',
          padding: '20px 0',
          width: 'max-content',
          animation: 'scroll 30s linear infinite'
        }}>
          {trackItems.map((t, i) => (
            <div key={i} className="glass-card" style={{
              width: '320px',
              padding: '24px',
              flexShrink: 0,
              background: 'white'
            }}>
              <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '12px', marginBottom: '8px' }}>{t.tag}</div>
              <p style={{ fontSize: '14px', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.7' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '700'
                }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .testimonials-track-wrap:hover .track {
          animation-play-state: paused;
        }
        .testimonials-track-wrap::before, .testimonials-track-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 100px; z-index: 2; pointer-events: none;
        }
        .testimonials-track-wrap::before { left: 0; background: linear-gradient(to right, var(--bg2), transparent); }
        .testimonials-track-wrap::after { right: 0; background: linear-gradient(to left, var(--bg2), transparent); }
      `}</style>
    </section>
  )
}
