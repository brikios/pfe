import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/login/Login';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthContextProvider >
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      </AuthContextProvider>
    </Router>
  )
}

export default App
