import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'

export default function DashboardLayout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <DashboardNavbar />
      <main style={{ padding: '40px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
