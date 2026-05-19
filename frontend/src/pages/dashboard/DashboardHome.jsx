import { Link, useNavigate } from 'react-router-dom'

export default function DashboardHome() {
  const navigate = useNavigate()
  return (
    <div style={{
      background: 'linear-gradient(135deg, #09122C 0%, #0E1738 100%)',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: '24px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Top Row Welcoming Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#10B981', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#09122C'
        }}>
          A
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Aravind</h1>
      </div>

      {/* Desktop Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '32px',
        marginBottom: '40px'
      }} className="dashboard-grid">
        
        {/* LEFT COLUMN (60% equivalent via flex/grid) */}
        <div style={{ flex: '1.5' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>
            Your Health Overview
          </h2>
          
          <div style={{
            background: '#131F46',
            border: '1px solid #1C2C61',
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Counter Container */}
            <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 2, marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#10B981' }}>00</div>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>Reports Analyzed</div>
              </div>
              <div style={{ width: '1px', background: '#1C2C61' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '42px', fontWeight: '800', color: '#3B82F6' }}>00</div>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>Health Insights</div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '14px', position: 'relative', zIndex: 2, marginBottom: '32px' }}>
              Upload your first report to get AI insights
            </div>

            {/* Visual Centerpiece Placeholder (Anatomy SVG/Graphic) */}
            <div style={{
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Mocking the human muscular-anatomical body profile */}
              <div style={{
                width: '160px', height: '220px',
                background: 'radial-gradient(ellipse at top, #8B5A2B 0%, transparent 70%)',
                opacity: 0.6,
                borderRadius: '50% 50% 0 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="120" height="180" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                  <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 20v-2a6 6 0 0 1 12 0v2" />
                  <path d="M9 16v4M15 16v4" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (40% equivalent) */}
        <div style={{ flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF' }}>Health Metrics</h2>
            <Link to="/dashboard/metrics" style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
              See All &gt;
            </Link>
          </div>

          <div style={{
            background: '#131F46',
            border: '1px solid #1C2C61',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', filter: 'blur(1px)'
            }}>
              ❤️
            </div>
            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Upload your medical reports to see personalized health metrics and AI insights here.
            </p>
            <button onClick={() => navigate('/dashboard/reports')} style={{
              background: 'transparent',
              border: '2px solid #10B981',
              color: '#10B981',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Upload Report
            </button>
          </div>

          {/* Vitals Grid Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Vital Card A */}
            <div style={{ background: '#121E45', border: '1px solid #1C2C61', borderRadius: '16px', padding: '16px', position: 'relative' }}>
              <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', position: 'absolute', top: '16px', right: '16px' }}></div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>Heart Rate (Sample)</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF' }}>72</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>bpm</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>2023-04-20</div>
            </div>
            
            {/* Vital Card B */}
            <div style={{ background: '#121E45', border: '1px solid #1C2C61', borderRadius: '16px', padding: '16px', position: 'relative' }}>
              <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', position: 'absolute', top: '16px', right: '16px' }}></div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', whiteSpace: 'nowrap' }}>Blood Pressure (Sample)</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF' }}>120/80</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>mmHg</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>2023-04-19</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH BLOCK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#FFFFFF' }}>Recent Reports</h2>
        <Link to="/dashboard/reports" style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>
          See All &gt;
        </Link>
      </div>

      <div style={{ background: '#131F46', border: '1px solid #1C2C61', borderRadius: '20px', padding: '40px 24px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.5 }}>📄</div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px' }}>Ready to Get Started?</h3>
        <div style={{ color: '#EF4444', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>No recent reports</div>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 32px' }}>
          Upload your medical reports to unlock AI-powered health insights, trend analysis, and personalized recommendations.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', maxWidth: '300px', margin: '0 auto 32px' }}>
          <button onClick={() => navigate('/dashboard/reports')} style={{
            width: '100%', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px',
            padding: '16px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Upload Report
          </button>
          <button onClick={() => navigate('/dashboard/metrics')} style={{
            width: '100%', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px',
            padding: '16px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'
          }}>
            Explore Health Tab &rarr;
          </button>
        </div>

        <div style={{ color: '#94A3B8', fontSize: '13px' }}>
          What you'll get: / AI-powered health insights / Health trend tracking / Secure report storage
        </div>
      </div>

      {/* CORE BRAND PITCH FOOTER BANNER */}
      <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid #1C2C61', borderBottom: '1px solid #1C2C61', marginBottom: '40px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(59,130,246,0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <p style={{ color: '#94A3B8', fontSize: '16px', marginBottom: '12px' }}>Transform Your Health Journey with AI-Powered Insights</p>
        <h2 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '2px', margin: '0 0 40px 0' }}>WEBSHARK HEALTH</h2>
        
        {/* Included Value Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { icon: '🔒', text: 'Privacy-First & Encrypted' },
            { icon: '🧠', text: 'AI-Powered Health Insights' },
            { icon: '👨‍👩‍👧‍👦', text: 'Family Health Management' },
            { icon: '🤖', text: 'Roodra AI Health Assistant' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#121E45', padding: '16px', borderRadius: '12px', border: '1px solid #1C2C61' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: '500' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Category Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {[
          { title: 'Smart Reports', desc: 'Upload & understand medical documents', icon: '📄' },
          { title: 'Body Vitals', desc: 'Track health across major systems', icon: '❤️' },
          { title: 'Secure Sharing', desc: 'Share records with consent control', icon: '🔗' },
          { title: 'Hereditary Tracking', desc: 'Family medical history insights', icon: '🧬' }
        ].map((block, i) => (
          <div key={i} style={{ background: '#131F46', border: '1px solid #1C2C61', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }} className="feature-block">
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>{block.icon}</div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{block.title}</h4>
            <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>{block.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust & Compliance Banner Footer */}
      <div style={{ background: '#09122C', border: '1px solid #1C2C61', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>
          Your Data is Protected. Enterprise-grade security with global compliance standards.
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          {['HIPAA Compliant', 'GDPR Protected', 'DMARC Secured'].map((badge, i) => (
            <div key={i} style={{ background: '#121E45', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#10B981' }}>✓</span> {badge}
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', marginBottom: '24px', display: 'inline-block' }}>
          256-bit encryption • Secure authentication • Privacy - First Health App
        </div>

        <p style={{ fontSize: '11px', color: 'rgba(148, 163, 184, 0.6)', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          For informational purposes only. AI insights do not constitute medical advice. Always consult a qualified healthcare professional.
        </p>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dashboard-grid { grid-template-columns: 3fr 2fr !important; }
        }
        .feature-block:hover { transform: translateY(-4px); border-color: #3B82F6 !important; }
      `}</style>
    </div>
  )
}
