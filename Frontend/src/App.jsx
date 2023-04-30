import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Properties from './pages/properties/Properties.jsx'
import Property from './pages/property/Property.jsx'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/properties' element={<Properties />} />
        <Route path='/property' element={<Property />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
