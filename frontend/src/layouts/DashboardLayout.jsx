import { Outlet } from 'react-router-dom'
import DashboardNavbar from '../components/DashboardNavbar'

export default function DashboardLayout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <DashboardNavbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </div>
  )
}
