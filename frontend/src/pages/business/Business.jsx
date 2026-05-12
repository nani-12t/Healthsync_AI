import { Link } from 'react-router-dom'

export default function Business() {
  const sections = [
    { title: 'Labs', path: '/business/labs', icon: '🔬' },
    { title: 'Insurance', path: '/business/insurance', icon: '🛡️' },
    { title: 'Hospitals', path: '/business/hospitals', icon: '🏥' },
    { title: 'Doctors', path: '/business/doctors', icon: '👨‍⚕️' }
  ]

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Business Solutions</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
        Scale your healthcare services with our integrated AI platform.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        {sections.map((sec, i) => (
          <Link key={i} to={sec.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="glass-card" style={{
              padding: '2.5rem',
              transition: 'var(--transition)',
              cursor: 'pointer',
              height: '100%',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{sec.icon}</div>
              <h2 style={{ marginBottom: '1rem' }}>{sec.title}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Empower your {sec.title.toLowerCase()} operations with automated 
                workflows and real-time data sync.
              </p>
              <div style={{ 
                marginTop: '1.5rem', 
                color: 'var(--accent-primary)', 
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Explore Solution →
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <style>{`
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }
      `}</style>
    </div>
  )
}