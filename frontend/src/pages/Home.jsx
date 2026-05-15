import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import GetStartedSection from '../components/DownloadSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Hero Section */}
      <div className="hero" style={{
        minHeight: '100vh',
        padding: '120px 0 80px',
        background: 'linear-gradient(160deg, #f0fdf8 0%, #e8f8f2 40%, #d0f0e5 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Ornaments */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,196,140,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            <div className="hero-content animate-fade-in">


              <h1 style={{
                fontSize: 'clamp(38px, 5vw, 58px)',
                lineHeight: 1.12,
                marginBottom: '20px'
              }}>
                Health Driven <br />
                by <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>AI-Powered!</em>
              </h1>

              <p style={{
                fontSize: '18px',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '540px'
              }}>
                Upload your medical reports and get instant AI-powered explanations in simple language,
                track your health trends, and keep your records securely organized.
              </p>

              <div style={{ display: 'flex', gap: '14px', marginBottom: '40px' }}>
                <Link to="/get-started" className="btn btn-primary" style={{ textDecoration: 'none' }}>Get Started Free</Link>
                <button className="btn btn-secondary">Watch Demo</button>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)'
              }}>
                🏥 Trusted by over 10,000+ patients across India
              </div>
            </div>

            <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="glass-card" style={{ padding: '24px', maxWidth: '420px', margin: '0 auto', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>Hello, Rahul</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ready for your checkup?</div>
                  </div>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '700'
                  }}>R</div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, var(--primary), #00b88a)',
                  border_radius: '16px', padding: '20px', color: 'white', marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '12px', opacity: 0.85 }}>Health Score</div>
                  <div style={{ fontSize: '42px', fontWeight: '700' }}>78</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Good • +5% from last month</div>
                  <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '6px' }}>
                    <div style={{ width: '78%', height: '100%', background: 'white', borderRadius: '999px' }}></div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { label: 'Blood', val: '120/80' },
                    { label: 'Pulse', val: '72' },
                    { label: 'Weight', val: '68kg' }
                  ].map((stat, i) => (
                    <div key={i} style={{ background: 'var(--bg2)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{stat.val}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>Recent Reports</div>
                  {[
                    { name: 'Blood Test', date: '24 Oct 2025', icon: '🧪', status: 'Normal' },
                    { name: 'X-Ray Chest', date: '12 Oct 2025', icon: '🩻', status: 'Review' }
                  ].map((report, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '10px', background: 'var(--bg2)', marginBottom: '8px' }}>
                      <div style={{ fontSize: '20px' }}>{report.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{report.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{report.date}</div>
                      </div>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        background: report.status === 'Normal' ? '#e6f7f2' : '#fff3e6',
                        color: report.status === 'Normal' ? 'var(--primary)' : '#d97706'
                      }}>{report.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 1024px) {
          .container > div { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-visual { max-width: 420px; margin: 0 auto; }
        }
        section { padding: 100px 0; }
        .section-label { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--primary); text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-size: clamp(28px, 4vw, 44px); margin-bottom: 16px; line-height: 1.2; }
        .section-subtitle { font-size: 17px; color: var(--text-muted); max-width: 560px; line-height: 1.7; }
      `}</style>

      {/* Features Section */}
      <section id="features" style={{ background: 'var(--bg2)', padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="section-label">Features</div>
            <h2 className="section-title">Your Health Journey Made Simple</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Everything you need to manage, understand and track your family's health in one secure place.
            </p>
          </div>

          {/* Feature Block 1: AI Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
            <div className="animate-fade-in">
              <div style={{ color: 'var(--primary)', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>AI-POWERED REPORT ANALYSIS</div>
              <h3 style={{ fontSize: '32px', marginBottom: '16px', lineHeight: '1.2' }}>Upload & Understand Your Medical Reports</h3>
              <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)', marginBottom: '16px' }}>Get Clear Explanations for Complex Medical Terms</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
                Simple take a photo or upload your lab reports, prescriptions or test results. Our AI instantly reads and explains everything in plain language you can understand.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Instant AI analysis of blood tests, X-rays, and prescriptions',
                  'Plain English explanations of medical terminology',
                  'Highlights abnormal values and what they mean',
                  'Personalized health insights and recommendations'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--text)' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: '700' }}>✓</div> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: '24px', background: 'white' }}>
              {/* Mockup visual for AI Analysis */}
              <div style={{ background: 'var(--primary)', color: 'white', padding: '12px 16px', borderRadius: '12px 12px 0 0', fontSize: '14px', fontWeight: '600' }}>
                AI Report Analysis
                <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: '400' }}>Intermediate Results by advanced AI</div>
              </div>
              <div style={{ padding: '20px', background: 'var(--bg2)', borderRadius: '0 0 12px 12px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '15px', textAlign: 'center' }}>Blood Test Report • CBC • 2 days ago</div>
                {[
                  { label: 'Hemoglobin (Hb)', val: '14.2 g/dL', status: 'Normal', color: 'var(--primary)' },
                  { label: 'Blood Sugar (FBS)', val: '105 mg/dL', status: 'Borderline', color: '#f59e0b' },
                  { label: 'Vitamin D3', val: '18 ng/mL', status: 'Low', color: '#dc2626' }
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600' }}>{row.label}</span>
                      <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', background: 'white', color: row.color, border: `1px solid ${row.color}` }}>{row.status}</span>
                    </div>
                    <div style={{ height: '6px', background: 'white', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: i === 0 ? '70%' : i === 1 ? '85%' : '30%', height: '100%', background: row.color }}></div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '15px', fontSize: '11px', color: '#d97706', background: '#fffbeb', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                  ⚠️ Your Vitamin D3 level is low. Consider sunlight exposure and consult your doctor about supplements.
                </div>
              </div>
            </div>
          </div>

          {/* Feature Block 2: Family Management */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
            <div className="glass-card" style={{ padding: '24px', background: 'white' }}>
              {/* Mockup visual for Family Profiles */}
              <div style={{ background: '#10b981', color: 'white', padding: '12px 16px', borderRadius: '12px 12px 0 0', fontSize: '14px', fontWeight: '600' }}>
                Family Profiles
                <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: '400' }}>4 Members • Active now</div>
              </div>
              <div style={{ padding: '20px', background: 'var(--bg2)', borderRadius: '0 0 12px 12px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                  {['R', 'A', 'M', 'P'].map((initial, i) => (
                    <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', background: i === 0 ? 'var(--primary)' : i === 1 ? '#ec4899' : i === 2 ? '#f59e0b' : '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>{initial}</div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>Upcoming Reminders</div>
                <div style={{ background: 'white', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '20px' }}>💊</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>Arjun's Vitamin</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Daily • 09:00 AM</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>Today</div>
                </div>
                <div style={{ background: 'white', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '20px' }}>🏥</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>Papa's GP Checkup</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Aug 15 • 11:30 AM</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '600' }}>Scheduled</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in" style={{ order: -1 }}>
              <div style={{ color: '#10b981', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>FAMILY HEALTH MANAGEMENT</div>
              <h3 style={{ fontSize: '32px', marginBottom: '16px', lineHeight: '1.2' }}>Manage Your Entire Family's Health Records</h3>
              <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)', marginBottom: '16px' }}>One Platform for the Whole Family's Health Journey</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
                Add family members and keep everyone's medical records organized in one secure place. Perfect for managing children's health, elderly parents, or spouse's medical history.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Add multiple family members in separate profiles',
                  'Track vaccination records and medical history',
                  'Set medication reminders for each family member',
                  'Share reports with doctors during appointments'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--text)' }}>
                    <div style={{ color: '#10b981', fontWeight: '700' }}>✓</div> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature Block 3: Trends */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div className="animate-fade-in">
              <div style={{ color: '#3b82f6', fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>HEALTH TRENDS & PROGRESS</div>
              <h3 style={{ fontSize: '32px', marginBottom: '16px', lineHeight: '1.2' }}>Track Your Health Progress Over Time</h3>
              <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)', marginBottom: '16px' }}>Visual Health Analytics That Make Sense</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
                Visualize your health journey with easy-to-read charts and graphs. Monitor vital signs, track improvements, and spot potential health concerns early.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Interactive charts showing health metrics over time',
                  'Alerts for abnormal values or concerning changes',
                  'Compare results from different time periods',
                  'Daily health insights and personalized tips'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--text)' }}>
                    <div style={{ color: '#3b82f6', fontWeight: '700' }}>✓</div> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: '24px', background: 'white' }}>
              {/* Mockup visual for Health Trends */}
              <div style={{ background: '#3b82f6', color: 'white', padding: '12px 16px', borderRadius: '12px 12px 0 0', fontSize: '14px', fontWeight: '600' }}>
                Health Trends
                <div style={{ fontSize: '11px', opacity: 0.8, fontWeight: '400' }}>Blood Sugar • Last 6 Months</div>
              </div>
              <div style={{ padding: '20px', background: 'var(--bg2)', borderRadius: '0 0 12px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px', marginBottom: '15px' }}>
                  {[40, 60, 45, 90, 75, 55].map((h, i) => (
                    <div key={i} style={{ flex: 1, background: i === 3 ? '#ef4444' : '#3b82f6', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Average Level</div>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>5.8% <span style={{ fontSize: '10px', color: 'var(--primary)' }}>↓ 0.2%</span></div>
                  </div>
                  <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Last Check</div>
                    <div style={{ fontSize: '16px', fontWeight: '700' }}>26 d ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section id="compliance" style={{ background: 'var(--dark)', color: 'white', padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="section-label" style={{ color: 'var(--accent2)' }}>Security & Compliance</div>
            <h2 className="section-title" style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)' }}>
              Your Health Data is 100% Secure
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
              We use bank-level security to protect your medical information. Your health records are encrypted, private, and always under your complete control.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {[
              { title: 'Advanced Encryption', icon: '🔐', desc: 'All your medical reports and personal health data are encrypted using AES-256 encryption, the same standard used by banks and government agencies.' },
              { title: 'HIPAA Compliant', icon: '📄', desc: 'Our platform follows strict healthcare privacy standards (HIPAA) ensuring your medical information is handled with the highest level of confidentiality.' },
              { title: 'You Control Access', icon: '🔑', desc: 'Only you decide who can see your health records. Share specific reports with doctors or family members with one-time secure links that expire automatically.' },
              { title: 'Secure Cloud Storage', icon: '☁️', desc: 'Your health records are safely stored in secure cloud servers with multiple backups, so you\'ll never lose important medical information again.' }
            ].map((card, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '40px',
                transition: 'var(--transition)'
              }} className="security-card">
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: 'rgba(0,196,140,0.1)', display: 'flex',
                  alignItems: 'center', justify_content: 'center',
                  fontSize: '24px', marginBottom: '24px'
                }}>{card.icon}</div>
                <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '16px', fontWeight: '600' }}>{card.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.7' }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Compliance Badges Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            {[
              { label: 'HIPAA', sub: 'Compliant' },
              { label: 'NHA / ABHA', sub: 'Integrated' },
              { label: 'GDPR', sub: 'Compliant' },
              { label: 'AES-256', sub: 'Encryption' },
              { label: 'ISO 27001', sub: 'Standards' }
            ].map((badge, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px 24px',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{badge.label}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '4px' }}>{badge.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .security-card:hover {
            background: rgba(255,255,255,0.06);
            border-color: var(--accent2);
            transform: translateY(-5px);
          }
        `}</style>
      </section>

      {/* <Testimonials /> */}
      <FAQ />
      <GetStartedSection />
      <Footer />
    </div>
  )
}