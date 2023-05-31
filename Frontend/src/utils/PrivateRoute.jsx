import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({ element: Element, path }) => {
    const { user } = useContext(AuthContext);
  if(user){
    if (!user.isConfirmed && path !== '/confirm') {
      return <Navigate to="/confirm" replace />;
    }
  
    if (path === '/logout') {
      return <Navigate to="/" replace />;
    }
  
    return <Route path={path} element={<Element />} />;
  }};
export default PrivateRoute;
