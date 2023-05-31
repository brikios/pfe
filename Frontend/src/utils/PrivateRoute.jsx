import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(AuthContext);
  
  

  if (user && !user.isConfirmed && rest.path !== '/confirm') {
      // User is not confirmed, redirect to the confirmation page
      return <Navigate to="/confirm" replace />;
    }

    return <Route {...rest} element={Element} />;
  };

export default PrivateRoute;
