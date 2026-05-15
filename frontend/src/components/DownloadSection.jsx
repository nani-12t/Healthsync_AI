export default function GetStartedSection() {
  return (
    <section className="cta-section" style={{
      background: 'linear-gradient(135deg, var(--primary-dark), var(--primary), #00b88a)',
      padding: '100px 0',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Pattern Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>


        <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
          Start Using HealthSync AI Today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '44px', maxWidth: '520px', margin: '0 auto 44px' }}>
          Join 50,000+ families managing their health smarter — directly from your browser, on any device.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '32px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '28px 36px',
          backdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Browser Icon */}
          <div style={{
            width: '88px',
            height: '88px',
            background: 'white',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}>
            🌐
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Access on Any Browser</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '18px' }}>
              Works on Chrome, Firefox, Safari, Edge — desktop &amp; mobile
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/get-started" className="cta-primary-btn">
                🚀 Get Started Free
              </a>
              <a href="/login" className="cta-secondary-btn">
                Sign In
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          marginTop: '48px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '🔒', label: 'Bank-level Security' },
            { icon: '⚡', label: 'Instant Access' },
            { icon: '📱', label: 'Mobile Friendly' },
            { icon: '🆓', label: 'Free to Start' }
          ].map((badge, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: '500'
            }}>
              <span style={{ fontSize: '16px' }}>{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cta-primary-btn {
          background: white;
          color: var(--primary);
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        }
        .cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .cta-secondary-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          padding: 12px 24px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .cta-secondary-btn:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
