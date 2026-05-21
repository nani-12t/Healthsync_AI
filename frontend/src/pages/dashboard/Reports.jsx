import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Reports() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [modalState, setModalState] = useState('closed') // 'closed', 'add_doc'
  const [activeDrawer, setActiveDrawer] = useState(null) // null, 'select_type', 'select_source'
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null)

  // Auth & user info state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  // Dynamic profiles & reports states
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [familyMembers, setFamilyMembers] = useState([])
  const [selectedProfile, setSelectedProfile] = useState({ id: 'me', name: '' })
  
  // To upload for a profile (defaults to selectedProfile, but can be changed during upload flow)
  const [uploadTargetProfile, setUploadTargetProfile] = useState({ id: 'me', name: '' })

  // Document upload state
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Add Family Member form state
  const [familyFirstName, setFamilyFirstName] = useState('')
  const [familyLastName, setFamilyLastName] = useState('')
  const [familyDob, setFamilyDob] = useState('')
  const [familyRelationship, setFamilyRelationship] = useState('')
  const [familyGender, setFamilyGender] = useState('')
  const [familyBloodGroup, setFamilyBloodGroup] = useState('')
  const [savingFamily, setSavingFamily] = useState(false)
  const [familyError, setFamilyError] = useState('')

  useEffect(() => {
    if (user && !selectedProfile.name) {
      const name = user.full_name || user.email || 'Me'
      setSelectedProfile({ id: 'me', name })
      setUploadTargetProfile({ id: 'me', name })
    }
  }, [user])

  useEffect(() => {
    if (location.state?.openAddDocModal) {
      setModalState('add_doc')
      // Clear the state so it doesn't reopen on refresh
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const docTypes = [
    { id: 'Lab Test Report', desc: 'Blood tests, health checkups', meta: 'Max 20MB • PDF, JPG, PNG', iconColor: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 9h4"/><path d="m5 20 5-9V3h4v8l5 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/></svg>
    )},
    { id: 'Prescription', desc: 'Doctor prescribed medicines', meta: 'Max 10MB • PDF, JPG, PNG', iconColor: '#34D399', bgColor: 'rgba(52, 211, 153, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
    )},
    { id: 'Discharge Summary', desc: 'Hospital discharge notes', meta: 'Max 15MB • PDF, JPG, PNG', iconColor: '#059669', bgColor: 'rgba(5, 150, 105, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
    )}
  ]

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

  const fetchReports = async (profileId) => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    try {
      const url = profileId === 'me' 
        ? 'http://localhost:5000/api/reports' 
        : `http://localhost:5000/api/family-reports/${profileId}`
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setReports(data)
      }
    } catch (err) {
      console.error('Error fetching reports:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFamilyMembers()
  }, [])

  useEffect(() => {
    if (selectedProfile.name) {
      fetchReports(selectedProfile.id)
    }
  }, [selectedProfile])

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
      const data = await res.json()
      if (res.ok) {
        await fetchFamilyMembers()
        setFamilyFirstName('')
        setFamilyLastName('')
        setFamilyDob('')
        setFamilyRelationship('')
        setFamilyGender('')
        setFamilyBloodGroup('')
        const newMember = { id: data._id, name: data.full_name }
        setUploadTargetProfile(newMember)
        setActiveDrawer('family')
      } else {
        setFamilyError(data.error || 'Failed to save family member')
      }
    } catch (err) {
      console.error(err)
      setFamilyError('Failed to connect to server')
    } finally {
      setSavingFamily(false)
    }
  }

  const handleUploadDocument = async () => {
    if (!selectedType || !selectedSource) return
    setIsUploading(true)
    setUploadError('')
    const token = localStorage.getItem('token')
    const file_name = `${selectedType.toLowerCase().replace(/\s+/g, '_')}_${Date.now().toString().slice(-4)}.pdf`
    
    try {
      const isMe = uploadTargetProfile.id === 'me'
      const url = isMe ? 'http://localhost:5000/api/reports' : 'http://localhost:5000/api/family-reports'
      const body = isMe 
        ? { document_type: selectedType, source: selectedSource, file_name }
        : { family_member_id: uploadTargetProfile.id, document_type: selectedType, source: selectedSource, file_name }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (res.ok) {
        if (selectedProfile.id === uploadTargetProfile.id) {
          fetchReports(selectedProfile.id)
        } else {
          setSelectedProfile(uploadTargetProfile)
        }
        setModalState('closed')
        resetUploadState()
      } else {
        setUploadError(data.error || 'Failed to upload report')
      }
    } catch (err) {
      console.error(err)
      setUploadError('Failed to connect to server')
    } finally {
      setIsUploading(false)
    }
  }

  const resetUploadState = () => {
    setSelectedType(null)
    setSelectedSource(null)
    setUploadTargetProfile(selectedProfile)
  }

  const selectedDocObj = selectedType ? docTypes.find(d => d.id === selectedType) : null

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
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', marginTop: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', color: '#FFFFFF', letterSpacing: '1px' }}>
            Reports for {selectedProfile.name}
          </h1>
          <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '500' }}>
            {reports.length} {reports.length === 1 ? 'report' : 'reports'} • <span style={{ color: '#10B981', fontWeight: '700' }}>Live Synced</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => { resetUploadState(); setModalState('add_doc') }} style={{
            background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '12px',
            padding: '0 24px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', height: '44px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '800' }}>+</span> Upload
          </button>
        </div>
      </div>

      {/* Profiles Selector Bar */}
      <div style={{
        display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '30px', scrollbarWidth: 'none',
        alignItems: 'center'
      }}>
        {/* Me Profile */}
        <button onClick={() => setSelectedProfile({ id: 'me', name: user?.full_name || 'Me' })} style={{
          padding: '10px 24px',
          borderRadius: '24px',
          background: selectedProfile.id === 'me' ? '#10B981' : 'rgba(16, 185, 129, 0.05)',
          color: selectedProfile.id === 'me' ? '#FFFFFF' : '#A7F3D0',
          border: selectedProfile.id === 'me' ? 'none' : '1px solid rgba(16, 185, 129, 0.2)',
          fontSize: '15px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.2s', backdropFilter: 'blur(10px)', boxShadow: selectedProfile.id === 'me' ? '0 4px 12px rgba(16,185,129,0.3)' : 'none'
        }}>
          👤 Me
        </button>

        {/* Family Member Profiles */}
        {familyMembers.map(member => (
          <button key={member._id} onClick={() => setSelectedProfile({ id: member._id, name: member.full_name })} style={{
            padding: '10px 24px',
            borderRadius: '24px',
            background: selectedProfile.id === member._id ? '#10B981' : 'rgba(16, 185, 129, 0.05)',
            color: selectedProfile.id === member._id ? '#FFFFFF' : '#A7F3D0',
            border: selectedProfile.id === member._id ? 'none' : '1px solid rgba(16, 185, 129, 0.2)',
            fontSize: '15px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all 0.2s', backdropFilter: 'blur(10px)', boxShadow: selectedProfile.id === member._id ? '0 4px 12px rgba(16,185,129,0.3)' : 'none'
          }}>
            👥 {member.full_name}
          </button>
        ))}

        {/* Add Family Member Inline Switcher Button */}
        <button onClick={() => { resetUploadState(); setModalState('add_doc'); setActiveDrawer('add_family'); }} style={{
          padding: '10px 20px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          color: '#34D399',
          border: '1px dashed rgba(16, 185, 129, 0.4)',
          fontSize: '14px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
        }}>
          <span>+</span> Add Member
        </button>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <span style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '4px solid rgba(16,185,129,0.2)',
            borderTopColor: '#10B981',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      ) : reports.length === 0 ? (
        /* Empty State Layout */
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '60px 20px'
        }}>
          <div style={{
            width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px',
            boxShadow: '0 0 40px rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.2)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <path d="M14 2v6h6"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 16px 0', letterSpacing: '0.5px' }}>
            No reports found
          </h2>
          <p style={{ color: '#D1FAE5', fontSize: '16px', margin: '0 0 36px 0', fontWeight: '500' }}>
            No reports uploaded for {selectedProfile.name} yet
          </p>
          <button onClick={() => { resetUploadState(); setModalState('add_doc') }} style={{
            background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
            padding: '16px 36px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
          }}>
            Upload Report
          </button>
        </div>
      ) : (
        /* List View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {reports.map(report => (
            <div key={report._id} style={{
              background: 'rgba(16, 185, 129, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '20px',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <span style={{ fontSize: '32px' }}>📄</span>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{report.document_type}</div>
                  <div style={{ fontSize: '14px', color: '#A7F3D0', marginTop: '4px', fontWeight: '500' }}>
                    Source: {report.source} • Uploaded {new Date(report.uploaded_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '700' }}>
                  Analyzed
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BASE MODAL: Add Medical Document */}
      {modalState === 'add_doc' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(2, 44, 34, 0.9)', zIndex: 1000,
          display: 'flex', flexDirection: 'column',
          animation: 'fadeIn 0.2s ease-out',
          overflowY: 'auto', backdropFilter: 'blur(10px)'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', marginTop: '24px' }}>
              <div onClick={() => setModalState('closed')} style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: '20px', border: '1px solid rgba(16,185,129,0.2)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>
                {selectedType ? `Add ${selectedType}` : 'Add Medical Document'}
              </h2>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '700', marginBottom: '16px' }}>Upload For</div>
              <div onClick={() => setActiveDrawer('family')} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px' }}>
                    {uploadTargetProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF', marginBottom: '6px' }}>{uploadTargetProfile.name}</div>
                    <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '600' }}>Tap to add or change family members</div>
                  </div>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #10B981', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '700', marginBottom: '16px' }}>
                {selectedType ? 'Document Type' : 'Document File'}
              </div>
              
              {selectedType ? (
                <div onClick={() => setActiveDrawer('select_type')} style={{
                  background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '24px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: selectedDocObj?.iconColor || '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectedDocObj?.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF', marginBottom: '6px' }}>{selectedType}</div>
                      <div style={{ fontSize: '14px', color: '#A7F3D0', fontWeight: '500' }}>{selectedDocObj?.desc}</div>
                    </div>
                  </div>
                  <div style={{ color: '#10B981', fontSize: '15px', fontWeight: '800', padding: '10px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>
                    Change
                  </div>
                </div>
              ) : (
                <div onClick={() => setActiveDrawer('select_type')} style={{
                  background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(16,185,129,0.4)', borderRadius: '16px', padding: '48px 24px',
                  textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid #10B981', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  <div style={{ fontWeight: '800', color: '#FFFFFF', fontSize: '18px', marginBottom: '10px' }}>Select Document Type First</div>
                  <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '500' }}>Choose what type of document you want to upload</div>
                </div>
              )}

              {selectedSource && (
                <div style={{ marginTop: '32px' }}>
                  <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '700', marginBottom: '16px' }}>Selected Source</div>
                  <div onClick={() => setActiveDrawer('select_source')} style={{
                    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{selectedSource}</div>
                    </div>
                    <div style={{ color: '#10B981', fontSize: '15px', fontWeight: '800' }}>Change</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              {uploadError && (
                <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>
                  {uploadError}
                </div>
              )}

              <button 
                onClick={() => {
                  if (selectedType && !selectedSource) {
                    setActiveDrawer('select_source')
                  } else if (selectedType && selectedSource) {
                    handleUploadDocument()
                  } else {
                    setActiveDrawer('select_type')
                  }
                }}
                disabled={isUploading}
                style={{
                  width: '100%', background: isUploading ? 'rgba(255,255,255,0.15)' : 'linear-gradient(90deg, #10B981, #059669)', color: 'white',
                  border: 'none', borderRadius: '14px', padding: '18px', fontSize: '18px', fontWeight: '800', marginBottom: '28px', cursor: isUploading ? 'not-allowed' : 'pointer',
                  boxShadow: isUploading ? 'none' : '0 8px 20px rgba(16,185,129,0.3)'
                }}
              >
                {isUploading ? 'Uploading...' : (selectedSource ? 'Submit Document' : 'Upload Document')}
              </button>
              
              <div style={{ background: 'rgba(16,185,129,0.05)', borderRadius: '14px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start', border: '1px solid rgba(16,185,129,0.1)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #10B981', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0, marginTop: '2px', fontWeight: '800' }}>i</div>
                <p style={{ margin: 0, fontSize: '14px', color: '#A7F3D0', lineHeight: '1.6', fontWeight: '600' }}>
                  Upload medical documents for AI analysis and secure storage. AI insights available for lab reports, expanding to prescriptions and scans soon!
                </p>
              </div>
            </div>
          </div>
          
          {/* OVERLAY DRAWERS */}
          {activeDrawer && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)', zIndex: 1100,
              display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)'
            }}>
              <div style={{
                background: '#022C22', borderRadius: '32px', border: '1px solid rgba(16,185,129,0.3)',
                width: '100%', maxWidth: '600px', padding: '32px',
                animation: 'fadeIn 0.2s ease-out'
              }}>
                
                {/* SELECT TYPE DRAWER */}
                {activeDrawer === 'select_type' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Select document type</h2>
                        <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>✨</span> AI POWERED
                        </div>
                      </div>
                      <div onClick={() => setActiveDrawer(null)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                    </div>
                    <p style={{ color: '#A7F3D0', fontSize: '15px', marginBottom: '32px', marginTop: 0, fontWeight: '500' }}>Smart AI analysis for all your medical documents</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {docTypes.map(doc => (
                        <div key={doc.id} onClick={() => { setSelectedType(doc.id); setActiveDrawer('select_source') }} style={{
                          display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '12px', borderRadius: '16px', transition: 'background 0.2s', ':hover': { background: 'rgba(16,185,129,0.05)' }
                        }}>
                          <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `2px solid ${doc.iconColor}40`, color: doc.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'rgba(0,0,0,0.2)' }}>
                            {doc.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF', marginBottom: '6px' }}>{doc.id}</div>
                            <div style={{ fontSize: '15px', color: '#A7F3D0', marginBottom: '8px', fontWeight: '500' }}>{doc.desc}</div>
                            <div style={{ fontSize: '13px', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '6px 10px', borderRadius: '6px', display: 'inline-block', fontWeight: '700' }}>{doc.meta}</div>
                          </div>
                          <div style={{ color: '#10B981' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* SELECT SOURCE DRAWER */}
                {activeDrawer === 'select_source' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Select Source for {selectedType}</h2>
                      <div onClick={() => setActiveDrawer(null)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {[
                        { id: 'Camera', desc: `Take photo of your ${selectedType?.toLowerCase() || 'document'}`, color: '#34D399', icon: (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                        )},
                        { id: 'Gallery', desc: `Choose ${selectedType?.toLowerCase() || 'document'} from photos`, color: '#10B981', icon: (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        )},
                        { id: 'Files', desc: `Browse PDF ${selectedType?.toLowerCase() || 'document'}`, color: '#059669', icon: (
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        )}
                      ].map(source => (
                        <div key={source.id} onClick={() => { setSelectedSource(source.id); setActiveDrawer(null) }} style={{
                          background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer', transition: 'background 0.2s', backdropFilter: 'blur(10px)'
                        }}>
                          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: source.color, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${source.color}40` }}>
                            {source.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: '800', fontSize: '20px', color: '#FFFFFF', marginBottom: '6px' }}>{source.id}</div>
                            <div style={{ fontSize: '15px', color: '#A7F3D0', marginBottom: '6px', fontWeight: '500' }}>{source.desc}</div>
                            <div style={{ fontSize: '14px', color: '#10B981', fontWeight: '700' }}>{selectedDocObj?.desc || 'Blood tests, health checkups'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* FAMILY DRAWER */}
                {activeDrawer === 'family' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
                      <button onClick={() => setActiveDrawer(null)} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#FFFFFF', cursor: 'pointer', marginRight: '20px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      </button>
                      <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Select family member</h2>
                    </div>

                    {/* User themselves option */}
                    <div 
                      onClick={() => { setUploadTargetProfile({ id: 'me', name: user?.full_name || 'Me' }); setActiveDrawer(null); }}
                      style={{ 
                        background: uploadTargetProfile.id === 'me' ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.2)', 
                        border: uploadTargetProfile.id === 'me' ? '2px solid #10B981' : '1px solid rgba(16,185,129,0.15)', 
                        borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px', cursor: 'pointer' 
                      }}
                    >
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
                        {(user?.full_name || 'M').charAt(0).toUpperCase()}
                      </div>
                      <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{user?.full_name || 'Me'} (You)</div>
                    </div>

                    {/* Family list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                      {familyMembers.map(member => (
                        <div 
                          key={member._id}
                          onClick={() => { setUploadTargetProfile({ id: member._id, name: member.full_name }); setActiveDrawer(null); }}
                          style={{ 
                            background: uploadTargetProfile.id === member._id ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.2)', 
                            border: uploadTargetProfile.id === member._id ? '2px solid #10B981' : '1px solid rgba(16,185,129,0.15)', 
                            borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' 
                          }}
                        >
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900' }}>
                            {member.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF' }}>{member.full_name}</div>
                            <div style={{ fontSize: '13px', color: '#A7F3D0', marginTop: '4px' }}>{member.relationship}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div onClick={() => setActiveDrawer('add_family')} style={{
                      background: 'rgba(0,0,0,0.2)', border: '2px dashed rgba(16,185,129,0.4)', borderRadius: '20px', padding: '30px 24px',
                      textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>👥</div>
                      <div style={{ fontSize: '15px', color: '#A7F3D0', fontWeight: '600', marginBottom: '8px' }}>
                        Add family members
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B' }}>
                        Track health records for your spouse, children or parents
                      </div>
                    </div>
                  </>
                )}

                {/* ADD FAMILY DRAWER */}
                {activeDrawer === 'add_family' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                      <button onClick={() => setActiveDrawer('family')} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#FFFFFF', cursor: 'pointer', marginRight: '20px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                      </button>
                      <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0, color: '#FFFFFF' }}>Add Family Member</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto', background: 'rgba(16, 185, 129, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px', padding: '32px' }}>
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
