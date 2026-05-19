import { Link, useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1936',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif",
      color: 'white',
      justifyContent: 'center'
    }}>
      {/* Background Concentric Circles */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vw',
        maxWidth: '800px',
        maxHeight: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,35,77,0.8) 0%, rgba(10,25,54,0) 70%)',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65%',
          height: '65%',
          borderRadius: '50%',
          background: 'rgba(14,35,77,0.9)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* 3D Medical Cross Icon */}
        <div style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          marginBottom: '60px',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))'
        }}>
          {/* Main vertical bar */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '180px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e5ec 100%)',
            borderRadius: '16px',
            boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.8)'
          }} />
          {/* Main horizontal bar */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            width: '180px',
            height: '60px',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0e5ec 100%)',
            borderRadius: '16px',
            boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.8)'
          }} />
        </div>

        {/* Text Content */}
        <h1 style={{
          fontSize: '34px',
          fontWeight: '700',
          textAlign: 'center',
          lineHeight: '1.2',
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          Your Health,<br />One Tap Away
        </h1>
        
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.8)',
          textAlign: 'center',
          lineHeight: '1.5',
          marginBottom: '48px',
          maxWidth: '320px'
        }}>
          Upload your medical reports and get AI-powered health insights in seconds
        </p>

        {/* Upload Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          padding: '10px 10px 10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '32px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <span style={{
            color: '#1a1a1a',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Upload My First Report
          </span>
          <div style={{
            background: 'black',
            borderRadius: '14px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
        </button>

        {/* Skip Link */}
        <Link to="/dashboard" style={{
          color: 'white',
          fontSize: '15px',
          fontWeight: '500',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
          paddingBottom: '2px',
          marginBottom: '20px'
        }}>
          Skip - Explore App
        </Link>
        
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center'
        }}>
          Explore features and upload reports later
        </p>
      </div>

      {/* Blue gradient bottom safe area matching the image */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(to right, #1e88e5, #0ea5e9)',
        zIndex: 0
      }} />
    </div>
  )
}
