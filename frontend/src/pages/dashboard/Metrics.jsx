import { useState, useEffect } from 'react'

const SYSTEM_CATEGORIES = ['Heart', 'Liver', 'Kidney', 'Thyroid', 'Endocrine', 'Vitamins', 'Iron', 'Weight']

const SUB_METRICS = {
  'Heart': ['Troponin', 'CK-MB', 'BNP', 'HDL Cholesterol', 'LDL Cholesterol', 'Total Cholesterol', 'Triglycerides', 'VLDL Cholesterol', 'Non-HDL Cholesterol', 'Blood Pressure'],
  'Liver': ['ALT', 'AST', 'ALP', 'Bilirubin'],
  'Kidney': ['Creatinine', 'Blood Urea Nitrogen', 'Uric Acid', 'eGFR'],
  'Thyroid': ['TSH', 'T3', 'T4', 'Free T3', 'Free T4'],
  'Endocrine': ['Insulin', 'Cortisol', 'Testosterone', 'Estrogen'],
  'Vitamins': ['Vitamin D', 'Vitamin B12', 'Vitamin B6', 'Folate'],
  'Iron': ['Iron', 'Ferritin', 'TIBC'],
  'Weight': ['Weight', 'BMI']
}

const UNITS = {
  'HDL Cholesterol': 'mg/dL', 'LDL Cholesterol': 'mg/dL', 'Total Cholesterol': 'mg/dL', 'Triglycerides': 'mg/dL',
  'VLDL Cholesterol': 'mg/dL', 'Non-HDL Cholesterol': 'mg/dL', 'Troponin': 'ng/mL', 'CK-MB': 'ng/mL', 'BNP': 'pg/mL',
  'ALT': 'U/L', 'AST': 'U/L', 'ALP': 'U/L', 'Bilirubin': 'mg/dL',
  'Creatinine': 'mg/dL', 'Blood Urea Nitrogen': 'mg/dL', 'Uric Acid': 'mg/dL', 'eGFR': 'mL/min/1.73m²',
  'TSH': 'µIU/mL', 'T3': 'ng/dL', 'T4': 'µg/dL', 'Free T3': 'pg/mL', 'Free T4': 'ng/dL',
  'Weight': 'kg', 'BMI': 'kg/m²', 'Blood Pressure': 'mmHg',
  'default': 'units'
}

