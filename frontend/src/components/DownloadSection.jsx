export default function DownloadSection() {
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
          Download HealthSync AI
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '40px' }}>
          Join 50,000+ families who are managing their health smarter.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '24px',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          padding: '20px 28px',
          backdropFilter: 'blur(10px)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'white',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px'
          }}>
            {/* Mock QR Code */}
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 4px, transparent 4px, transparent 8px), repeating-linear-gradient(90deg, #000 0, #000 4px, transparent 4px, transparent 8px)',
              backgroundSize: '8px 8px',
              opacity: 0.8
            }}></div>
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Scan to Download</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>Available on iOS and Android</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="store-btn"> App Store</button>
              <button className="store-btn">▶ Google Play</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .store-btn {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 8px 16px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .store-btn:hover {
          background: rgba(255,255,255,0.25);
        }
      `}</style>
    </section>
  )
}
