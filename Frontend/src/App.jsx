import React from 'react'
import { Routes, Route } from 'react-router-dom'

import GoogleLogin from './Pages/GoogleLogin'
import DashboardPage from './Components/DashboardPage'
import GoogleCallback from './Pages/GoogleCallback'

const App = () => {


  return (

    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth/google/callback" element={<GoogleCallback/>} />
    </Routes>

  )
}

export default App