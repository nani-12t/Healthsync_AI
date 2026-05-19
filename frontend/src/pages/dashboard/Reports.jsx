import { useState } from 'react'

export default function Reports() {
  const [modalState, setModalState] = useState('closed') // 'closed', 'add_doc'
  const [activeDrawer, setActiveDrawer] = useState(null) // null, 'select_type', 'select_source'
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSource, setSelectedSource] = useState(null)

  const docTypes = [
    { id: 'Lab Test Report', desc: 'Blood tests, health checkups', meta: 'Max 20MB • PDF, JPG, PNG', iconColor: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 9h4"/><path d="m5 20 5-9V3h4v8l5 9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/></svg>
    )},
    { id: 'Prescription', desc: 'Doctor prescribed medicines', meta: 'Max 10MB • PDF, JPG, PNG', iconColor: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
    )},
    { id: 'Discharge Summary', desc: 'Hospital discharge notes', meta: 'Max 15MB • PDF, JPG, PNG', iconColor: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
    )}
  ]

  const resetUploadState = () => {
    setSelectedType(null)
    setSelectedSource(null)
  }

  const selectedDocObj = selectedType ? docTypes.find(d => d.id === selectedType) : null

  return (
    <div style={{
      background: '#040B16',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', sans-serif",
      padding: '24px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', marginTop: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0', color: '#F8FAFC' }}>My Reports</h1>
          <div style={{ fontSize: '14px', color: '#94A3B8' }}>
            No reports • <span style={{ color: '#10B981' }}>Updated 5:16 PM</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: '#10B981'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button onClick={() => { resetUploadState(); setModalState('add_doc') }} style={{
            background: 'linear-gradient(90deg, #0284C7, #0D9488)', color: 'white', border: 'none', borderRadius: '12px',
            padding: '0 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', height: '40px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: '400' }}>+</span> Upload
          </button>
        </div>
      </div>

      {/* Empty State Layout */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', marginTop: '-60px'
      }}>
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#F8FAFC', margin: '0 0 12px 0' }}>
          No reports found
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '15px', margin: '0 0 32px 0' }}>
          No reports uploaded for Aravind Nani yet
        </p>
        <button onClick={() => { resetUploadState(); setModalState('add_doc') }} style={{
          background: 'linear-gradient(90deg, #0284C7, #0D9488)', color: 'white', border: 'none', borderRadius: '12px',
          padding: '14px 32px', fontSize: '15px', fontWeight: '600', cursor: 'pointer'
        }}>
          Upload Report
        </button>
      </div>

      {/* BASE MODAL: Add Medical Document */}
      {modalState === 'add_doc' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: '#0B1120', zIndex: 1000,
          display: 'flex', flexDirection: 'column',
          animation: 'fadeIn 0.2s ease-out',
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', marginTop: '16px' }}>
              <div onClick={() => setModalState('closed')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: '16px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#F8FAFC' }}>
                {selectedType ? `Add ${selectedType}` : 'Add Medical Document'}
              </h2>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600', marginBottom: '12px' }}>Upload For</div>
              <div style={{ background: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '18px' }}>A</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '16px', color: '#F8FAFC', marginBottom: '4px' }}>Aravind Nani</div>
                    <div style={{ fontSize: '13px', color: '#10B981' }}>Tap to add or change family members</div>
                  </div>
                </div>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #10B981', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600', marginBottom: '12px' }}>
                {selectedType ? 'Document Type' : 'Document File'}
              </div>
              
              {selectedType ? (
                <div onClick={() => setActiveDrawer('select_type')} style={{
                  background: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '20px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ color: selectedDocObj?.iconColor || '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectedDocObj?.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#F8FAFC', marginBottom: '4px' }}>{selectedType}</div>
                      <div style={{ fontSize: '13px', color: '#64748B' }}>{selectedDocObj?.desc}</div>
                    </div>
                  </div>
                  <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '600', padding: '8px 12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                    Change
                  </div>
                </div>
              ) : (
                <div onClick={() => setActiveDrawer('select_type')} style={{
                  background: '#111827', border: '1px dashed #334155', borderRadius: '16px', padding: '40px 20px',
                  textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #3B82F6', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  <div style={{ fontWeight: '600', color: '#F8FAFC', fontSize: '16px', marginBottom: '8px' }}>Select Document Type First</div>
                  <div style={{ fontSize: '14px', color: '#64748B' }}>Choose what type of document you want to upload</div>
                </div>
              )}

              {selectedSource && (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '600', marginBottom: '12px' }}>Selected Source</div>
                  <div onClick={() => setActiveDrawer('select_source')} style={{
                    background: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#F8FAFC' }}>{selectedSource}</div>
                    </div>
                    <div style={{ color: '#3B82F6', fontSize: '14px', fontWeight: '600' }}>Change</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button onClick={() => {
                if (selectedType && !selectedSource) {
                  setActiveDrawer('select_source')
                } else if (selectedType && selectedSource) {
                  // Handle actual upload
                } else {
                  setActiveDrawer('select_type')
                }
              }} style={{
                width: '100%', background: 'linear-gradient(90deg, #0284C7, #0D9488)', color: 'white',
                border: 'none', borderRadius: '12px', padding: '16px', fontSize: '16px', fontWeight: '600', marginBottom: '24px', cursor: 'pointer'
              }}>
                {selectedSource ? 'Submit Document' : 'Upload Document'}
              </button>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #64748B', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>i</div>
                <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: '1.5' }}>
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
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
            }}>
              <div style={{
                background: '#0F172A', borderRadius: '24px 24px 0 0',
                width: '100%', maxWidth: '600px', padding: '24px', paddingBottom: '40px',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                
                {/* SELECT TYPE DRAWER */}
                {activeDrawer === 'select_type' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#F8FAFC' }}>Select document type</h2>
                        <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>✨</span> AI POWERED
                        </div>
                      </div>
                      <div onClick={() => setActiveDrawer(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '24px', marginTop: 0 }}>Smart AI analysis for all your medical documents</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {docTypes.map(doc => (
                        <div key={doc.id} onClick={() => { setSelectedType(doc.id); setActiveDrawer('select_source') }} style={{
                          display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer'
                        }}>
                          <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `1px solid ${doc.iconColor}40`, color: doc.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {doc.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', fontSize: '16px', color: '#F8FAFC', marginBottom: '4px' }}>{doc.id}</div>
                            <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '6px' }}>{doc.desc}</div>
                            <div style={{ fontSize: '12px', color: '#64748B', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>{doc.meta}</div>
                          </div>
                          <div style={{ color: '#64748B' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* SELECT SOURCE DRAWER */}
                {activeDrawer === 'select_source' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#F8FAFC' }}>Select Source for {selectedType}</h2>
                      <div onClick={() => setActiveDrawer(null)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F8FAFC" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { id: 'Camera', desc: `Take photo of your ${selectedType?.toLowerCase() || 'document'}`, color: '#3B82F6', icon: (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                        )},
                        { id: 'Gallery', desc: `Choose ${selectedType?.toLowerCase() || 'document'} from photos`, color: '#10B981', icon: (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        )},
                        { id: 'Files', desc: `Browse PDF ${selectedType?.toLowerCase() || 'document'}`, color: '#F59E0B', icon: (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        )}
                      ].map(source => (
                        <div key={source.id} onClick={() => { setSelectedSource(source.id); setActiveDrawer(null) }} style={{
                          background: '#1E293B', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer'
                        }}>
                          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: source.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {source.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '18px', color: '#F8FAFC', marginBottom: '4px' }}>{source.id}</div>
                            <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '4px' }}>{source.desc}</div>
                            <div style={{ fontSize: '13px', color: '#10B981' }}>{selectedDocObj?.desc || 'Blood tests, health checkups'}</div>
                          </div>
                        </div>
                      ))}
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
      `}</style>
    </div>
  )
}
