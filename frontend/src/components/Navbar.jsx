import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', fill: 'white' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
          <span style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--dark)',
            letterSpacing: '-0.5px',
            fontFamily: "'DM Serif Display', serif"
          }}>
            HealthSync <span style={{ color: 'var(--primary)', fontFamily: "'DM Sans', sans-serif" }}>AI</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '4px', marginRight: '20px' }}>
            <li><a href="/#features" className="nav-link" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Features</a></li>
            <li><a href="/#compliance" className="nav-link" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('compliance')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>Compliance</a></li>
            <li><a href="/#faqs" className="nav-link" onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}>FAQ</a></li>
            <li className="nav-dropdown" style={{ position: 'relative' }}>
              <Link to="#" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                For Partners <span style={{ fontSize: '10px' }}>▼</span>
              </Link>
              <div className="dropdown-menu">
                <div className="dropdown-label">Partner Verticals</div>
                <div className="dropdown-divider"></div>
                {[
                  { title: 'Overview', desc: 'All B2B partnerships', icon: '⊞', path: '/business/overview' },
                  { title: 'Diagnostic Labs', desc: 'AI summaries & WhatsApp delivery', icon: '📈', path: '/business/labs' },
                  { title: 'Insurance Companies', desc: 'Proactive policyholder health', icon: '🛡️', path: '/business/insurance' },
                  { title: 'Hospitals & Clinics', desc: 'Post-discharge patient engagement', icon: '🏠', path: '/business/hospitals' },
                  { title: 'For Doctors', desc: 'Upload reports, engage patients', icon: '👤', path: '/business/doctors' }
                ].map((item, i) => (
                  <Link key={i} to={item.path} className="dropdown-item">
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '8px',
                        background: 'var(--bg2)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', color: 'var(--primary)'
                      }}>{item.icon}</div>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </li>
          </ul>
          <Link to="/get-started" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
            Create Account
          </Link>
        </div>
      </div>

      <style>{`
        .nav-link {
          color: var(--text);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .nav-link:hover {
          background: var(--bg3);
          color: var(--primary);
        }
        .nav-dropdown:hover .dropdown-menu {
          display: block;
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid var(--border);
          border-radius: 14px;
          min-width: 280px;
          box-shadow: var(--shadow-lg);
          padding: 8px;
          z-index: 100;
          margin-top: 8px;
          opacity: 0;
          transform: translateY(10px);
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dropdown-label {
          padding: 6px 10px 4px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 6px 0;
        }
        .dropdown-item {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text);
          transition: background 0.15s;
        }
        .dropdown-item:hover {
          background: var(--bg3);
        }
        .dropdown-item strong {
          display: block;
          font-weight: 600;
          color: var(--dark);
          font-size: 13px;
        }
        .dropdown-item span {
          display: block;
          color: var(--text-muted);
          font-size: 12px;
        }
      `}</style>
    </nav>
  )
}
