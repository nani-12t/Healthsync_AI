import { Link } from 'react-router-dom'

export default function Hospitals() {
  return (
    <div style={{ minHeight: '100vh', background: '#001a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Hero Section with Vibrant Gradient */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 70% 30%, #004d4d 0%, #003333 30%, #001a1a 100%)',
        padding: '120px 5% 160px',
        position: 'relative'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div style={{ zIndex: 2 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(0, 242, 254, 0.1)',
              color: '#00f2fe', borderRadius: '999px', fontSize: '11px', 
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '24px', border: '1px solid rgba(0, 242, 254, 0.2)'
            }}>
              <span>🏥</span> FOR HOSPITAL CHAINS & CLINICS
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' }}>
              Stay Connected to <br />
              Your Patients <span style={{ color: '#10b981' }}>Long <br />After Discharge</span>
            </h1>

            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '560px', marginBottom: '40px' }}>
              Give every patient a smart health companion that organises their records, tracks their recovery, and keeps them engaged with your hospital — driving repeat visits and reducing readmissions.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '16px 32px', background: '#10b981', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                Request a Demo <span>→</span>
              </a>
              <a href="#contact" className="btn btn-secondary" style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', padding: '16px 32px', textDecoration: 'none'
              }}>See Partnership Plans</a>
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Why Post-Discharge Care Breaks Down</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Hospitals invest in treatment. The journey after discharge is often left to chance.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { 
                title: 'Patients Leave and Are Never Heard From Again', 
                desc: 'After discharge, hospitals lose touch with patients entirely. Follow-up is manual, inconsistent, and rarely happens at scale across hundreds of daily discharges.',
                icon: '👤' 
              },
              { 
                title: 'Scattered Records Lead to Repeated Tests', 
                desc: 'Patients arrive at follow-up appointments without complete records. Duplicate tests are ordered unnecessarily, costing the patient and adding no diagnostic value.',
                icon: '📋' 
              },
              { 
                title: 'No Continuity of Care Post-Discharge', 
                desc: 'Without a system to track recovery, patients self-manage poorly and return as emergency admissions instead of planned follow-ups — a worse outcome for everyone.',
                icon: '❗' 
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>How HealthSync AI Helps</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Five tools that extend your hospital's care reach from ward to home.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {[
              { 
                title: 'AI Discharge Summary Intelligence', 
                desc: 'Discharge summaries uploaded by the hospital are processed by AI and delivered to patients in plain language on WhatsApp — no more confusion after going home.',
                icon: '📄' 
              },
              { 
                title: 'Post-Discharge Health Tracking', 
                desc: 'Patients track their recovery through 70+ health parameters with visual trend charts — giving both patient and care team visibility into progress.',
                icon: '📈' 
              },
              { 
                title: 'Automated Follow-Up Reminders', 
                desc: 'Smart reminders prompt patients to return for follow-up tests and consultations at the right time — reducing readmission risk from missed care.',
                icon: '🔔' 
              },
              { 
                title: 'Complete Health History in One Place', 
                desc: 'All records stored securely in one patient profile — lab reports, prescriptions, scans, vaccine certificates, and insurance documents. Every visit, every record.',
                icon: '🛡️' 
              },
              { 
                title: 'Family Health Management', 
                desc: 'Extend care to the patient\'s entire family under one account with up to 10 independent profiles — deepening household engagement with your hospital brand.',
                icon: '👨‍👩‍👧‍👦' 
              }
            ].map((card, i) => (
              <div key={i} style={{ 
                background: 'white', padding: '40px 30px', borderRadius: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', gap: '24px',
                gridColumn: i === 3 && window.innerWidth > 992 ? 'span 1' : 'auto'
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Choose Your Partnership Tier</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Start free, grow at your own pace. No upfront commitment required.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
            {/* Free Tier */}
            <div className="glass-card" style={{ padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg2)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>FREE</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Patient Acquisition</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Zero cost. Zero integration. Start in days.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your hospital gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'AI discharge summaries on WhatsApp',
                    'HealthSync co-branding on all patient messages',
                    'Patient CTA to download the app',
                    'Up to 500 patients per month'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: '40px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Get Started Free</a>
            </div>

            {/* Freemium Tier */}
            <div className="glass-card" style={{ 
              padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%',
              border: '2px solid var(--primary)', position: 'relative', transform: 'scale(1.05)', zIndex: 2,
              boxShadow: '0 20px 50px rgba(10, 143, 108, 0.1)'
            }}>
              <div style={{ position: 'absolute', top: '-15px', right: '30px', background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' }}>Most Popular</div>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(10, 143, 108, 0.1)', color: 'var(--primary)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>FREEMIUM</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Engagement + Retention</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Deeper continuity. Co-branded experience at scale.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your hospital gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Partner portal for discharge uploads',
                    'Patient health trend tracking with charts',
                    'Co-branded patient experience',
                    'Automated follow-up reminders',
                    'Post-discharge recovery monitoring',
                    'Up to 2,000 patients per month'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: '40px', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Apply for Freemium</a>
            </div>

            {/* Paid Tier */}
            <div className="glass-card" style={{ padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg2)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>PAID</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Enterprise + White Label</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Your hospital. Your brand. Full clinical integration.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your hospital gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Fully white-labelled under your brand',
                    'Embedded in your app or platform',
                    'All Freemium features included',
                    'Family health management',
                    'Custom clinical dashboards',
                    'Dedicated integration manager'
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: '40px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', textAlign: 'center', display: 'block' }}>Talk to Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section - Stats & Feature Mix */}
      <section style={{ background: 'white', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(0, 242, 254, 0.1)',
              color: 'var(--primary)', borderRadius: '999px', fontSize: '11px',
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              <span>💡</span> WHY US
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Why HealthSync Health?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The metrics that matter, and the principles behind the platform.</p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '100px' }}>
            {[
              { v: '7', l: 'Document types supported' },
              { v: '2–5 min', l: 'Report to WhatsApp delivery time' },
              { v: 'WhatsApp', l: 'No app download needed by patients' }
            ].map((s, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, #001a1a 0%, #002b2b 100%)',
                padding: '40px', borderRadius: '16px',
                textAlign: 'center', color: 'white'
              }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#10b981', marginBottom: '12px' }}>{s.v}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Feature Grid with Phone Mockup */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '40px', lineHeight: '1.2' }}>The Patient Journey Doesn't End at Discharge</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {[
                  { t: 'Continuity of Care at Scale', d: 'Automated summaries and reminders mean every discharged patient gets consistent follow-up — regardless of ward load or staff availability.', i: '🔄' },
                  { t: 'Reduced Readmission Risk', d: 'Patients who understand their discharge instructions and receive timely follow-up reminders are less likely to return as emergency cases.', i: '🛡️' },
                  { t: 'Planned Follow-Up Visits, Not Emergency Returns', d: 'Smart reminders route patients back to your hospital for planned follow-ups — driving revenue through scheduled care rather than unplanned admissions.', i: '📅' },
                  { t: 'WhatsApp Reaches Every Patient', d: 'No app required to receive discharge summaries. WhatsApp delivery ensures maximum reach across all demographics — urban and rural alike.', i: '💬' }
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ fontSize: '24px', color: 'var(--primary)' }}>{f.i}</div>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{f.t}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '50px', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Hospital patient recovery tracking and follow-up reminder platform for clinics in India — HealthSync AI
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '320px', height: '640px', background: '#000', borderRadius: '40px',
                border: '8px solid #333', boxShadow: '0 50px 100px rgba(0,0,0,0.1)',
                overflow: 'hidden', position: 'relative'
              }}>
                <div style={{
                  height: '100%', width: '100%', background: '#0a1a1a', padding: '40px 15px',
                  color: 'white', fontFamily: 'sans-serif', overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700' }}>3:00</div>
                    <div style={{ display: 'flex', gap: '6px' }}>📶 🪫</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {['All', 'Blood', 'Organs', 'Vitamins'].map((cat, i) => (
                      <div key={i} style={{
                        padding: '6px 16px', borderRadius: '20px', fontSize: '11px',
                        background: i === 1 ? '#007aff' : 'rgba(255,255,255,0.1)',
                        color: 'white', whiteSpace: 'nowrap'
                      }}>{cat}</div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '15px' }}>
                      <span>Current Value</span>
                      <span>🔄 ⓘ</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', color: '#f59e0b' }}>180 <span style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.5)' }}>thousand/µL</span></div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Reference: 150 - 450 thousand/µL</div>
                      <div style={{ display: 'inline-block', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '4px 12px', borderRadius: '999px', fontSize: '10px', marginTop: '12px', fontWeight: '700' }}>● Normal</div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>Recent Trend</div>
                    </div>
                    <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px', position: 'relative' }}>
                       <svg width="100%" height="100%" viewBox="0 0 200 80">
                        <path d="M0 60 L40 50 L80 65 L120 62 L160 68 L200 65" fill="none" stroke="#f59e0b" strokeWidth="2" />
                        <circle cx="0" cy="60" r="3" fill="#f59e0b" />
                        <circle cx="40" cy="50" r="3" fill="#f59e0b" />
                        <circle cx="80" cy="65" r="3" fill="#f59e0b" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - High Fidelity Flow */}
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
              <span>⛓️</span> PROCESS
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>How It Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>From upload to ongoing patient connection — four steps that run without manual effort.</p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px', position: 'relative'
          }}>
            {/* Connecting Lines */}
            <div style={{
              position: 'absolute', top: '55px', left: '12.5%', right: '12.5%',
              height: '2px', background: 'rgba(10, 143, 108, 0.1)', zIndex: 0
            }}></div>

            {[
              {
                t: 'Hospital Uploads Document',
                d: 'Your team uploads the patient\'s discharge summary or lab report via the HealthSync AI partner portal — PDF or scan.',
                i: '1'
              },
              {
                t: 'AI Processes in Minutes',
                d: 'AI generates a plain-language summary within 2-5 minutes, with follow-up instructions and key health flags highlighted for the patient.',
                i: '2'
              },
              {
                t: 'Patient Receives on WhatsApp',
                d: 'Patient receives the AI summary directly on WhatsApp with follow-up instructions highlighted — no login or app required.',
                i: '3'
              },
              {
                t: 'Patient Tracks Recovery',
                d: 'Patient tracks recovery in the app, manages full family health records, and receives reminders to return to your hospital for follow-up.',
                i: '4'
              }
            ].map((step, i) => (
              <div key={i} style={{
                background: 'white', padding: '40px 24px', borderRadius: '24px',
                textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                position: 'relative', zIndex: 1
              }}>
                <div style={{
                  width: '44px', height: '44px', background: 'var(--primary)',
                  color: 'white', borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                  fontWeight: '700', margin: '0 auto 24px'
                }}>{step.i}</div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#1a1a1a', lineHeight: '1.4' }}>{step.t}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request a Demo Section */}
      <section id="contact" style={{ background: '#f8fdfc', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{
            maxWidth: '1100px', margin: '0 auto', background: 'white',
            borderRadius: '32px', overflow: 'hidden', display: 'grid',
            gridTemplateColumns: '1fr 1.8fr', boxShadow: '0 40px 100px rgba(0,0,0,0.08)'
          }}>
            {/* Sidebar */}
            <div style={{
              background: 'linear-gradient(135deg, #007788 0%, #009988 100%)', // matching the teal gradient from image
              padding: '60px 40px', color: 'white', display: 'flex',
              flexDirection: 'column', gap: '40px'
            }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Request a Demo</h2>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: '1.6' }}>
                  Tell us about your hospital and we'll show you how Webshark Health extends post-discharge care.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {[
                  { t: 'We respond in 24 hours', d: 'Our partnerships team is always available', i: '🕒' },
                  { t: 'Custom demo for your hospital', d: 'Tailored to your discharge workflow', i: '💻' },
                  { t: 'No commitment required', d: 'Free to start, scale when ready', i: '🛡️' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)' }}>{item.i}</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{item.t}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                <span style={{ opacity: 0.8 }}>✉️</span> partnerships@webshark.health
              </div>
            </div>

            {/* Form */}
            <div style={{ padding: '60px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--primary)', borderRadius: '999px', fontSize: '11px',
                fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
                marginBottom: '32px'
              }}>
                <span>🚀</span> GET IN TOUCH
              </div>

              <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="form-group">
                  <label style={labelStyle}>Full Name <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="text" placeholder="Dr. Anita Nair" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Organisation Name <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="text" placeholder="Lotus Multi-Speciality Hospital" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Designation or Role <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="text" placeholder="Medical Director / COO / Digital Hea..." style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Email Address <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="email" placeholder="anita@lotushospital.in" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Phone Number <span style={{color: '#ef4444'}}>*</span></label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{
                      width: '70px', padding: '12px', borderRadius: '10px',
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      fontSize: '13px', textAlign: 'center', color: 'var(--text-muted)'
                    }}>IN +91</div>
                    <input type="tel" placeholder="98765 43210" style={inputStyle} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Partner Type <span style={{color: '#ef4444'}}>*</span></label>
                  <select style={inputStyle}>
                    <option>Hospital or Clinic</option>
                    <option>Diagnostic Lab</option>
                    <option>Insurance Company</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 1' }}>
                  <label style={labelStyle}>Monthly Report Volume <span style={{color: 'var(--text-muted)', fontWeight: '400'}}>(approx.)</span></label>
                  <select style={inputStyle}>
                    <option>Select approximate volume...</option>
                    <option>Less than 100</option>
                    <option>100 - 500</option>
                    <option>500 - 2,000</option>
                    <option>More than 2,000</option>
                  </select>
                </div>
                
                {/* Empty div to fill the second column */}
                <div className="form-group" style={{ gridColumn: 'span 1' }}></div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Message or How Can We Help</label>
                  <textarea
                    placeholder="Tell us about your hospital's discharge volumes, current patient engagement challenges, and goals..."
                    style={{ ...inputStyle, height: '120px', resize: 'none' }}
                  ></textarea>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', alignItems: 'flex-start', margin: '10px 0' }}>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    I agree to the <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</Link> and consent to Webshark Health contacting me about this enquiry. <span style={{color: '#ef4444'}}>*</span>
                  </p>
                </div>

                <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#00bfa5', border: 'none' }}>
                  Request a Demo <span>🚀</span>
                </button>
              </form>
            </div>
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
