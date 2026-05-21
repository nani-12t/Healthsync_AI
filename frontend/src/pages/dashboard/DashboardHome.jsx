import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function DashboardHome() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [reportsCount, setReportsCount] = useState(0)
  const [insightsCount, setInsightsCount] = useState(0)
  const [latestHeartRate, setLatestHeartRate] = useState(null)
  const [latestBP, setLatestBP] = useState(null)
  const [recentReports, setRecentReports] = useState([])

  const glassStyle = {
    background: 'rgba(16, 185, 129, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  }

  const headingStyle = {
    fontSize: '22px', 
    fontWeight: '800', 
    color: '#FFFFFF', 
    letterSpacing: '0.5px',
    marginBottom: '20px'
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        // Fetch profile
        const profileRes = await fetch('http://localhost:5000/api/user/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (profileRes.ok) {
          const profileData = await profileRes.ok ? await profileRes.json() : null
          if (profileData) {
            setUser(profileData)
            localStorage.setItem('user', JSON.stringify(profileData))
          }
        }

        // Fetch reports
        const reportsRes = await fetch('http://localhost:5000/api/reports', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (reportsRes.ok) {
          const reportsData = await reportsRes.json()
          setReportsCount(reportsData.length)
          setRecentReports(reportsData.slice(0, 3))
          setInsightsCount(reportsData.length * 2)
        }

        // Fetch metrics
        const metricsRes = await fetch('http://localhost:5000/api/metrics', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json()
          const hr = metricsData.find(m => m.sub_metric === 'Troponin' || m.sub_metric === 'CK-MB' || m.sub_metric === 'BNP' || m.sub_metric.includes('Cholesterol') || m.sub_metric === 'Blood Pressure');
          // Match standard categories
          const hrEntry = metricsData.find(m => m.category === 'Heart' && m.sub_metric !== 'Blood Pressure')
          const bpEntry = metricsData.find(m => m.sub_metric === 'Blood Pressure')
          if (hrEntry) setLatestHeartRate(hrEntry)
          if (bpEntry) setLatestBP(bpEntry)
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    }

    fetchData()
  }, [])

  const displayName = user?.full_name || user?.email || 'Aravind'
  const initialLetter = displayName.charAt(0).toUpperCase()

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09122C 0%, #064E3B 100%)',
      minHeight: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      color: '#FFFFFF',
      padding: '40px 5%',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Top Row Welcoming Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #10B981, #059669)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: '#FFFFFF',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }}>
          {initialLetter}
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0, letterSpacing: '1px', color: '#FFFFFF' }}>
          {displayName}
        </h1>
      </div>

      {/* Desktop Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }} className="dashboard-grid">
        
        {/* LEFT COLUMN */}
        <div style={{ flex: '1.5' }}>
          <h2 style={headingStyle}>Your Health Overview</h2>
          
          <div style={{ ...glassStyle, padding: '32px', position: 'relative', overflow: 'hidden' }}>
            {/* Counter Container */}
            <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 2, marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#10B981', textShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                  {reportsCount < 10 ? `0${reportsCount}` : reportsCount}
                </div>
                <div style={{ fontSize: '14px', color: '#A7F3D0', marginTop: '8px', fontWeight: '600' }}>Reports Analyzed</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(16,185,129,0.2)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', fontWeight: '900', color: '#34D399', textShadow: '0 0 20px rgba(52,211,153,0.4)' }}>
                  {insightsCount < 10 ? `0${insightsCount}` : insightsCount}
                </div>
                <div style={{ fontSize: '14px', color: '#A7F3D0', marginTop: '8px', fontWeight: '600' }}>Health Insights</div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', color: '#D1FAE5', fontSize: '15px', position: 'relative', zIndex: 2, marginBottom: '40px', fontWeight: '500' }}>
              {reportsCount === 0 
                ? 'Upload your first report to get AI insights'
                : 'Your reports are safely stored and analyzed'
              }
            </div>

            {/* Visual Centerpiece */}
            <div style={{
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '180px', height: '240px',
                background: 'radial-gradient(ellipse at top, rgba(16,185,129,0.2) 0%, transparent 70%)',
                borderRadius: '50% 50% 0 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="140" height="200" viewBox="0 0 24 24" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1">
                  <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 20v-2a6 6 0 0 1 12 0v2" />
                  <path d="M9 16v4M15 16v4" strokeDasharray="2 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={headingStyle}>Health Metrics</h2>
            <Link to="/dashboard/metrics" style={{ color: '#10B981', fontSize: '15px', textDecoration: 'none', fontWeight: '700' }}>
              See All &gt;
            </Link>
          </div>

          <div style={{ ...glassStyle, padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '20px',
              background: 'rgba(239, 68, 68, 0.15)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '32px',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
            }}>
              ❤️
            </div>
            <p style={{ color: '#E2E8F0', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px', fontWeight: '500' }}>
              {reportsCount === 0 
                ? 'Upload your medical reports to see personalized health metrics and AI insights here.'
                : 'Vitals tracking is active. Keep uploading reports to populate new metrics!'
              }
            </p>
            <button onClick={() => navigate('/dashboard/reports')} style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '2px solid #10B981',
              color: '#10B981',
              borderRadius: '14px',
              padding: '14px 28px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Upload Report
            </button>
          </div>

          {/* Vitals Grid Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ ...glassStyle, padding: '20px', position: 'relative' }}>
              <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', position: 'absolute', top: '20px', right: '20px', boxShadow: '0 0 10px #10B981' }}></div>
              <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '16px', fontWeight: '600' }}>
                {latestHeartRate ? latestHeartRate.sub_metric : 'Heart Rate (Sample)'}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF' }}>
                  {latestHeartRate ? latestHeartRate.value : '72'}
                </span>
                <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '600' }}>bpm</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                {latestHeartRate ? new Date(latestHeartRate.recorded_at).toLocaleDateString() : '2023-04-20'}
              </div>
            </div>
            
            <div style={{ ...glassStyle, padding: '20px', position: 'relative' }}>
              <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', position: 'absolute', top: '20px', right: '20px', boxShadow: '0 0 10px #10B981' }}></div>
              <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '16px', fontWeight: '600', whiteSpace: 'nowrap' }}>Blood Pressure</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF' }}>
                  {latestBP ? latestBP.value : '120/80'}
                </span>
                <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: '600' }}>mmHg</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                {latestBP ? new Date(latestBP.recorded_at).toLocaleDateString() : '2023-04-19'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FULL-WIDTH BLOCK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: '20px' }}>
        <h2 style={headingStyle}>Recent Reports</h2>
        <Link to="/dashboard/reports" style={{ color: '#10B981', fontSize: '15px', textDecoration: 'none', fontWeight: '700' }}>
          See All &gt;
            </Link>
      </div>

      {recentReports.length === 0 ? (
        <div style={{ ...glassStyle, padding: '48px 24px', textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '56px', marginBottom: '24px', opacity: 0.8, filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.3))' }}>📄</div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF', marginBottom: '12px' }}>Ready to Get Started?</h3>
          <div style={{ color: '#F87171', fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>No recent reports</div>
          <p style={{ color: '#D1FAE5', fontSize: '16px', lineHeight: '1.6', maxWidth: '540px', margin: '0 auto 36px', fontWeight: '500' }}>
            Upload your medical reports to unlock AI-powered health insights, trend analysis, and personalized recommendations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', maxWidth: '320px', margin: '0 auto 36px' }}>
            <button onClick={() => navigate('/dashboard/reports')} style={{
              width: '100%', background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
              padding: '18px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Report
            </button>
            <button onClick={() => navigate('/dashboard/metrics')} style={{
              width: '100%', background: 'rgba(255,255,255,0.05)', color: '#FFFFFF', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px',
              padding: '18px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', backdropFilter: 'blur(8px)'
            }}>
              Explore Health Tab &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {recentReports.map(report => (
            <div key={report._id} style={{
              ...glassStyle, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <span style={{ fontSize: '28px' }}>📄</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: '#FFFFFF' }}>{report.document_type}</div>
                  <div style={{ fontSize: '13px', color: '#A7F3D0', marginTop: '4px' }}>
                    Source: {report.source} • Uploaded {new Date(report.uploaded_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '700' }}>
                Analyzed
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feature Category Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {[
          { title: 'Smart Reports', desc: 'Upload & understand medical documents', icon: '📄' },
          { title: 'Body Vitals', desc: 'Track health across major systems', icon: '❤️' },
          { title: 'Secure Sharing', desc: 'Share records with consent control', icon: '🔗' },
          { title: 'Hereditary Tracking', desc: 'Family medical history insights', icon: '🧬' }
        ].map((block, i) => (
          <div key={i} onClick={() => i === 0 ? navigate('/dashboard/reports') : navigate('/dashboard/metrics')} style={{ ...glassStyle, padding: '28px', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid rgba(16,185,129,0.2)' }} className="feature-block">
            <div style={{ fontSize: '32px', marginBottom: '20px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>{block.icon}</div>
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px', color: '#FFFFFF' }}>{block.title}</h4>
            <p style={{ fontSize: '14px', color: '#A7F3D0', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>{block.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dashboard-grid { grid-template-columns: 3fr 2fr !important; }
        }
        .feature-block:hover { transform: translateY(-6px); border-color: #10B981 !important; background: rgba(16,185,129,0.08) !important; }
      `}</style>
    </div>
  )
}
