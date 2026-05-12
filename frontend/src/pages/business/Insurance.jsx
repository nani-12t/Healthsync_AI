import { Link } from 'react-router-dom'

export default function Insurance() {
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
              <span>🛡️</span> FOR INSURANCE COMPANIES & TPAS
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 6vw, 60px)', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' }}>
              Keep Your <br />
              Policyholders <br />
              Healthy — <span style={{ color: '#10b981' }}>Before <br />They File a Claim</span>
            </h1>

            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '560px', marginBottom: '40px' }}>
              AI-powered health record management that keeps insured patients engaged, informed, and proactive — reducing claim risk and improving policyholder retention.
            </p>

            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '16px 32px', background: '#10b981', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                Request a Demo <span>→</span>
              </a>
              <a href="#contact" className="btn btn-secondary" style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', padding: '16px 32px', textDecoration: 'none'
              }}>Explore Partnership Options</a>
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
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>The Policyholder Engagement Problem</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Insurers spend heavily on acquisition, then lose policyholders to silence.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'Policyholders Disappear After Purchase',
                desc: 'Insurers invest heavily in acquisition but lose engagement immediately after the policy is sold. Renewal conversations happen too late.',
                icon: '👤'
              },
              {
                title: 'Conditions Go Undetected Until Claims Arrive',
                desc: 'Without health monitoring, chronic conditions escalate silently. Early AI-powered detection reduces claim severity significantly.',
                icon: '⚠️'
              },
              {
                title: 'Policy Documents Are Confusing and Underused',
                desc: 'Most policyholders do not understand their own coverage until they urgently need it, creating disputes and poor experiences at critical moments.',
                icon: '📄'
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
              <span>⚡</span> PLATFORM CAPABILITIES
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 40px)' }}>How HealthSync AI Helps</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Six capabilities that turn passive policyholders into engaged, proactive health participants.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { 
                title: 'AI-Powered Health Monitoring', 
                desc: 'Policyholders upload lab reports and receive instant AI summaries. 70+ health parameters tracked automatically with trend alerts for abnormal values.',
                icon: '📈' 
              },
              { 
                title: 'Insurance Policy Q&A', 
                desc: 'Policyholders upload their insurance document and ask plain-language questions: What is my coverage limit? What is excluded? How do I file a claim?',
                icon: '❓' 
              },
              { 
                title: 'Proactive Health Reminders', 
                desc: 'AI-driven reminders nudge policyholders to complete recommended tests based on their health profile, driving engagement between renewals.',
                icon: '🔔' 
              },
              { 
                title: 'Family Health Coverage Visibility', 
                desc: 'One account for the entire insured family. Dependents tracked independently with separate health profiles — one view for all covered members.',
                icon: '👨‍👩‍👧‍👦' 
              },
              { 
                title: 'WhatsApp Communication', 
                desc: 'All health updates, summaries, and alerts delivered on WhatsApp. No app download needed — reach policyholders on the channel they already use daily.',
                icon: '💬' 
              },
              { 
                title: 'Early Risk Detection', 
                desc: 'AI flags abnormal health parameters the moment a report is uploaded — enabling early intervention before conditions escalate into high-cost claims.',
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

      {/* Why HealthSync AI Section - Stats & Feature Mix */}
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
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The data behind the value, and the platform principles that make it real.</p>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '100px' }}>
            {[
              { v: '50 Cr+', l: 'Health insurance policyholders in India' },
              { v: '70+', l: 'Health parameters auto-tracked per report' },
              { v: 'Instant', l: 'Abnormal value alerts triggered on upload' }
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
              <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '40px', lineHeight: '1.2' }}>Engagement Between Renewals Starts Here</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {[
                  { t: 'Proactive Claim Risk Reduction', d: 'Early AI detection of deteriorating health parameters enables timely intervention — reducing the likelihood of high-cost claims.', i: '📈' },
                  { t: 'Year-Round Policyholder Touchpoints', d: 'Health reminders, report summaries, and trend alerts keep your brand present between policy issuance and renewal — reducing churn.', i: '🔄' },
                  { t: 'Policy Confusion Eliminated', d: 'Policyholders can ask plain-language questions about their own policy document — reducing disputes and improving claim satisfaction scores.', i: '📖' },
                  { t: 'Whole Family Covered, Not Just the Subscriber', d: 'Family health management ensures every insured dependent has a health profile — maximising platform stickiness and household retention.', i: '👨‍👩‍👧‍👦' }
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
                {/* Inside the phone mockup - Health Metrics Dashboard */}
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
                    <div style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '15px' }}>
                      Change from previous: 0.0% (0.0 thousand/µL)
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>Recent Trend</div>
                      <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '2px', borderRadius: '6px' }}>
                        {['Week', 'Month', 'Year'].map((p, i) => (
                          <div key={i} style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px', background: i === 2 ? '#007aff' : 'transparent' }}>{p}</div>
                        ))}
                      </div>
                    </div>
                    {/* Simplified Trend Line */}
                    <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>Max 450</div>
                      <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>Min 150</div>
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