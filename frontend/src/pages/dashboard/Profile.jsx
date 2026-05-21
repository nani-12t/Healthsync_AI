import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MODAL_DATA = {
  terms: {
    title: "Terms & Conditions",
    date: "LAST UPDATED ON 5th June 2025",
    content: [
      { h: "A. Eligibility", p: "Must be 18 years or older to register." },
      { h: "B. Account Registration", p: "Provide accurate registration information..." },
      { h: "A. AI-Powered Analysis", p: "Our application uses artificial intelligence to analyze health reports." },
      { h: "B. Health Data Processing", p: "We process your medical reports using secure AI systems and Google Cloud Vision API..." },
      { h: "Prohibited Activities", p: "Sharing account credentials with unauthorized parties is strictly prohibited." },
      { h: "Account Termination", p: "Users can delete accounts anytime through the app settings." },
      { h: "Contact Us", p: "grievances.myhealth@webshark.in / WEBSHARK WEB SERVICES PVT LTD" }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    content: [
      { h: "Collection of Information", p: "We collect personal and medical data explicitly provided by you." },
      { h: "B. Medical Data", p: "Includes uploaded reports, manually entered vitals." },
      { h: "C. Technical Information", p: "Device details, IP addresses, application logs." },
      { h: "How We Use Your Information", p: "To provide AI insights, secure storage, and personalized recommendations." },
      { h: "AI Processing & Data Sharing", p: "Data processed using Google Cloud Vision API. No third-party data selling." },
      { h: "Data Security & Storage", p: "Encrypted at rest and in transit on secure Indian servers." },
      { h: "Your Rights & Choices", p: "Right to access, modify, or permanently delete data." },
      { h: "Data Retention", p: "Retained only as long as account is active." },
      { h: "Contact Our Privacy Officer", p: "grievances.myhealth@webshark.in / WEBSHARK WEB SERVICES PVT LTD" }
    ]
  },
  security: {
    title: "Security Policy",
    content: [
      { h: "Data Protection", p: "Strict security protocols protecting user health data." },
      { h: "Data Encryption", p: "AES-256 encryption for data at rest in Indian servers, TLS 1.3 encryption for data in transit..." },
      { h: "Access Controls", p: "Role-based access and strict identity verification." },
      { h: "Monitoring & Audit", p: "Continuous security monitoring and periodic external audits." },
      { h: "Compliance & Standards", p: "Digital Personal Data Protection Act, 2023 compliance, ISO 27001..." },
      { h: "Mobile App Security", p: "Protection against reverse engineering and runtime threats." },
      { h: "Your Security Responsibilities", p: "Keep OTPs secure and device screens locked." },
      { h: "Security Contact", p: "grievances.myhealth@webshark.in, for urgent security matters mark email subject with 'SECURITY URGENT'." }
    ]
  },
  google: {
    title: "Google API Disclosure",
    content: [
      { h: "Google Services", p: "Integration with google cloud vision api for optical character recognition and text extraction..." },
      { h: "google cloud vision api", p: "Used for converting report images into readable text." },
      { h: "A. Purpose of Integration", p: "Enhancing AI analysis accuracy." },
      { h: "B. Data Processing", p: "Images are processed securely and deleted post-extraction." },
      { h: "privacy & security", p: "Data strictly restricted from being used to train Google's public models." },
      { h: "A. Data Protection", p: "Encrypted transit to Google API endpoints." },
      { h: "google's privacy policy", p: "Governed under Google Cloud standard security agreements." },
      { h: "limitations & disclaimers", p: "Extraction accuracy depends on original report quality." }
    ]
  }
}

export default function Profile() {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  // Profile data state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  
  const [formData, setFormData] = useState({
    email: '',
    dob: '',
    gender: 'Male',
    bloodGroup: '',
    height: '',
    weight: ''
  })
  const [loading, setLoading] = useState(true)

  // Family members list
  const [familyMembers, setFamilyMembers] = useState([])

  // Add Family Member form state
  const [familyFirstName, setFamilyFirstName] = useState('')
  const [familyLastName, setFamilyLastName] = useState('')
  const [familyDob, setFamilyDob] = useState('')
  const [familyRelationship, setFamilyRelationship] = useState('')
  const [familyGender, setFamilyGender] = useState('')
  const [familyBloodGroup, setFamilyBloodGroup] = useState('')
  const [savingFamily, setSavingFamily] = useState(false)
  const [familyError, setFamilyError] = useState('')

  const fetchProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setFormData({
          email: data.email || '',
          dob: data.dob ? data.dob.split('T')[0] : '',
          gender: data.gender || 'Male',
          bloodGroup: data.blood_group || '',
          height: data.height || '',
          weight: data.weight || ''
        })
        if (data.full_name) {
          const updatedUser = { ...user, full_name: data.full_name }
          setUser(updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFamilyMembers = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/api/family-members', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setFamilyMembers(data)
      }
    } catch (err) {
      console.error('Error fetching family members:', err)
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchFamilyMembers()
  }, [])

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleUpdate = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          dob: formData.dob,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          height: formData.height,
          weight: formData.weight
        })
      })
      if (res.ok) {
        setIsEditing(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
        fetchProfile()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSaveFamilyMember = async () => {
    if (!familyFirstName.trim() || !familyLastName.trim() || !familyDob || !familyRelationship || !familyGender) {
      setFamilyError('Please fill in all required fields marked with *')
      return
    }
    setFamilyError('')
    setSavingFamily(true)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://localhost:5000/api/family-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: familyFirstName.trim(),
          last_name: familyLastName.trim(),
          date_of_birth: familyDob,
          relationship: familyRelationship,
          gender: familyGender,
          blood_group: familyBloodGroup.trim()
        })
      })
      if (res.ok) {
        await fetchFamilyMembers()
        setFamilyFirstName('')
        setFamilyLastName('')
        setFamilyDob('')
        setFamilyRelationship('')
        setFamilyGender('')
        setFamilyBloodGroup('')
        setActiveModal('family')
      } else {
        const data = await res.json()
        setFamilyError(data.error || 'Failed to save family member')
      }
    } catch (err) {
      console.error(err)
      setFamilyError('Failed to connect to server')
    } finally {
      setSavingFamily(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const glassStyle = {
    background: 'rgba(16, 185, 129, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  }

  const displayName = user?.full_name || 'User'
  const displayEmail = user?.email || ''
  const displayInitial = displayName.charAt(0).toUpperCase()

  // Calculate completeness percentage
  let completeness = 20 // email is always present
  if (formData.dob) completeness += 20
  if (formData.gender) completeness += 20
  if (formData.bloodGroup) completeness += 20
  if (formData.height && formData.weight) completeness += 20

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09122C 0%, #064E3B 100%)',
      minHeight: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', sans-serif",
      padding: '40px 5%',
      position: 'relative'
    }}>
      
      {/* Top Row Identity Summary */}
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', padding: '28px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '24px', color: '#09122C',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)'
      }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '900', boxShadow: '0 4px 12px rgba(16,185,129,0.4)' }}>
          {displayInitial}
        </div>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>{displayName}</h2>
          <div style={{ fontSize: '16px', color: '#475569', fontWeight: '600' }}>{displayEmail}</div>
        </div>
      </div>

      {/* Profile Completeness Metric Meter Bar */}
      <div style={{ marginBottom: '32px', ...glassStyle, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF' }}>Profile Completeness</span>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#10B981' }}>{completeness}% Complete</span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: `${completeness}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: '5px' }}></div>
        </div>
      </div>

      {/* Dependent Profiles Access Box */}
      <div onClick={() => setActiveModal('family')} style={{
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '24px', padding: '24px', marginBottom: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '36px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>👥</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px', color: '#FFFFFF' }}>Manage Family Profiles</div>
            <div style={{ fontSize: '14px', color: '#D1FAE5', fontWeight: '500' }}>
              {familyMembers.length} {familyMembers.length === 1 ? 'member' : 'members'} added • Track their health records
            </div>
          </div>
        </div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"/></svg>
      </div>

      {/* Core Personal Information */}
      {loading ? (
        <div style={{ ...glassStyle, padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px' }}>
          <span style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '4px solid rgba(16,185,129,0.2)',
            borderTopColor: '#10B981',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      ) : (
        <div style={{ ...glassStyle, padding: '32px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Personal Information</h3>
            <button
              onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              style={{ background: isEditing ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.1)', border: isEditing ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(16,185,129,0.3)', color: isEditing ? '#F87171' : '#10B981', fontWeight: '800', fontSize: '15px', cursor: 'pointer', padding: '8px 16px', borderRadius: '10px', transition: 'all 0.2s' }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
                <span>✉️</span> Email Address
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '18px', borderRadius: '14px', fontSize: '16px', fontWeight: '500', color: 'rgba(255,255,255,0.6)' }}>
                {formData.email}
              </div>
            </div>
            {/* DOB */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
                <span>📅</span> Date of Birth
              </div>
              {isEditing ? (
                <input type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '14px', fontSize: '16px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box', fontWeight: '500' }} />
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '18px', borderRadius: '14px', fontSize: '16px', color: formData.dob ? '#FFFFFF' : '#A7F3D0', display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                  {formData.dob || 'Add your birth date'}
                  {!formData.dob && <span style={{ color: '#F59E0B' }}>⚠️</span>}
                </div>
              )}
            </div>
            {/* Gender */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
                <span>👤</span> Gender
              </div>
              {isEditing ? (
                <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '14px', fontSize: '16px', color: '#FFFFFF', outline: 'none', appearance: 'none', boxSizing: 'border-box', fontWeight: '500' }}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '18px', borderRadius: '14px', fontSize: '16px', fontWeight: '500' }}>{formData.gender}</div>
              )}
            </div>
            {/* Blood Group */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
                <span>🩸</span> Blood Group
              </div>
              {isEditing ? (
                <select value={formData.bloodGroup} onChange={e => handleChange('bloodGroup', e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '14px', fontSize: '16px', color: '#FFFFFF', outline: 'none', appearance: 'none', boxSizing: 'border-box', fontWeight: '500' }}>
                  <option value="">Select blood group</option>
                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
                </select>
              ) : (
                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '18px', borderRadius: '14px', fontSize: '16px', color: formData.bloodGroup ? '#FFFFFF' : '#A7F3D0', display: 'flex', justifyContent: 'space-between', fontWeight: '500' }}>
                  {formData.bloodGroup || 'Add blood group'}
                  {!formData.bloodGroup && <span style={{ color: '#F59E0B' }}>⚠️</span>}
                </div>
              )}
            </div>
            {/* Physical Stats */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
                <span>⚖️</span> Physical Stats
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {isEditing ? (
                  <>
                    <div>
                      <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '6px', fontWeight: '600' }}>Height (cm)</div>
                      <input value={formData.height} onChange={e => handleChange('height', e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '14px', fontSize: '16px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box', fontWeight: '500' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '6px', fontWeight: '600' }}>Weight (kg)</div>
                      <input value={formData.weight} onChange={e => handleChange('weight', e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid #10B981', padding: '16px', borderRadius: '14px', fontSize: '16px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box', fontWeight: '500' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '20px', borderRadius: '14px' }}>
                      <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '6px', fontWeight: '600' }}>Height</div>
                      <div style={{ fontSize: '18px', fontWeight: '800' }}>{formData.height || '--'} cm</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', padding: '20px', borderRadius: '14px' }}>
                      <div style={{ fontSize: '13px', color: '#A7F3D0', marginBottom: '6px', fontWeight: '600' }}>Weight</div>
                      <div style={{ fontSize: '18px', fontWeight: '800' }}>{formData.weight || '--'} kg</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {saved && (
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', borderRadius: '12px', padding: '16px', marginTop: '24px', color: '#10B981', fontSize: '15px', fontWeight: '800', textAlign: 'center' }}>
              ✓ Profile updated successfully!
            </div>
          )}

          <button
            onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
            style={{
              width: '100%', background: isEditing ? 'linear-gradient(90deg, #10B981, #059669)' : 'rgba(16,185,129,0.1)', color: isEditing ? 'white' : '#10B981', border: isEditing ? 'none' : '2px solid #10B981', borderRadius: '14px',
              padding: '18px', fontSize: '16px', fontWeight: '800', marginTop: '32px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: isEditing ? '0 8px 20px rgba(16,185,129,0.3)' : 'none'
            }}
          >
            {isEditing ? 'Save Changes' : 'Update Profile'}
          </button>
        </div>
      )}

      {/* Navigation Directory Block 2 */}
      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#A7F3D0', letterSpacing: '1.5px', marginBottom: '16px', paddingLeft: '16px' }}>SUPPORT & POLICIES</h4>
      <div style={{ ...glassStyle, padding: '12px 20px', marginBottom: '48px' }}>
        {[
          { label: 'Terms & Conditions', sub: 'App usage terms', key: 'terms' },
          { label: 'Privacy Policy', sub: 'Data protection info', key: 'privacy' },
          { label: 'Security Policy', sub: 'Security measures', key: 'security' },
          { label: 'Google API Disclosure', sub: 'Third-party integrations', key: 'google' }
        ].map((item, i) => (
          <div key={i} onClick={() => setActiveModal('doc_' + item.key)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: i < 3 ? '1px solid rgba(16,185,129,0.2)' : 'none', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px', color: '#FFFFFF' }}>{item.label}</div>
              <div style={{ fontSize: '14px', color: '#A7F3D0', fontWeight: '500' }}>{item.sub}</div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        ))}
      </div>

      {/* Master Logout Button */}
      <button onClick={handleLogout} style={{
        width: '100%', background: '#EF4444', color: 'white', border: 'none', borderRadius: '20px',
        padding: '20px', fontSize: '18px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px',
        boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        LOGOUT
      </button>

      <div style={{ textAlign: 'center', color: '#A7F3D0', fontSize: '14px', fontWeight: '600' }}>
        App Version 1.0.5
      </div>

      {/* INTERACTIVE EXTENSION OVERLAYS */}
      
      {/* Document Viewer Modal */}
      {activeModal && activeModal.startsWith('doc_') && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(2, 44, 34, 0.95)', zIndex: 2000,
          overflowY: 'auto', padding: '32px', backdropFilter: 'blur(20px)'
        }}>
          <button onClick={() => setActiveModal(null)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', color: '#FFFFFF', cursor: 'pointer', padding: '12px 20px', marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          
          <div style={{ ...glassStyle, padding: '40px', border: '1px solid rgba(16,185,129,0.4)' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px', color: '#FFFFFF' }}>
              {MODAL_DATA[activeModal.replace('doc_', '')].title}
            </h1>
            {MODAL_DATA[activeModal.replace('doc_', '')].date && (
              <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '800', marginBottom: '40px' }}>
                {MODAL_DATA[activeModal.replace('doc_', '')].date}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {MODAL_DATA[activeModal.replace('doc_', '')].content.map((sec, i) => (
                <div key={i}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '10px', color: '#34D399' }}>{sec.h}</h3>
                  <p style={{ fontSize: '16px', color: '#D1FAE5', lineHeight: '1.8', margin: 0, fontWeight: '500' }}>{sec.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manage Family Profiles Modals */}
      {activeModal === 'family' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.7)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#022C22', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '32px',
            width: '100%', maxWidth: '600px', padding: '32px', minHeight: '50vh',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <button onClick={() => setActiveModal(null)} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#FFFFFF', cursor: 'pointer', marginRight: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </button>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Select family member</h2>
            </div>

            {/* Me profile option */}
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
                {displayInitial}
              </div>
              <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{displayName} (You)</div>
            </div>

            {/* Family profiles list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '250px', overflowY: 'auto' }}>
              {familyMembers.map(member => (
                <div key={member._id} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
                    {member.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{member.full_name}</div>
                    <div style={{ fontSize: '13px', color: '#A7F3D0', marginTop: '4px' }}>{member.relationship} • {member.gender}</div>
                  </div>
                </div>
              ))}
            </div>

            <div onClick={() => setActiveModal('add_family')} style={{
              background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(16,185,129,0.4)', borderRadius: '20px', padding: '24px',
              textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', ':hover': { background: 'rgba(16,185,129,0.05)' }
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
              <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '600' }}>
                Add Family Member
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'add_family' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#022C22', zIndex: 1100,
          overflowY: 'auto', padding: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <button onClick={() => setActiveModal('family')} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#FFFFFF', cursor: 'pointer', marginRight: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0, color: '#FFFFFF' }}>Add Family Member</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto', ...glassStyle, padding: '32px', border: '1px solid rgba(16,185,129,0.3)' }}>
            <input type="text" placeholder="First Name *" value={familyFirstName} onChange={e => setFamilyFirstName(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }} />
            <input type="text" placeholder="Last Name *" value={familyLastName} onChange={e => setFamilyLastName(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }} />
            <input type="date" placeholder="Date of Birth *" value={familyDob} onChange={e => setFamilyDob(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }} />
            <select value={familyRelationship} onChange={e => setFamilyRelationship(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', appearance: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }}>
              <option value="">Relationship dropdown choice *</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Parent">Parent</option>
            </select>
            <select value={familyGender} onChange={e => setFamilyGender(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', appearance: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }}>
              <option value="">Gender dropdown selection *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Blood Group (Optional)" value={familyBloodGroup} onChange={e => setFamilyBloodGroup(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '18px', color: 'white', outline: 'none', fontSize: '16px', fontWeight: '500', boxSizing: 'border-box' }} />
            
            {familyError && (
              <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                {familyError}
              </div>
            )}

            <button onClick={handleSaveFamilyMember} disabled={savingFamily} style={{
              width: '100%', background: savingFamily ? 'rgba(255,255,255,0.15)' : 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
              padding: '20px', fontSize: '18px', fontWeight: '800', marginTop: '24px', cursor: savingFamily ? 'not-allowed' : 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
            }}>
              {savingFamily ? 'Saving...' : 'Save Family Member'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
