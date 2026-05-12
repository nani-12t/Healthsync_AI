import { Link } from 'react-router-dom'

export default function PartnersOverview() {
  return (
    <div style={{ minHeight: '100vh', background: '#001a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Hero Section with Vibrant Gradient */}
      <section style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 70% 30%, #004d4d 0%, #003333 30%, #001a1a 100%)',
        padding: '120px 5% 100px',
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div style={{ zIndex: 2 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', border: '1px solid #10b981',
              color: '#10b981', borderRadius: '999px', fontSize: '11px',
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '32px'
            }}>
              <span style={{ fontSize: '14px' }}>👤</span> FOR DOCTORS & INDIVIDUAL PRACTITIONERS
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' }}>
              Give Your Patients a <br />
              Health Companion <br />
              <span style={{ color: '#10b981' }}>They Will Actually Use</span>
            </h1>

            <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '580px', marginBottom: '48px' }}>
              Upload reports on behalf of your patients so they receive instant AI summaries, track their health over time, and arrive at every appointment better prepared.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '16px 32px', background: '#10b981', border: 'none', borderRadius: '999px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Register as a Doctor Partner <span>→</span>
              </a>
              <button className="btn btn-secondary" style={{
                background: 'transparent', border: '1px solid #10b981',
                color: 'white', padding: '16px 32px', borderRadius: '999px', fontWeight: '700'
              }}>See How It Works</button>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Mobile Mockup */}
            <div style={{
              width: '300px',
              height: '600px',
              background: '#000',
              borderRadius: '40px',
              border: '8px solid #333',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%', width: '100%', background: '#0a0a0a', padding: '40px 20px 20px',
                fontFamily: 'sans-serif', fontSize: '12px'
              }}>
                <div style={{ color: 'white', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Smart Health Report</div>

                <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Overall Health Score</div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#00f2fe' }}>78</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { l: 'Vitamins', v: '78', c: '#f59e0b' },
                    { l: 'Blood', v: '82', c: '#10b981' },
                    { l: 'Liver', v: '62', c: '#ef4444' },
                    { l: 'Heart', v: '88', c: '#10b981' }
                  ].map((stat, i) => (
                    <div key={i} style={{ background: '#1a1a1a', borderRadius: '12px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{stat.l}</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: stat.c }}>{stat.v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '20px', background: 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '10px', borderLeft: '3px solid #10b981' }}>
                  <div style={{ color: '#10b981', fontWeight: '600', fontSize: '10px' }}>AI INSIGHT</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px', marginTop: '4px' }}>Your hydration levels are optimal. Continue drinking 3L water/day.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section style={{ background: '#fff5f5', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', borderRadius: '999px', fontSize: '11px', 
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              <span>⚠️</span> THE PROBLEM
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>The Gaps Between Consultations</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Every doctor knows these moments. Webshark Health closes them.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { 
                title: 'Patients Arrive Without Records', 
                desc: 'Most patients cannot locate previous reports. Appointments are spent reconstructing history instead of making clinical decisions — time neither of you can afford to waste.',
                icon: '📋' 
              },
              { 
                title: 'Lab Results Go Unexplained', 
                desc: 'Patients receive reports they do not understand and wait anxiously until the next appointment — or Google their values and arrive with misplaced concerns.',
                icon: '❓' 
              },
              { 
                title: 'No Way to Track Patient Health Between Visits', 
                desc: 'Doctors cannot monitor how a patient\'s parameters are trending unless the patient proactively shares updates — which most never do consistently.',
                icon: '📉' 
              }
            ].map((card, i) => (
              <div key={i} style={{ 
                background: 'white', padding: '40px 30px', borderRadius: '24px',
                borderLeft: '5px solid #ef4444', boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                display: 'flex', flexDirection: 'column', gap: '20px'
              }}>
                <div style={{ 
                  width: '52px', height: '52px', background: 'rgba(239, 68, 68, 0.08)', 
                  borderRadius: '14px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', fontSize: '26px' 
                }}>{card.icon}</div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#1a1a1a', lineHeight: '1.3' }}>{card.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities Section */}
      <section style={{ background: '#f8fdfc', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--primary)', borderRadius: '999px', fontSize: '11px', 
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              <span>✨</span> PLATFORM CAPABILITIES
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Better Consultations, Faster</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Four tools that bridge the gap between doctor and patient.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              { 
                title: 'Instant AI Report Summaries', 
                desc: 'When you upload a report, the AI generates a plain-language summary instantly, so patients understand their results before they even step into your clinic.',
                icon: '📄' 
              },
              { 
                title: 'Longitudinal Health Trends', 
                desc: 'See how a patient\'s CBC, Thyroid, or Liver values have moved over the last 3 years in one unified graph, rather than flipping through 20 PDFs.',
                icon: '📈' 
              },
              { 
                title: 'Automated Prep Reminders', 
                desc: 'Smart reminders prompt patients to upload their latest records before their appointment, ensuring you have the data you need for a clinical decision.',
                icon: '🔔' 
              },
              { 
                title: 'Secure WhatsApp Delivery', 
                desc: 'Summaries and trends delivered on WhatsApp — the only channel with 100% reach. No apps for the patient to download or passwords to remember.',
                icon: '🛡️' 
              }
            ].map((card, i) => (
              <div key={i} style={{ 
                background: 'white', padding: '40px 30px', borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', gap: '24px'
              }}>
                <div style={{ 
                  width: '52px', height: '52px', background: 'var(--primary)', 
                  color: 'white', borderRadius: '14px', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontSize: '24px' 
                }}>{card.icon}</div>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '12px', color: '#1a1a1a' }}>{card.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers Section */}
      <section style={{ background: 'white', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--primary)', borderRadius: '999px', fontSize: '11px', 
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              <span>💰</span> PARTNERSHIP TIERS
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Scalable Practice Support</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>From solo practitioners to large specialty clinics.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
            {/* Free Tier */}
            <div className="glass-card" style={{ padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg2)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>FREE</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Solo Practice</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Zero cost. Improve your consultation quality today.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Features included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Upload up to 50 reports per month',
                    'AI summaries for patients',
                    'Basic health trend charts',
                    'WhatsApp delivery for all reports'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: '40px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Start Free</a>
            </div>

            {/* Freemium Tier */}
            <div className="glass-card" style={{ 
              padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%',
              border: '2px solid var(--primary)', position: 'relative', transform: 'scale(1.05)', zIndex: 2,
              boxShadow: '0 20px 50px rgba(10, 143, 108, 0.1)'
            }}>
              <div style={{ position: 'absolute', top: '-15px', right: '30px', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' }}>Best for Specialists</div>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(10, 143, 108, 0.1)', color: 'var(--primary)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>PROFESSIONAL</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>High Volume Practice</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Deep longitudinal data for complex cases.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Features included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Upload up to 500 reports per month',
                    'Advanced 5-year trend mapping',
                    'Custom clinic branding on reports',
                    'Automated follow-up reminders',
                    'Priority AI processing'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: '40px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Get Professional</a>
            </div>

            {/* Paid Tier */}
            <div className="glass-card" style={{ padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg2)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>ENTERPRISE</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Clinical Networks</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Full white-label solution for clinic chains.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Features included</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Unlimited report uploads',
                    'Full White-Label experience',
                    'EMR/EHR API integrations',
                    'Admin dashboard for staff',
                    'Dedicated account manager'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: '40px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" style={{ background: '#f8fdfc', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label">Partner with Us</div>
            <h2 className="section-title">Join the Doctor Network</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Elevate your patient experience in under 24 hours.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form style={{
              background: 'white', border: '1px solid var(--border)', borderRadius: '24px',
              padding: '40px', boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className="form-group">
                  <label style={labelStyle}>Doctor Name *</label>
                  <input type="text" placeholder="Dr. Sameer Gupta" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Clinic / Practice Name *</label>
                  <input type="text" placeholder="e.g. HealthFirst Clinic" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Specialization *</label>
                  <input type="text" placeholder="e.g. Cardiologist, Diabetologist" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Work Email *</label>
                  <input type="email" placeholder="dr@clinic.com" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" placeholder="+91 98765 43210" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Monthly Patient Volume</label>
                  <select style={inputStyle}>
                    <option>Select a range...</option>
                    <option>Less than 100</option>
                    <option>100 - 300</option>
                    <option>300 - 1,000</option>
                    <option>More than 1,000</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Clinical Goals</label>
                <textarea placeholder="e.g. Better patient longitudinal tracking, reducing manual record sorting..." style={{ ...inputStyle, height: '100px', resize: 'none' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <input type="checkbox" style={{ marginTop: '4px' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  I agree to the <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</Link> and consent to HealthSync AI contacting me.
                </p>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                Register as Partner
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  marginBottom: '8px',
  color: 'var(--dark)'
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid var(--border)',
  fontSize: '14px',
  background: 'var(--bg2)',
  outline: 'none',
  transition: 'border-color 0.2s'
}
