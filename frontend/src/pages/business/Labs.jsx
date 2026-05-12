import { Link } from 'react-router-dom'

export default function Labs() {
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
            }}>For Diagnostic Labs & Aggregators
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' }}>
              Turn Every Lab Report Into a <br />
              <span style={{ color: '#00f2fe' }}>Patient Experence </span> <br />

            </h1>

            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', maxWidth: '540px', marginBottom: '40px' }}>
              Add AI-powered report summaries and WhatsApp delivery to your diagnostic workflow. No technical integration needed to get started.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '14px 32px', textDecoration: 'none', textAlign: 'center' }}>Explore Partnerships</a>
              <a href="#contact" className="btn btn-secondary" style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', padding: '14px 32px', textDecoration: 'none', textAlign: 'center'
              }}>Talk to Us</a>
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>The Gap Diagnostic Labs Face Today</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Patients receive test results — but rarely understand them.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { 
                title: 'Reports Delivered, Not Understood', 
                desc: 'Patients receive a PDF full of numbers and medical terms they cannot interpret. The report journey ends at delivery.',
                icon: '📄' 
              },
              { 
                title: 'No Patient Engagement After Visit', 
                desc: 'Once a test is done, the patient leaves. No follow-up, no reminder, no reason to return — breaking the care loop entirely.',
                icon: '👤' 
              },
              { 
                title: 'Health Trends Invisible to Patients', 
                desc: 'Repeat tests happen but no one connects the dots. Patients cannot see how their health is improving or worsening over time.',
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

      {/* How HealthSync AI Helps Section */}
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
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Six capabilities that transform reports into a complete patient health experience.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                title: 'AI Report Summaries', 
                desc: 'Every lab report explained in plain language instantly — so patients understand what their results mean without calling the lab.',
                icon: '🧩' 
              },
              { 
                title: 'WhatsApp Native Delivery', 
                desc: 'AI summaries sent to patients on WhatsApp. No app download needed to receive them — meet patients where they already are.',
                icon: '💬' 
              },
              { 
                title: '70+ Health Parameters Tracked', 
                desc: 'Automatic extraction and visual trend charts across heart, kidney, liver, thyroid, blood, and more from every uploaded report.',
                icon: '📊' 
              },
              { 
                title: 'Smart Health Reminders', 
                desc: 'Periodic test reminders and package recommendations based on each patient\'s test history, driving repeat bookings at your lab.',
                icon: '🔔' 
              },
              { 
                title: 'Family Health Management', 
                desc: 'One patient account manages up to 10 family members with independent health profiles — expanding your lab\'s household reach.',
                icon: '👨‍👩‍👧‍👦' 
              },
              { 
                title: 'AI Health Assistant', 
                desc: 'Conversational AI personalised to the patient\'s own data, accessible via voice or text — giving patients answers, not anxiety.',
                icon: '🎙️' 
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Choose Your Partnership Tier</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Start free, grow at your own pace. No upfront commitment required.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
            {/* Free Tier */}
            <div className="glass-card" style={{ padding: '40px', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'var(--bg2)', borderRadius: '6px', fontSize: '10px', fontWeight: '700', marginBottom: '20px' }}>FREE</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>User Acquisition</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Zero cost. Zero integration. Start in days.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your lab gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'AI report summaries on WhatsApp',
                    'HealthSync co-branding on all patient messages',
                    'Patient CTA to download the app',
                    'Up to 500 reports per month'
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
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Engagement + Branding</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Deeper engagement. Co-branded experience at scale.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your lab gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Partner portal for report uploads',
                    'Patient health trend tracking with charts',
                    'Co-branded patient experience',
                    'AI-driven package recommendations',
                    'Periodic patient reminders',
                    'Up to 2,000 reports per month'
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
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px' }}>Revenue + White Label</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '30px' }}>Your brand. Your experience. Full strategic partnership.</p>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>What your lab gets</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Fully white-labelled under your brand',
                    'Embedded in your app or platform',
                    'All Freemium features included',
                    'Family health management',
                    'Custom add-ons per requirements',
                    'Dedicated account manager'
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

      {/* Why HealthSync AI Section - Stats & Feature Mix */}
      <section style={{ background: 'white', padding: '100px 0', color: 'var(--dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', background: 'rgba(0, 0, 0, 0.05)', 
              color: 'var(--dark)', borderRadius: '999px', fontSize: '11px', 
              fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              <span>📊</span> BY THE NUMBERS
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>Why HealthSync Health?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The numbers behind the partnership — and the principles that make it work.</p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '100px' }}>
            {[
              { v: '50 Cr+', l: 'Diagnostic reports processed across our network' },
              { v: '0', l: 'Integration needed for our basic partner portal' },
              { v: '2-5 min', l: 'Speed to WhatsApp delivery after upload' }
            ].map((s, i) => (
              <div key={i} style={{ 
                background: '#1a1c1e', padding: '40px', borderRadius: '16px', 
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
              <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '40px', lineHeight: '1.2' }}>Built for Labs That Care About Patient Outcomes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {[
                  { t: 'Zero-Integration Start', d: 'No code, no developer time. We can get you up and running in days using our simple partner portal.', i: '⚡' },
                  { t: 'WhatsApp & SMS Delivery', d: 'Every report summary is delivered where patients already are. No app download is required.', i: '💬' },
                  { t: 'Drive Repeat Lab Visits', d: 'Automated reminders and package recommendations based on patient\'s history — drive repeat visits.', i: '🔔' },
                  { t: 'Go Global at Every Product', d: 'Your lab\'s name attached to every Report Summary. Elevate your brand in the eyes of your patients.', i: '🌐' }
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
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{ 
                width: '320px', height: '640px', background: '#000', borderRadius: '40px', 
                border: '8px solid #333', boxShadow: '0 50px 100px rgba(0,0,0,0.1)',
                overflow: 'hidden', position: 'relative'
              }}>
                {/* Inside the phone mockup - Family selection */}
                <div style={{ 
                  height: '100%', width: '100%', background: '#0a1a1a', padding: '40px 20px',
                  color: 'white', fontFamily: 'sans-serif'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                     <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#333', margin: '0 auto 16px' }}></div>
                     <div style={{ fontSize: '18px', fontWeight: '600' }}>Siddhant Singh</div>
                     <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>SM-87219192</div>
                  </div>
                  
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Select family member</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { n: 'Siddhant Singh', r: 'Self', s: true },
                      { n: 'Sudhir Singh', r: 'Father', s: false },
                      { n: 'Meenal Singh', r: 'Mother', s: false }
                    ].map((m, i) => (
                      <div key={i} style={{ 
                        background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        border: m.s ? '1px solid var(--primary)' : '1px solid transparent'
                      }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333' }}></div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600' }}>{m.n}</div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{m.r}</div>
                          </div>
                        </div>
                        <div style={{ 
                          width: '18px', height: '18px', borderRadius: '50%', 
                          border: '2px solid', borderColor: m.s ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {m.s && <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }}></div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button style={{ 
                    width: '100%', marginTop: '30px', padding: '16px', 
                    background: 'transparent', border: '1px dashed rgba(255,255,255,0.3)', 
                    borderRadius: '16px', color: 'var(--primary)', fontSize: '13px', fontWeight: '600' 
                  }}>+ Add family member</button>
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
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Four steps from lab report to patient AI insight — no developer needed.</p>
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
                t: 'Lab Uploads Report', 
                d: 'Your team uploads the patient\'s report via the HealthSync Health partner portal — PDF, scan, or photo accepted.',
                i: '1' 
              },
              { 
                t: 'AI Processes in Minutes', 
                d: 'Our AI extracts key findings, flags abnormal values, and generates a plain-language summary within 2-5 minutes.',
                i: '2' 
              },
              { 
                t: 'Patient Gets WhatsApp Summary', 
                d: 'Patient receives the AI summary on WhatsApp with key findings highlighted — no app required to read it.',
                i: '3' 
              },
              { 
                t: 'Patient Joins Full Platform', 
                d: 'Patient is invited to download the app for full health history, trend tracking, and family member management.',
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
              background: 'linear-gradient(135deg, #001a1a 0%, #004d4d 100%)', 
              padding: '60px 40px', color: 'white', display: 'flex', 
              flexDirection: 'column', gap: '40px' 
            }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px' }}>Request a Demo</h2>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                  Tell us about your lab and we'll show you exactly how HealthSync Health fits your workflow.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {[
                  { t: 'We respond in 24 hours', d: 'Our partnerships team is always available', i: '🕒' },
                  { t: 'Custom demo for your lab', d: 'We tailor the walkthrough to your workflow', i: '💻' },
                  { t: 'No commitment required', d: 'Free to start, scale when you\'re ready', i: '🛡️' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '20px', color: 'var(--primary)' }}>{item.i}</div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{item.t}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '13px', color: 'var(--primary)' }}>
                <span>✉️</span> partnerships@healthsync.ai
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
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" placeholder="Rajesh Kumar" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Organisation Name *</label>
                  <input type="text" placeholder="City Diagnostics Pvt. Ltd." style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Designation or Role *</label>
                  <input type="text" placeholder="CEO / Lab Director / Manager" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" placeholder="rajesh@citydiagnostics.in" style={inputStyle} />
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Phone Number *</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ 
                      width: '60px', padding: '12px', borderRadius: '10px', 
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      fontSize: '14px', textAlign: 'center'
                    }}>+91</div>
                    <input type="tel" placeholder="98765 43210" style={inputStyle} />
                  </div>
                </div>
                <div className="form-group">
                  <label style={labelStyle}>Partner Type *</label>
                  <select style={inputStyle}>
                    <option>Select partner type...</option>
                    <option>Diagnostic Lab</option>
                    <option>Insurance Company</option>
                    <option>Hospital Chain</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Monthly Report Volume (approx.)</label>
                  <select style={inputStyle}>
                    <option>Select approximate volume...</option>
                    <option>Less than 1,000</option>
                    <option>1,000 - 5,000</option>
                    <option>5,000 - 20,000</option>
                    <option>More than 20,000</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Message or How Can We Help</label>
                  <textarea 
                    placeholder="Tell us about your lab, the volume of reports you process, and what you'd like to achieve with HealthSync Health..." 
                    style={{ ...inputStyle, height: '100px', resize: 'none' }}
                  ></textarea>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', alignItems: 'flex-start', margin: '10px 0' }}>
                  <input type="checkbox" style={{ marginTop: '4px' }} />
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    I agree to the <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</Link> and consent to HealthSync Health contacting me about this enquiry. *
                  </p>
                </div>

                <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
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
