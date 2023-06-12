import React, { useContext, useEffect } from 'react';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const{admin}=useContext(AuthContext)
  useEffect(()=>{
    if (admin){
      navigate('/')
    }
  },[])
  useEffect(() => {
    document.title = 'داري - تسجيل الدخول';
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(
        'http://localhost:8800/auth/loginAdmin',
        credentials
      );
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: res.data.token,
          admin: res.data.admin,
        },
      });
      navigate('/');
      const EXPIRE_TIME = 1000 * 60 * 60;
      localStorage.setItem(
        'expireTime',
        JSON.stringify({
          time: new Date(),
        })
      );
      setTimeout(function () {
        localStorage.removeItem('expireTime');
        localStorage.removeItem('admin');
      }, EXPIRE_TIME);
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  return (
    <div className='container'>
      <div className='container-form'>
        <h1>تسجيل الدخول</h1>
        <input
          type='text'
          placeholder='البريد الإلكتروني'
          id='userName'
          onChange={handleChange}
          className='container-form-email'
        />
        <input
          type='password'
          placeholder='كلمة السر'
          id='password'
          onChange={handleChange}
          className='container-form-password'
        />
        <hr />

        <button onClick={handleLogin} className='container-form-button'>
          سجل الدخول
        </button>
        {loading && <span>Loading...</span>}
        {error && <span>{error.Message}</span>}
      </div>
    </div>
  );
};

export default Login;