export default function Metrics() {
  const [activeCategory, setActiveCategory] = useState('Heart')
  const [activeSubMetric, setActiveSubMetric] = useState(SUB_METRICS['Heart'][0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [trendRange, setTrendRange] = useState('Month')
  const [measurementContext, setMeasurementContext] = useState('General')

  // Backend state variables
  const [metrics, setMetrics] = useState([])
  const [loading, setLoading] = useState(true)

  // Form states
  const [newValue, setNewValue] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [savingMetric, setSavingMetric] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchMetrics = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/metrics', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setMetrics(data)
      }
    } catch (err) {
      console.error('Error fetching metrics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat)
    setActiveSubMetric(SUB_METRICS[cat][0])
  }

  const handleSaveMetric = async () => {
    if (!newValue || isNaN(newValue)) {
      setErrorMessage('Please enter a valid numeric value')
      return
    }
    setErrorMessage('')
    setSavingMetric(true)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://localhost:5000/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: activeCategory,
          sub_metric: activeSubMetric,
          value: Number(newValue),
          context: measurementContext,
          notes: newNotes.trim()
        })
      })
      const data = await res.json()
      if (res.ok) {
        await fetchMetrics()
        setNewValue('')
        setNewNotes('')
        setShowAddModal(false)
      } else {
        setErrorMessage(data.error || 'Failed to save metric')
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('Failed to connect to server')
    } finally {
      setSavingMetric(false)
    }
  }

  const unit = UNITS[activeSubMetric] || UNITS['default']

  // Filtered metrics for active sub-metric
  const filteredMetrics = metrics.filter(m => 
    m.category === activeCategory && m.sub_metric === activeSubMetric
  )

  const renderTrendChart = () => {
    if (filteredMetrics.length < 2) {
      return (
        <div style={{
          height: '240px', background: 'rgba(0,0,0,0.1)', borderRadius: '16px', border: '1px dashed rgba(16, 185, 129, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'
        }}>
          <p style={{ color: '#A7F3D0', fontSize: '15px', maxWidth: '340px', fontWeight: '500' }}>
            Not enough data to show trend. Add at least 2 measurements to see your trends over time
          </p>
        </div>
      )
    }

    // Sort ascending for chronological drawing
    const sorted = [...filteredMetrics].reverse()
    const values = sorted.map(m => m.value)
    const minVal = Math.min(...values) * 0.9
    const maxVal = Math.max(...values) * 1.1
    const range = maxVal - minVal || 1

    const width = 500
    const height = 180
    const padding = 40

    const points = sorted.map((m, i) => {
      const x = padding + (i * (width - 2 * padding)) / (sorted.length - 1)
      const y = height - padding - ((m.value - minVal) * (height - 2 * padding)) / range
      return { x, y, val: m.value, date: new Date(m.recorded_at).toLocaleDateString() }
    })

    const pathD = points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`
    }, '')

    return (
      <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(16, 185, 129, 0.1)', overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="200" style={{ overflow: 'visible', minWidth: '400px' }}>
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Trend line */}
          <path d={pathD} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Data points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="6" fill="#FFFFFF" stroke="#10B981" strokeWidth="3" />
              <text x={p.x} y={p.y - 12} fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">
                {p.val}
              </text>
              <text x={p.x} y={height - padding + 18} fill="#64748B" fontSize="10" fontWeight="700" textAnchor="middle">
                {p.date}
              </text>
            </g>
          ))}
        </svg>
      </div>
    )
  }

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
      {/* Category Selector Bar */}
      <div style={{
        display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '20px', scrollbarWidth: 'none'
      }}>
        {SYSTEM_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategoryClick(cat)} style={{
            padding: '10px 24px',
            borderRadius: '24px',
            background: activeCategory === cat ? '#10B981' : 'rgba(16, 185, 129, 0.05)',
            color: activeCategory === cat ? '#FFFFFF' : '#A7F3D0',
            border: activeCategory === cat ? 'none' : '1px solid rgba(16, 185, 129, 0.2)',
            fontSize: '15px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all 0.2s', backdropFilter: 'blur(10px)', boxShadow: activeCategory === cat ? '0 4px 12px rgba(16,185,129,0.3)' : 'none'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Category Specific Sub-Meters */}
      <div style={{
        display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '28px', scrollbarWidth: 'none'
      }}>
        {SUB_METRICS[activeCategory].map(sub => (
          <button key={sub} onClick={() => setActiveSubMetric(sub)} style={{
            padding: '8px 18px',
            borderRadius: '12px',
            background: activeSubMetric === sub ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: activeSubMetric === sub ? '#10B981' : '#A7F3D0',
            border: 'none',
            fontSize: '14px', fontWeight: activeSubMetric === sub ? '800' : '600',
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            {sub}
          </button>
        ))}
      </div>

      {/* Active Data Visualization Frame */}
      {loading ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '24px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '4px solid rgba(16,185,129,0.2)',
            borderTopColor: '#10B981',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      ) : (
        <div style={{
          background: 'rgba(16, 185, 129, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '32px', marginBottom: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>
              {activeSubMetric} Vitals
            </h2>
          </div>

          {filteredMetrics.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '32px' }}>
              <p style={{ color: '#D1FAE5', fontSize: '16px', marginBottom: '28px', fontWeight: '500' }}>
                No measurements available for {activeSubMetric}. Add your first measurement below.
              </p>
              <button onClick={() => { setErrorMessage(''); setShowAddModal(true); }} style={{
                background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
                padding: '14px 28px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
              }}>
                + Add Measurement
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '32px' }}>
              <div style={{ fontSize: '13px', color: '#A7F3D0', fontWeight: '800', marginBottom: '8px', letterSpacing: '1px' }}>LATEST VALUE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: '#FFFFFF', textShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                  {filteredMetrics[0].value}
                </span>
                <span style={{ fontSize: '20px', color: '#A7F3D0', fontWeight: '600' }}>{unit}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#A7F3D0', fontWeight: '500', marginBottom: '24px' }}>
                Recorded on {new Date(filteredMetrics[0].recorded_at).toLocaleString()} • Context: {filteredMetrics[0].context}
              </div>
              <button onClick={() => { setErrorMessage(''); setShowAddModal(true); }} style={{
                background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
                padding: '14px 28px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
              }}>
                + Add New Value
              </button>
            </div>
          )}

          {/* Trend Frame Card */}
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Recent Trend</h3>
            </div>
            {renderTrendChart()}
          </div>

          {/* History Tracker Module */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>History</h3>
            </div>
            {filteredMetrics.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: '#A7F3D0', fontSize: '15px', fontWeight: '500' }}>
                No history available
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredMetrics.map(m => (
                  <div key={m._id} style={{
                    background: 'rgba(0,0,0,0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>{m.value} {unit}</span>
                        <span style={{ fontSize: '11px', background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                          {m.context}
                        </span>
                      </div>
                      {m.notes && (
                        <div style={{ fontSize: '13px', color: '#A7F3D0', marginTop: '4px', fontStyle: 'italic' }}>
                          "{m.notes}"
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
                      {new Date(m.recorded_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* INTERACTIVE OVERLAY MODAL */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(9, 18, 44, 0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', padding: '20px'
        }}>
          <div style={{
            background: '#064E3B', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '24px',
            width: '100%', maxWidth: '440px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Add {activeSubMetric}</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', color: '#A7F3D0', cursor: 'pointer', fontSize: '28px', lineHeight: 1 }}>&times;</button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', padding: '0 16px', marginBottom: '28px' }}>
                <input type="number" placeholder="Enter value" value={newValue} onChange={e => setNewValue(e.target.value)} style={{
                  background: 'transparent', border: 'none', color: '#FFFFFF', padding: '16px 0', fontSize: '18px', width: '100%', outline: 'none', fontWeight: '600'
                }} />
                <span style={{ color: '#A7F3D0', fontSize: '15px', fontWeight: '600' }}>{unit}</span>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['General', 'Fasting', 'After Meal', 'Morning', 'Evening'].map(ctx => (
                    <button key={ctx} onClick={() => setMeasurementContext(ctx)} style={{
                      padding: '8px 16px', borderRadius: '20px',
                      background: measurementContext === ctx ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.2)',
                      color: measurementContext === ctx ? '#10B981' : '#A7F3D0',
                      border: measurementContext === ctx ? '1px solid #10B981' : '1px solid rgba(16,185,129,0.2)',
                      fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', color: '#FFFFFF', fontSize: '15px', fontWeight: '700', marginBottom: '10px' }}>Notes (optional)</label>
                <textarea placeholder="Add any additional notes" value={newNotes} onChange={e => setNewNotes(e.target.value)} rows="3" style={{
                  width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px',
                  padding: '16px', color: '#FFFFFF', fontSize: '15px', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                }}></textarea>
              </div>

              {errorMessage && (
                <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: '600', textAlign: 'center', marginBottom: '16px' }}>
                  {errorMessage}
                </div>
              )}

              <button onClick={handleSaveMetric} disabled={savingMetric} style={{
                width: '100%', background: savingMetric ? 'rgba(255,255,255,0.15)' : 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
                padding: '16px', fontSize: '16px', fontWeight: '800', cursor: savingMetric ? 'not-allowed' : 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
              }}>
                {savingMetric ? 'Saving...' : 'Save Measurement'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
