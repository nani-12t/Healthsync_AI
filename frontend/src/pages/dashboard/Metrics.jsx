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
      background: 'linear-gradient(135deg, #09122C 0%, #0E1738 100%)',
      minHeight: '100vh',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', sans-serif",
      padding: '24px',
      position: 'relative'
    }}>
      {/* Category Selector Bar */}
      <div style={{
        display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px',
        borderBottom: '1px solid #1C2C61', marginBottom: '16px', scrollbarWidth: 'none'
      }}>
        {SYSTEM_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategoryClick(cat)} style={{
            padding: '8px 20px',
            borderRadius: '24px',
            background: activeCategory === cat ? '#3B82F6' : '#131F46',
            color: activeCategory === cat ? '#FFFFFF' : '#94A3B8',
            border: activeCategory === cat ? 'none' : '1px solid #1C2C61',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Category Specific Sub-Meters */}
      <div style={{
        display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '24px', scrollbarWidth: 'none'
      }}>
        {SUB_METRICS[activeCategory].map(sub => (
          <button key={sub} onClick={() => setActiveSubMetric(sub)} style={{
            padding: '6px 16px',
            borderRadius: '8px',
            background: activeSubMetric === sub ? 'rgba(59,130,246,0.15)' : 'transparent',
            color: activeSubMetric === sub ? '#3B82F6' : '#94A3B8',
            border: 'none',
            fontSize: '13px', fontWeight: activeSubMetric === sub ? '700' : '500',
            cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            {sub}
          </button>
        ))}
      </div>

      {/* Active Data Visualization Frame */}
      <div style={{
        background: '#131F46', border: '1px solid #1C2C61', borderRadius: '20px', padding: '24px', marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Current Value</h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: '#121E45', border: '1px solid #1C2C61', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.28l3.08 2.71"/></svg>
            </button>
            <button style={{ background: '#121E45', border: '1px solid #1C2C61', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '40px 0', borderBottom: '1px solid #1C2C61', marginBottom: '24px' }}>
          <p style={{ color: '#94A3B8', fontSize: '15px', marginBottom: '24px' }}>No measurements available. Add your first measurement below.</p>
          <button onClick={() => setShowAddModal(true)} style={{
            background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px',
            padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}>
            + Add Measurement
          </button>
        </div>

        {/* Trend Frame Card */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Recent Trend</h3>
            <div style={{ display: 'flex', background: '#121E45', borderRadius: '8px', padding: '4px', border: '1px solid #1C2C61' }}>
              {['Week', 'Month', 'Year'].map(range => (
                <button key={range} onClick={() => setTrendRange(range)} style={{
                  padding: '4px 12px', background: trendRange === range ? '#3B82F6' : 'transparent',
                  color: trendRange === range ? 'white' : '#94A3B8', border: 'none', borderRadius: '6px',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer'
                }}>
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div style={{
            height: '200px', background: '#09122C', borderRadius: '12px', border: '1px dashed #1C2C61',
            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px'
          }}>
            <p style={{ color: '#94A3B8', fontSize: '14px', maxWidth: '300px' }}>
              Not enough data to show trend. Add measurements to see your trends over time
            </p>
          </div>
        </div>

        {/* History Tracker Module */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>History</h3>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent',
              border: '1px solid #1C2C61', borderRadius: '8px', padding: '6px 12px',
              color: '#94A3B8', fontSize: '13px', cursor: 'pointer'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              Filter
            </button>
          </div>
          <div style={{ textAlign: 'center', padding: '24px', color: '#94A3B8', fontSize: '14px' }}>
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
          backdropFilter: 'blur(4px)', padding: '20px'
        }}>
          <div style={{
            background: '#131F46', border: '1px solid #1C2C61', borderRadius: '24px',
            width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1C2C61', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Add {activeSubMetric}</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}>&times;</button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px', padding: '0 16px', marginBottom: '24px' }}>
                <input type="number" placeholder="Enter value" style={{
                  background: 'transparent', border: 'none', color: '#FFFFFF', padding: '16px 0', fontSize: '18px', width: '100%', outline: 'none', fontWeight: '600'
                }} />
                <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '500' }}>{unit}</span>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['General', 'Fasting', 'After Meal', 'Morning', 'Evening'].map(ctx => (
                    <button key={ctx} onClick={() => setMeasurementContext(ctx)} style={{
                      padding: '8px 16px', borderRadius: '20px',
                      background: measurementContext === ctx ? 'rgba(59,130,246,0.15)' : '#09122C',
                      color: measurementContext === ctx ? '#3B82F6' : '#94A3B8',
                      border: measurementContext === ctx ? '1px solid #3B82F6' : '1px solid #1C2C61',
                      fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Notes (optional)</label>
                <textarea placeholder="Add any additional notes" rows="3" style={{
                  width: '100%', background: '#09122C', border: '1px solid #1C2C61', borderRadius: '12px',
                  padding: '16px', color: '#FFFFFF', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                }}></textarea>
              </div>

              <button onClick={() => setShowAddModal(false)} style={{
                width: '100%', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px',
                padding: '16px', fontSize: '15px', fontWeight: '700', cursor: 'pointer'
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
