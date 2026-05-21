import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function GetStarted() {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // OTP Verification state variables (used for Sign In)
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

  // Handle Send OTP (Sign In) or Direct Sign Up
  const handleContinue = async () => {
    setErrorMsg('')
    setOtpError('')

    if (mode === 'signin') {
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
        setErrorMsg('Could not connect to server. Ensure backend is running.')
      } finally {
        setSending(false)
      }
    } else {
      // Create Account (Sign Up) Flow
      if (!firstName || !firstName.trim()) {
        setErrorMsg('Please enter your first name')
        return
      }
      if (!lastName || !lastName.trim()) {
        setErrorMsg('Please enter your last name')
        return
      }
      if (!email || !email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address')
        return
      }
      if (!password || password.length < 6) {
        setErrorMsg('Password must be at least 6 characters')
        return
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match')
        return
      }

      setSending(true)
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: password
          }),
        })
        const data = await response.json()

        if (response.ok) {
          // Store JWT token and user info
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          
          // Direct login redirect to onboarding
          navigate('/onboarding')
        } else {
          setErrorMsg(data.error || 'Failed to create account. Please try again.')
        }
      } catch (err) {
        console.error(err)
        setErrorMsg('Could not connect to server. Ensure backend is running.')
      } finally {
        setSending(false)
      }
    }
  }

  // Verify OTP typed by user (for Sign In)
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
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otpCode }),
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
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
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
              {mode === 'signin' ? 'Sign In to Your Account' : 'Create New Account'}
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
                onClick={() => { setMode('signin'); setErrorMsg(''); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: mode === 'signin'
                    ? 'linear-gradient(135deg, #1e88e5, #00b8d4)'
                    : 'transparent',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.25s',
                  boxShadow: mode === 'signin' ? '0 4px 14px rgba(30,136,229,0.25)' : 'none'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('signup'); setErrorMsg(''); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: mode === 'signup'
                    ? 'linear-gradient(135deg, #00c896, #00b4d8)'
                    : 'transparent',
                  color: mode === 'signup' ? 'white' : 'rgba(255,255,255,0.55)',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.25s',
                  boxShadow: mode === 'signup' ? '0 4px 14px rgba(0,200,150,0.25)' : 'none'
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Input Fields */}
            {mode === 'signin' ? (
              <div style={{ marginBottom: '14px' }}>
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
            ) : (
              <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    style={{
                      width: '50%',
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
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    style={{
                      width: '50%',
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
                <input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
                  : mode === 'signin'
                    ? 'linear-gradient(90deg, #1e88e5 0%, #00b8d4 100%)'
                    : 'linear-gradient(90deg, #00c896 0%, #00b8d4 100%)',
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
                  {mode === 'signin' ? 'Sending OTP...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {mode === 'signin' ? 'Continue' : 'Create Account'}
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
                Verify Your Email
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                We've sent a 6-digit OTP code to <br />
                <strong style={{ color: '#00c4b4' }}>{email}</strong>
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
                  : 'linear-gradient(90deg, #1e88e5 0%, #00b8d4 100%)',
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
                ← Back to edit email
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
