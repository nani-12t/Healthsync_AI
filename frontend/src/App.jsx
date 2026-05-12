import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Business from './pages/business/Business'
import PartnersOverview from './pages/business/PartnersOverview'
import Labs from './pages/business/Labs'
import Insurance from './pages/business/Insurance'
import Hospitals from './pages/business/Hospitals'
import Doctors from './pages/business/Doctors'

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/business' element={<Business />} />
          <Route path='/business/overview' element={<PartnersOverview />} />
          <Route path='/business/labs' element={<Labs />} />
          <Route path='/business/insurance' element={<Insurance />} />
          <Route path='/business/hospitals' element={<Hospitals />} />
          <Route path='/business/doctors' element={<Doctors />} />
        </Routes>
      </main>
    </>
  )
}