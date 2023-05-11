import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.delete('http://localhost:8800/auth/logout');
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('expireTime');
        localStorage.removeItem('user');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    };

    logout();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
