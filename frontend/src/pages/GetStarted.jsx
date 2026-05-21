import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function GetStarted() {
  const [tab, setTab] = useState('whatsapp') // 'whatsapp' | 'email'
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // OTP Verification state variables
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verifying, setVerifying] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [isResending, setIsResending] = useState(false)
  const [isShake, setIsShake] = useState(false)

  const navigate = useNavigate()
  const otpRefs = useRef([])

  // Manage resend OTP countdown timer
  useEffect(() => {
    let timer
    if (showOtpScreen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [showOtpScreen, countdown])

  // Trigger shake animation on OTP card error
  const triggerShake = () => {
    setIsShake(true)
    setTimeout(() => setIsShake(false), 500)
  }

  // Handle WhatsApp or Email OTP request
  const handleContinue = async () => {
    setErrorMsg('')
    setOtpError('')

    if (tab === 'whatsapp') {
      if (!name || !name.trim()) {
        setErrorMsg('Please enter your full name')
        return
      }
      if (!phone || phone.trim().length < 10) {
        setErrorMsg('Please enter a valid phone number')
        return
      }
      setSending(true)
      try {
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phone.trim() }),
        })
        const data = await response.json()

        if (response.ok) {
          setShowOtpScreen(true)
          setCountdown(60)
          setOtp(['', '', '', '', '', ''])
          // Autofocus first input box
          setTimeout(() => {
            if (otpRefs.current[0]) otpRefs.current[0].focus()
          }, 100)
        } else {
          setErrorMsg(data.error || 'Failed to send OTP. Please try again.')
        }
      } catch (err) {
        console.error(err)
        setErrorMsg('Could not connect to server. Ensure Express backend is running.')
      } finally {
        setSending(false)
      }
    } else {
      // Validate inputs
      if (!name || !name.trim()) {
        setErrorMsg('Please enter your full name')
        return
      }
      if (!email || !email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address')
        return
      }

      setSending(true)
      try {
        const response = await fetch('http://localhost:5000/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        })
        const data = await response.json()

        if (response.ok) {
          setShowOtpScreen(true)
          setCountdown(60)
          setOtp(['', '', '', '', '', ''])
          // Autofocus first input box
          setTimeout(() => {
            if (otpRefs.current[0]) otpRefs.current[0].focus()
          }, 100)
        } else {
          setErrorMsg(data.error || 'Failed to send OTP. Please try again.')
        }
      } catch (err) {
        console.error(err)
        setErrorMsg('Could not connect to server. Ensure Express backend is running.')
      } finally {
        setSending(false)
      }
    }
  }

  // Verify OTP typed by user
  const handleVerifyOtp = async () => {
    const otpCode = otp.join('')
    if (otpCode.length < 6) {
      setOtpError('Please enter all 6 digits')
      triggerShake()
      return
    }

    setVerifying(true)
    setOtpError('')
    try {
      const payload = tab === 'whatsapp'
        ? { phone: phone.trim(), otp: otpCode, name: name.trim() }
        : { email: email.trim(), otp: otpCode, name: name.trim() }

      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (response.ok) {
        // Store JWT token and user info
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        // Navigate conditionally based on first time login
        if (data.isFirstTime) {
          navigate('/onboarding')
        } else {
          navigate('/dashboard')
        }
      } else {
        setOtpError(data.error || 'Incorrect OTP code. Please try again.')
        triggerShake()
      }
    } catch (err) {
      console.error(err)
      setOtpError('Could not verify OTP. Check backend server connection.')
      triggerShake()
    } finally {
      setVerifying(false)
    }
  }

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return

    setIsResending(true)
    setOtpError('')
    try {
      const payload = tab === 'whatsapp'
        ? { phone: phone.trim() }
        : { email: email.trim() }

      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (response.ok) {
        setCountdown(60)
        setOtp(['', '', '', '', '', ''])
        if (otpRefs.current[0]) otpRefs.current[0].focus()
      } else {
        setOtpError(data.error || 'Failed to resend OTP.')
      }
    } catch (err) {
      console.error(err)
      setOtpError('Failed to connect to authentication server.')
    } finally {
      setIsResending(false)
    }
  }

  // Single digit input key handling for shifting focus
  const handleOtpChange = (e, index) => {
    const val = e.target.value
    if (isNaN(val)) return // Digits only

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1) // Store single digit
    setOtp(newOtp)

    // Move to next field if value entered
    if (val && index < 5) {
      otpRefs.current[index + 1].focus()
    }
  }

  // Handle backspaces
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        otpRefs.current[index - 1].focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  // Handle paste events
  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    const nextFocusIndex = Math.min(pastedData.length, 5)
    if (otpRefs.current[nextFocusIndex]) {
      otpRefs.current[nextFocusIndex].focus()
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0d1b3e 0%, #0a2a5c 50%, #0d1b3e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'DM Sans', sans-serif"
    }}>

      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,196,180,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Main Container Card */}
      <div 
        className={isShake ? 'shake' : ''}
        style={{
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s'
        }}
      >

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '72px', height: '72px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            background: 'rgba(255,255,255,0.04)'
          }}>
            <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
              <path d="M24 42s-18-11.2-18-23C6 12.3 10.3 8 15.6 8c3 0 5.8 1.5 7.6 3.9L24 13l.8-1.1C26.6 9.5 29.4 8 32.4 8 37.7 8 42 12.3 42 19c0 11.8-18 23-18 23z"
                stroke="white" strokeWidth="2" fill="none" />
              <path d="M22 22h4M24 20v4" stroke="#00c4b4" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 26c0 2.2-1.8 4-4 4s-4-1.8-4-4"
                stroke="#00c4b4" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'white', letterSpacing: '2px' }}>
            HEALTHSYNC<span style={{ color: '#00c4b4' }}>.AI</span>
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', letterSpacing: '2.5px', marginTop: '4px' }}>
            SMARTER CARE WITH AI
          </div>
        </div>

        {/* Dynamic Card Content depending on screen state */}
        {!showOtpScreen ? (
          <div>
            {/* Headline */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h1 style={{
                fontSize: '26px', fontWeight: '800', color: 'white',
                lineHeight: '1.25', marginBottom: '10px',
                fontFamily: "'DM Serif Display', serif"
              }}>
                AI-Powered Care.<br />Personalized for You.
              </h1>
              <p style={{ fontSize: '14px', color: '#00c4b4', fontWeight: '500' }}>
                Advanced AI-based health reporting tool
              </p>
            </div>

            {/* Toggle label */}
            <p style={{
              textAlign: 'center', fontSize: '15px', fontWeight: '600',
              color: 'white', marginBottom: '14px'
            }}>
              {tab === 'whatsapp' ? 'Continue with WhatsApp' : 'Continue with Email'}
            </p>

            {/* Tab Switcher */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '14px',
              padding: '4px',
              marginBottom: '18px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <button
                onClick={() => { setTab('whatsapp'); setErrorMsg(''); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tab === 'whatsapp'
                    ? 'linear-gradient(135deg, #00c896, #00b4d8)'
                    : 'transparent',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.25s',
                  boxShadow: tab === 'whatsapp' ? '0 4px 14px rgba(0,200,150,0.25)' : 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={() => { setTab('email'); setErrorMsg(''); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: tab === 'email'
                    ? 'linear-gradient(135deg, #3b82f6, #00b4d8)'
                    : 'transparent',
                  color: tab === 'email' ? 'white' : 'rgba(255,255,255,0.55)',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.25s',
                  boxShadow: tab === 'email' ? '0 4px 14px rgba(59,130,246,0.25)' : 'none'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                Email
              </button>
            </div>

            {/* Input Fields */}
            {tab === 'whatsapp' ? (
              <div style={{ marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '15px',
                    padding: '16px 18px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                    marginBottom: '10px',
                    boxSizing: 'border-box'
                  }}
                  className="auth-input"
                />
                <div style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }} className="auth-input-wrap">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '0 14px',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    color: 'white', fontSize: '14px', fontWeight: '600',
                    whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none'
                  }}>
                    🇮🇳 +91
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white" opacity="0.5">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'white',
                      fontSize: '15px',
                      padding: '16px 14px',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '15px',
                    padding: '16px 18px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                    marginBottom: '10px',
                    boxSizing: 'border-box'
                  }}
                  className="auth-input"
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '15px',
                    padding: '16px 18px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  className="auth-input"
                />
              </div>
            )}

            {/* Error Message Display */}
            {errorMsg && (
              <div style={{
                color: '#ff4d4d',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '14px',
                textAlign: 'center',
                padding: '0 4px'
              }}>
                {errorMsg}
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={sending}
              style={{
                width: '100%',
                padding: '17px',
                border: 'none',
                borderRadius: '14px',
                background: sending
                  ? 'rgba(255,255,255,0.15)'
                  : 'linear-gradient(90deg, #1e88e5 0%, #00b8d4 50%, #00c896 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: sending ? 'not-allowed' : 'pointer',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: sending ? 'none' : '0 6px 24px rgba(30,136,229,0.35)',
                transition: 'all 0.3s',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.3px'
              }}
            >
              {sending ? (
                <>
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block'
                  }} />
                  Sending OTP...
                </>
              ) : (
                <>
                  Continue
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        ) : (
          /* OTP VERIFICATION VIEW */
          <div>
            {/* Headline */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{
                fontSize: '24px', fontWeight: '800', color: 'white',
                lineHeight: '1.25', marginBottom: '8px',
                fontFamily: "'DM Serif Display', serif"
              }}>
                {tab === 'whatsapp' ? 'Verify Your WhatsApp' : 'Verify Your Email'}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                We've sent a 6-digit OTP code to <br />
                <strong style={{ color: '#00c4b4' }}>
                  {tab === 'whatsapp' ? `+91 ${phone}` : email}
                </strong>
              </p>
            </div>

            {/* OTP Input Fields Row */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px',
                margin: '24px 0 16px 0'
              }}
              onPaste={handleOtpPaste}
            >
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpRefs.current[idx] = el}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  style={{
                    width: '46px',
                    height: '52px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    outline: 'none',
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: '700',
                    textAlign: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  className="otp-digit-input"
                />
              ))}
            </div>

            {/* OTP Error Messages */}
            {otpError && (
              <div style={{
                color: '#ff4d4d',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                {otpError}
              </div>
            )}

            {/* Verify & Login Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              style={{
                width: '100%',
                padding: '17px',
                border: 'none',
                borderRadius: '14px',
                background: verifying
                  ? 'rgba(255,255,255,0.15)'
                  : 'linear-gradient(90deg, #1e88e5 0%, #00b8d4 50%, #00c896 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: verifying ? 'not-allowed' : 'pointer',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: verifying ? 'none' : '0 6px 24px rgba(30,136,229,0.35)',
                transition: 'all 0.3s',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              {verifying ? (
                <>
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block'
                  }} />
                  Verifying OTP...
                </>
              ) : (
                <>
                  Verify & Continue
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            {/* Resend OTP Section */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              {countdown > 0 ? (
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  Resend code in <strong style={{ color: '#00c4b4' }}>{countdown}s</strong>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={isResending}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#00c4b4',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  {isResending ? 'Sending...' : 'Resend Verification Code'}
                </button>
              )}
            </div>

            {/* Back to Edit Email */}
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <button
                onClick={() => { setShowOtpScreen(false); setOtpError(''); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                className="edit-email-btn"
              >
                {tab === 'whatsapp' ? '← Back to edit name & phone' : '← Back to edit name & email'}
              </button>
            </div>
          </div>
        )}

        {/* Feature Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              ),
              label: 'AI Report\nScreening'
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round">
                  <polyline points="22 12 18 12 14 19 10 5 6 12 2 12" />
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42" />
                </svg>
              ),
              label: 'Health Trend\nTracking'
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
                  <path d="M12 12v10M8 16l4-4 4 4" />
                  <path d="M4.93 4.93l1.41 1.41M17.66 4.93l-1.41 1.41" />
                </svg>
              ),
              label: 'Smart Health\nInsights'
            }
          ].map((feat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                marginBottom: '8px', height: '28px'
              }}>
                {feat.icon}
              </div>
              <div style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.6)',
                lineHeight: '1.4', whiteSpace: 'pre-line'
              }}>
                {feat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <p style={{
          textAlign: 'center', fontSize: '12px',
          color: 'rgba(255,255,255,0.35)', lineHeight: '1.6'
        }}>
          Securely manage your health reports with AI-powered insights
        </p>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{
            fontSize: '12px', color: 'rgba(255,255,255,0.3)',
            textDecoration: 'none', transition: '0.2s'
          }} className="back-link">
            ← Back to home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
        .auth-input-wrap:focus-within {
          border-color: rgba(0,196,180,0.5) !important;
          box-shadow: 0 0 0 3px rgba(0,196,180,0.08);
        }
        .auth-input:focus {
          border-color: rgba(0,196,180,0.5) !important;
          box-shadow: 0 0 0 3px rgba(0,196,180,0.08);
        }
        .otp-digit-input:focus {
          border-color: rgba(0,196,180,0.6) !important;
          box-shadow: 0 0 8px rgba(0,196,180,0.3);
          background: rgba(255,255,255,0.12) !important;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.3); }
        input::placeholder { color: rgba(255,255,255,0.3); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #0d1b3e inset;
          -webkit-text-fill-color: white;
        }
        .back-link:hover { color: rgba(255,255,255,0.6) !important; }
        .edit-email-btn:hover { color: rgba(255,255,255,0.7) !important; }
      `}</style>
    </div>
  )
}

