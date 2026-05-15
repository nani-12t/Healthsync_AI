import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white', padding: '80px 0 40px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '60px'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'white',
              textDecoration: 'none',
              fontFamily: "'DM Serif Display', serif"
            }}>
              HealthSync <span style={{ color: 'var(--accent2)', fontFamily: "'DM Sans', sans-serif" }}>AI</span>
            </Link>
            <p style={{ 
              marginTop: '20px', 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '14px', 
              lineHeight: '1.7',
              maxWidth: '300px'
            }}>
              Simplify healthcare with AI. Upload reports, track trends, and manage your family's health records — all from your browser, no download needed.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['𝕏', 'ig', 'in', 'fb'].map((icon, i) => (
                <div key={i} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', cursor: 'pointer', transition: '0.2s'
                }} className="social-icon">{icon}</div>
              ))}
            </div>
          </div>

          {[
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
            { title: 'Product', links: ['Features', 'Security', 'Business', 'Launch App'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] }
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ 
                fontSize: '13px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px', 
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '20px'
              }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: '12px' }}>
                    <Link to="#" style={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      textDecoration: 'none', 
                      fontSize: '14px',
                      transition: '0.2s'
                    }} className="footer-link">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            © 2026 HealthSync AI. All rights reserved. Made in India 🇮🇳
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Privacy</Link>
            <Link to="#" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        .social-icon:hover { background: var(--primary) !important; transform: translateY(-2px); }
        .footer-link:hover { color: var(--accent2) !important; }
      `}</style>
    </footer>
  )
}
