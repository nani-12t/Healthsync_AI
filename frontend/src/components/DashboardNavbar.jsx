import { Link, useLocation } from 'react-router-dom'

export default function DashboardNavbar() {
  const location = useLocation()
  
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const initial = user?.full_name 
    ? user.full_name.charAt(0).toUpperCase() 
    : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Metrics', path: '/dashboard/metrics' },
    { name: 'Reports', path: '/dashboard/reports' },
    { name: 'Profile', path: '/dashboard/profile' }
  ]

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid var(--border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Link to="/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '34px',
            height: '34px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'white' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--dark)',
            letterSpacing: '-0.5px',
            fontFamily: "'DM Serif Display', serif"
          }}>
            HealthSync <span style={{ color: 'var(--primary)', fontFamily: "'DM Sans', sans-serif" }}>AI</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
            return (
              <Link 
                key={item.name} 
                to={item.path}
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: isActive ? 'var(--bg3)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            background: 'var(--bg2)',
            border: 'none',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px'
          }}>
            🔔
          </button>
          <Link to="/dashboard/profile" style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '15px',
            textDecoration: 'none'
          }}>
            {initial}
          </Link>
        </div>
      </div>
    </nav>
  )
}
