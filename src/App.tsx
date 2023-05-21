import LayoutPage from '@/components/LayoutPage'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/home'
import Order from '@/pages/order'
import Set from '@/pages/set'

function App() {
  return (
    <>
      <LayoutPage > 
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='order' element={<Order />} />
          <Route path='set' element={<Set />} />
        </Routes>
      </LayoutPage>
    </>
  )
}

export default App
