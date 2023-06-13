import React, { useContext, useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    document.title = 'داري - تسجيل الدخول';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('http://localhost:8800/auth/login', credentials);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: res.data.token,
          user: res.data.user,
        },
      });
      const EXPIRE_TIME = 1000 * 60 * 60;
      localStorage.setItem('expireTime', JSON.stringify({ time: new Date() }));
      setTimeout(function () {
        localStorage.removeItem('expireTime');
        localStorage.removeItem('user');
      }, EXPIRE_TIME);
  
      if (res.data.token && res.data.user) {
        setErrorPopupVisible(false);
        navigate('/');
      }else {
      setErrorPopupVisible(true);

      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      setErrorPopupVisible(true);

    }
  };
  

  const closePopup = () => {
    setErrorPopupVisible(false);
  };

  return (
    <div className='container'>
      <div className='container-form'>
        <h1>تسجيل الدخول</h1>
        <input type='text' placeholder='البريد الإلكتروني' id='email' onChange={handleChange} className='container-form-email' />
        <input type='password' placeholder='كلمة السر' id='password' onChange={handleChange} className='container-form-password' />
        <hr />
        <span>
          <a className='link' onClick={() => navigate('/register')}>
            إنشاء حساب
          </a>
        </span>
        <button onClick={handleLogin} className='container-form-button'>
          سجل الدخول
        </button>
        {errorPopupVisible && (
          <div className='popup'>
            <div className='popup-content'>
              <span className='close' onClick={closePopup}>
                &times;
              </span>
              <p className='error-message'>{error && error.message ? error.message : 'البريد الإلكتروني أو كلمة السر غير صحيح'}</p>
            </div>
            <div className='popup-overlay' onClick={closePopup} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
