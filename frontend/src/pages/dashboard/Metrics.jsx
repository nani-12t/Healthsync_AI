import { useState } from 'react'

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
  'HDL Cholesterol': 'mg/dL', 'Hemoglobin': 'g/dL', 'TIBC': 'µg/dL', 'Weight': 'kg', 'BMI': 'kg/m²',
  // Default fallback
  'default': 'units'
}

export default function Metrics() {
  const [activeCategory, setActiveCategory] = useState('Heart')
  const [activeSubMetric, setActiveSubMetric] = useState(SUB_METRICS['Heart'][0])
  const [showAddModal, setShowAddModal] = useState(false)
  const [trendRange, setTrendRange] = useState('Month')
  const [measurementContext, setMeasurementContext] = useState('General')

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat)
    setActiveSubMetric(SUB_METRICS[cat][0])
  }

  const unit = UNITS[activeSubMetric] || UNITS['default']

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
      <div style={{
        background: 'rgba(16, 185, 129, 0.03)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '24px', padding: '32px', marginBottom: '24px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>Current Value</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.28l3.08 2.71"/></svg>
            </button>
            <button style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A7F3D0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '48px 0', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', marginBottom: '32px' }}>
          <p style={{ color: '#D1FAE5', fontSize: '16px', marginBottom: '28px', fontWeight: '500' }}>No measurements available. Add your first measurement below.</p>
          <button onClick={() => setShowAddModal(true)} style={{
            background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
            padding: '14px 28px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
          }}>
            + Add Measurement
          </button>
        </div>

        {/* Trend Frame Card */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>Recent Trend</h3>
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              {['Week', 'Month', 'Year'].map(range => (
                <button key={range} onClick={() => setTrendRange(range)} style={{
                  padding: '6px 16px', background: trendRange === range ? '#10B981' : 'transparent',
                  color: trendRange === range ? 'white' : '#A7F3D0', border: 'none', borderRadius: '8px',
                  fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div style={{
            height: '240px', background: 'rgba(0,0,0,0.1)', borderRadius: '16px', border: '1px dashed rgba(16, 185, 129, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'
          }}>
            <p style={{ color: '#A7F3D0', fontSize: '15px', maxWidth: '340px', fontWeight: '500' }}>
              Not enough data to show trend. Add measurements to see your trends over time
            </p>
          </div>
        </div>

        {/* History Tracker Module */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#FFFFFF' }}>History</h3>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '10px', padding: '8px 16px',
              color: '#A7F3D0', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backdropFilter: 'blur(8px)'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              Filter
            </button>
          </div>
          <div style={{ textAlign: 'center', padding: '32px', color: '#A7F3D0', fontSize: '15px', fontWeight: '500' }}>
            No history available
          </div>
        </div>
      </div>

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
                <input type="number" placeholder="Enter value" style={{
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
                <textarea placeholder="Add any additional notes" rows="3" style={{
                  width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px',
                  padding: '16px', color: '#FFFFFF', fontSize: '15px', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                }}></textarea>
              </div>

              <button onClick={() => setShowAddModal(false)} style={{
                width: '100%', background: 'linear-gradient(90deg, #10B981, #059669)', color: 'white', border: 'none', borderRadius: '14px',
                padding: '16px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.3)'
              }}>
                Save Measurement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
