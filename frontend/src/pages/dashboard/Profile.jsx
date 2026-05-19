import { useState } from 'react'

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
  const [activeModal, setActiveModal] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    email: 'teajaaravind.bandaru@gmail.com',
    dob: '',
    gender: 'Male',
    bloodGroup: '',
    height: '170',
    weight: '70'
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleUpdate = () => {
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09122C 0%, #0E1738 100%)',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', sans-serif",
      padding: '24px 24px 100px 24px',
      position: 'relative'
    }}>
      
      {/* Top Row Identity Summary */}
      <div style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
        borderRadius: '20px', padding: '24px', marginBottom: '16px',
        display: 'flex', alignItems: 'center', gap: '20px', color: '#09122C'
      }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold' }}>A</div>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0' }}>Aravind Nani</h2>
          <div style={{ fontSize: '15px', color: '#475569', fontWeight: '500' }}>+91 8074235640</div>
        </div>
      </div>

      {/* Profile Completeness Metric Meter Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#10B981' }}>50% Profile Complete</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#131F46', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: '50%', height: '100%', background: '#10B981', borderRadius: '4px' }}></div>
        </div>
      </div>

      {/* Dependent Profiles Access Box */}
      <div onClick={() => setActiveModal('family')} style={{
        background: '#2563EB', borderRadius: '20px', padding: '20px', marginBottom: '32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '28px' }}>👥</div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Manage Family Profiles</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>Add family members to track their health records</div>
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </div>

      {/* Core Personal Information */}
      <div style={{ background: '#131F46', border: '1px solid #1C2C61', borderRadius: '20px', padding: '24px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Personal Information</h3>
          <button
            onClick={() => isEditing ? (setIsEditing(false)) : setIsEditing(true)}
            style={{ background: isEditing ? 'rgba(239,68,68,0.1)' : 'transparent', border: 'none', color: isEditing ? '#EF4444' : '#3B82F6', fontWeight: '600', fontSize: '14px', cursor: 'pointer', padding: '6px 12px', borderRadius: '8px' }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>✉️</span> Email Address
            </div>
            {isEditing ? (
              <input value={formData.email} onChange={e => handleChange('email', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '16px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }} />
            ) : (
              <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px', fontSize: '15px' }}>{formData.email}</div>
            )}
          </div>
          {/* DOB */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>📅</span> Date of Birth
            </div>
            {isEditing ? (
              <input type="date" value={formData.dob} onChange={e => handleChange('dob', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '16px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }} />
            ) : (
              <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px', fontSize: '15px', color: formData.dob ? '#FFFFFF' : '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                {formData.dob || 'Add your birth date'}
                {!formData.dob && <span style={{ color: '#F59E0B' }}>⚠️</span>}
              </div>
            )}
          </div>
          {/* Gender */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>👤</span> Gender
            </div>
            {isEditing ? (
              <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '16px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', appearance: 'none', boxSizing: 'border-box' }}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px', fontSize: '15px' }}>{formData.gender}</div>
            )}
          </div>
          {/* Blood Group */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>🩸</span> Blood Group
            </div>
            {isEditing ? (
              <select value={formData.bloodGroup} onChange={e => handleChange('bloodGroup', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '16px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', appearance: 'none', boxSizing: 'border-box' }}>
                <option value="">Select blood group</option>
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(bg => <option key={bg}>{bg}</option>)}
              </select>
            ) : (
              <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px', fontSize: '15px', color: formData.bloodGroup ? '#FFFFFF' : '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
                {formData.bloodGroup || 'Add blood group'}
                {!formData.bloodGroup && <span style={{ color: '#F59E0B' }}>⚠️</span>}
              </div>
            )}
          </div>
          {/* Physical Stats */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#94A3B8', fontSize: '13px' }}>
              <span>⚖️</span> Physical Stats
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {isEditing ? (
                <>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Height (cm)</div>
                    <input value={formData.height} onChange={e => handleChange('height', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '12px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Weight (kg)</div>
                    <input value={formData.weight} onChange={e => handleChange('weight', e.target.value)} style={{ width: '100%', background: '#09122C', border: '1px solid #3B82F6', padding: '12px', borderRadius: '12px', fontSize: '15px', color: '#FFFFFF', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Height</div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>{formData.height} cm</div>
                  </div>
                  <div style={{ background: '#09122C', border: '1px solid #1C2C61', padding: '16px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>Weight</div>
                    <div style={{ fontSize: '15px', fontWeight: '600' }}>{formData.weight} kg</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {saved && (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10B981', borderRadius: '10px', padding: '12px 16px', marginTop: '20px', color: '#10B981', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
            ✓ Profile updated successfully!
          </div>
        )}

        <button
          onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
          style={{
            width: '100%', background: isEditing ? '#10B981' : '#3B82F6', color: 'white', border: 'none', borderRadius: '12px',
            padding: '16px', fontSize: '15px', fontWeight: '700', marginTop: '24px', cursor: 'pointer', transition: 'background 0.2s'
          }}
        >
          {isEditing ? 'Save Changes' : 'Update Profile'}
        </button>
      </div>

      {/* Navigation Directory Block 2 */}
      <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '12px' }}>SUPPORT & POLICIES</h4>
      <div style={{ background: '#131F46', border: '1px solid #1C2C61', borderRadius: '20px', padding: '8px 16px', marginBottom: '40px' }}>
        {[
          { label: 'Terms & Conditions', sub: 'App usage terms', key: 'terms' },
          { label: 'Privacy Policy', sub: 'Data protection info', key: 'privacy' },
          { label: 'Security Policy', sub: 'Security measures', key: 'security' },
          { label: 'Google API Disclosure', sub: 'Third-party integrations', key: 'google' }
        ].map((item, i) => (
          <div key={i} onClick={() => setActiveModal('doc_' + item.key)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < 3 ? '1px solid #1C2C61' : 'none', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{item.sub}</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        ))}
      </div>

      {/* Master Logout Button */}
      <button style={{
        width: '100%', background: '#EF4444', color: 'white', border: 'none', borderRadius: '16px',
        padding: '18px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        LOGOUT
      </button>

      <div style={{ textAlign: 'center', color: '#94A3B8', fontSize: '13px', fontWeight: '500' }}>
        App Version 1.0.5
      </div>

      {/* INTERACTIVE EXTENSION OVERLAYS */}
      
      {/* Document Viewer Modal */}
      {activeModal && activeModal.startsWith('doc_') && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#09122C', zIndex: 2000,
          overflowY: 'auto', padding: '24px'
        }}>
          <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px 0', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
            {MODAL_DATA[activeModal.replace('doc_', '')].title}
          </h1>
          {MODAL_DATA[activeModal.replace('doc_', '')].date && (
            <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600', marginBottom: '32px' }}>
              {MODAL_DATA[activeModal.replace('doc_', '')].date}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {MODAL_DATA[activeModal.replace('doc_', '')].content.map((sec, i) => (
              <div key={i}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#3B82F6' }}>{sec.h}</h3>
                <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>{sec.p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manage Family Profiles Modals */}
      {activeModal === 'family' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(9, 18, 44, 0.85)', zIndex: 1000,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#131F46', borderTop: '1px solid #1C2C61', borderRadius: '24px 24px 0 0',
            width: '100%', maxWidth: '600px', padding: '24px', minHeight: '50vh',
            boxShadow: '0 -20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: 0, marginRight: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </button>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>Select family member</h2>
            </div>

            <div style={{ background: '#09122C', border: '1px solid #3B82F6', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>A</div>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>Aravind Nani (You)</div>
            </div>

            <div onClick={() => setActiveModal('add_family')} style={{
              background: '#09122C', border: '1px dashed #1C2C61', borderRadius: '16px', padding: '40px 24px',
              textAlign: 'center', cursor: 'pointer'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>👥</div>
              <div style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '280px', margin: '0 auto', lineHeight: '1.6' }}>
                No family members yet. Add family members to manage their health records
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'add_family' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#131F46', zIndex: 1100,
          overflowY: 'auto', padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <button onClick={() => setActiveModal('family')} style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: 0, marginRight: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Add Family Member</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="First Name *" style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none' }} />
            <input type="text" placeholder="Last Name *" style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none' }} />
            <input type="date" placeholder="Date of Birth *" style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none' }} />
            <select style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none', appearance: 'none' }}>
              <option value="">Relationship dropdown choice *</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
            </select>
            <select style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none', appearance: 'none' }}>
              <option value="">Gender dropdown selection *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="text" placeholder="Blood Group (Optional)" style={{ width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '16px', color: 'white', outline: 'none' }} />
            
            <button onClick={() => setActiveModal('family')} style={{
              width: '100%', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px',
              padding: '16px', fontSize: '16px', fontWeight: '700', marginTop: '16px', cursor: 'pointer'
            }}>
              Save Family Member
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
