import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { useContext } from 'react';
import Home from './pages/home/Home.jsx';
import Properties from './pages/properties/Properties.jsx';
import Property from './pages/property/Property.jsx';
import Login from './pages/login/Login.jsx';
import Logout from './pages/logout/Logout.jsx';
import Account from './pages/account/Account.jsx';
import Messages from './pages/messages/Messages.jsx';
import Registre from './pages/register/Registre.jsx';
import Contract from './pages/contract/Contract.jsx';
import Package from './pages/package/Package.jsx';
import ConfirmEmail from './pages/confirmEmail/ConfirmEmail.jsx';
import { AuthContext } from './context/AuthContext.jsx';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/confirm" element={<ConfirmEmail />} />
          
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property" element={<Property />} />
              <Route path="/property/:id" element={<Property />} />
              <Route path="/account/:id" element={<Account />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/package" element={<Package />} />
          
          
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Registre />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
