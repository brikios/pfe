import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Properties from './pages/properties/Properties.jsx'
import Property from './pages/property/Property.jsx'
import './App.css'
import Login from './pages/login/Login.jsx'
import Logout from './pages/logout/Logout.jsx'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/property' element={<Property />} />
        <Route path='/property/:id' element={<Property />} />
        <Route path='logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
