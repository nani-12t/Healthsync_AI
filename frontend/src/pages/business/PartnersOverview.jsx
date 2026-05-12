import { Link } from 'react-router-dom'

export default function PartnersOverview() {
  return (
    <div style={{ minHeight: '100vh', background: '#001a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Hero Section with Vibrant Gradient */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 70% 30%, #00f2fe 0%, #4facfe 30%, #001a1a 100%)',
        padding: '120px 5% 160px',
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div style={{ zIndex: 2 }}>
            <div style={{ 
              display: 'inline-block', padding: '6px 12px', background: 'rgba(255,255,255,0.1)', 
              borderRadius: '999px', fontSize: '11px', fontWeight: '700', letterSpacing: '1px',
              textTransform: 'uppercase', marginBottom: '24px'
            }}>B2B PARTNERSHIPS</div>
            
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' }}>
              Partner with India's <br />
              <span style={{ color: '#00f2fe' }}>AI Health Report</span> <br />
              Platform
            </h1>
            
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', maxWidth: '540px', marginBottom: '40px' }}>
              Whether you run a diagnostic lab, an insurance TPA, a hospital chain, or a private practice — 
              HealthSync AI plugs into your workflow and turns every report into a patient experience.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" style={{ padding: '14px 32px' }}>Explore Partnerships</button>
              <button className="btn btn-secondary" style={{ 
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', 
                color: 'white', padding: '14px 32px' 
              }}>Talk to Us</button>
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

        {/* Stats Bar Integrated at bottom of Hero */}
        <div style={{
          position: 'absolute', bottom: '0', left: 0, right: 0,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '40px 0'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { v: '50 Cr+', l: 'Medical Reports Processed' },
              { v: '7+', l: 'Years of Innovation' },
              { v: '2-5 min', l: 'Average Processing Time' },
              { v: '10+', l: 'Backend Integrations' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#00f2fe' }}>{stat.v}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section style={{ background: '#f8fdfc', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label">Partner Verticals</div>
            <h2 className="section-title">Who We Work With</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Four B2B verticals, one platform — explore the partnership built for your organisation.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Diagnostic Labs & Aggregators', icon: '📈', desc: 'Add AI-powered report summaries and WhatsApp delivery to your workflow. Zero integration needed to get started on the Free tier.', link: 'Explore for Labs' },
              { title: 'Insurance Companies & TPAs', icon: '🛡️', desc: 'Keep policyholders healthy and engaged between renewals. AI health monitoring and policy Q&A reduce claim risk and improve retention.', link: 'Explore for Insurers' },
              { title: 'Hospital Chains & Clinics', icon: '🏠', desc: 'Stay connected to patients after discharge. AI discharge summaries on WhatsApp, automated follow-up reminders, and post-discharge tracking.', link: 'Explore for Hospitals' },
              { title: 'Doctors & Individual Practitioners', icon: '👤', desc: 'Upload reports on behalf of patients so they receive AI summaries instantly. Better-prepared patients make every consultation more productive.', link: 'Explore for Doctors' }
            ].map((card, i) => (
              <div key={i} className="glass-card" style={{ padding: '30px', background: 'white', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{card.icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '700' }}>{card.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>{card.desc}</p>
                  <Link to="#" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {card.link} <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner with Webshark Health Section */}
      <section style={{ background: 'white', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="section-label">Why Us</div>
            <h2 className="section-title">Why Partner with HealthSync AI?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Built for the realities of Indian healthcare — no heavy integrations, no rip-and-replace.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {[
              { title: 'Zero-Integration Start', desc: 'No API required on the Free tier. Simply share a PDF and the AI does the rest — go live in under a day.', icon: '⚡' },
              { title: 'WhatsApp-Native Delivery', desc: 'Patients receive AI-translated summaries on WhatsApp — the channel they already use every day. No app download needed.', icon: '💬' },
              { title: 'Regional Language Support', desc: 'Summaries in Hindi, Tamil, Telugu, Bengali, and more — reaching every patient in the language they understand best.', icon: '🌐' },
              { title: '7+ Report Types Supported', desc: 'CBC, LFT, Thyroid, Lipid, Diabetes, Imaging, and more — consistent AI precision across every report format.', icon: '📑' },
              { title: 'DPDP-Ready & Secure', desc: 'Built with Indian data protection in mind. Patient data is encrypted and private at every step of the workflow.', icon: '🛡️' },
              { title: 'Flexible, Scalable Tiers', desc: 'Start free, grow to Freemium or Premium as your volume scales. No long-term lock-in, cancel anytime.', icon: '🚀' }
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '24px', color: 'var(--primary)' }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{f.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How Partnership Works Section */}
      <section style={{ background: '#f0f9f9', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="section-label">Process</div>
            <h2 className="section-title">How Partnership Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>From first contact to full integration in three simple steps.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { step: '01', title: 'Tell Us About Your Org', desc: 'Fill out the contact form below. We\'ll reach out within 24 hours to understand your report volume, current workflow, and partnership goals.' },
              { step: '02', title: 'Select a Tier & Go Live', desc: 'Choose Free, Freemium, or Premium — whichever fits your volume. Get handle onboarding and get your team up and running fast.' },
              { step: '03', title: 'Patients Start Benefiting', desc: 'From day one, your patients or policyholders receive AI-powered health summaries — improving outcomes and elevating your brand\'s value.' }
            ].map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '40px', background: 'white', textAlign: 'center', position: 'relative' }}>
                <div style={{ 
                  width: '40px', height: '40px', background: 'var(--primary)', color: 'white', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '14px', fontWeight: '700', margin: '0 auto 24px' 
                }}>{s.step}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section style={{ background: 'white', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label">Contact Us</div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Tell us about your organisation and we'll reach out with a customized partnership proposal within 24 hours.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form style={{ 
              background: 'white', border: '1px solid var(--border)', borderRadius: '24px', 
              padding: '40px', boxShadow: 'var(--shadow-lg)' 
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className="form-group">
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" placeholder="Your full name" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Organisation Name *</label>
                  <input type="text" placeholder="Company / Lab / Hospital name" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Designation</label>
                  <input type="text" placeholder="e.g. Director, CTO, Lab Manager" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Work Email *</label>
                  <input type="email" placeholder="you@company.com" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" placeholder="+91 98765 43210" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Partner Type *</label>
                  <select style={inputStyle}>
                    <option>Select your vertical</option>
                    <option>Diagnostic Lab</option>
                    <option>Insurance Company</option>
                    <option>Hospital Chain</option>
                    <option>Individual Doctor</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Estimated Monthly Report Volume</label>
                <select style={inputStyle}>
                  <option>Select a range</option>
                  <option>Less than 1,000</option>
                  <option>1,000 - 5,000</option>
                  <option>5,000 - 20,000</option>
                  <option>More than 20,000</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Message</label>
                <textarea placeholder="Tell us about your current workflow, goals, or any questions..." style={{ ...inputStyle, height: '120px', resize: 'none' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
                <input type="checkbox" style={{ marginTop: '4px' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  I agree to the <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</Link> and consent to HealthSync AI contacting me about partnership opportunities.
                </p>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                Submit Partnership Request
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
