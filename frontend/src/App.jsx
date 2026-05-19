import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import Onboarding from './pages/Onboarding'
import Business from './pages/business/Business'
import PartnersOverview from './pages/business/PartnersOverview'
import Labs from './pages/business/Labs'
import Insurance from './pages/business/Insurance'
import Hospitals from './pages/business/Hospitals'
import Doctors from './pages/business/Doctors'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import Metrics from './pages/dashboard/Metrics'
import Reports from './pages/dashboard/Reports'
import Profile from './pages/dashboard/Profile'

function Layout() {
  const location = useLocation()
  const isAuth = location.pathname === '/get-started' || location.pathname === '/onboarding' || location.pathname.startsWith('/dashboard')

  return (
    <>
      {!isAuth && <Navbar />}
      <main style={{ paddingTop: isAuth ? '0' : '80px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/get-started' element={<GetStarted />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/business' element={<Business />} />
          <Route path='/business/overview' element={<PartnersOverview />} />
          <Route path='/business/labs' element={<Labs />} />
          <Route path='/business/insurance' element={<Insurance />} />
          <Route path='/business/hospitals' element={<Hospitals />} />
          <Route path='/business/doctors' element={<Doctors />} />
          
          <Route path='/dashboard' element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path='metrics' element={<Metrics />} />
            <Route path='reports' element={<Reports />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default function App() {
  return <Layout />
}