import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
//import { Redirect } from 'react-router-dom';

import Home from './pages/home/Home.jsx'
import Properties from './pages/properties/Properties.jsx'
import Property from './pages/property/Property.jsx'
import './App.css'
import Login from './pages/login/Login.jsx'
import Logout from './pages/logout/Logout.jsx'
import Account from './pages/account/Account.jsx'
import Messages from './pages/messages/Messages.jsx'
import { AuthContext, AuthContextProvider } from './context/AuthContext.jsx'
import { useContext } from 'react'
import Registre from './pages/register/Registre.jsx'
import Contract from './pages/contract/Contract.jsx'
import Package from './pages/package/Package.jsx'

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />}  /> 
        <Route path='/properties' element={<Properties />} />
        <Route path='/property' element={<Property />} />
        <Route path='/property/:id' element={<Property />} />
        <Route path='logout' element={<Logout />} />
        <Route path='/account/:id' element={<Account />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/register' element={<Registre />} />
        <Route path='/contract' element={<Contract />} />
        <Route path='/package' element={<Package />}/>
      </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
