import React, { useState } from 'react';
import './Registre.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registre = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [handlePassword, setHandlePassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validEmail && validPassword) {
      try {
        await axios.post('http://localhost:8800/auth/register', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone
        });
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValidPassword(e.target.value.length >= 6);
  };

  const closePopup = () => {
    setError('');
  };

  return (
    <div className='container'>
      <div className='container-form'>
        <h1>تسجيل الدخول</h1>
        <input
          type='text'
          placeholder='الإسم'
          id='firstname'
          onChange={(e) => setFirstName(e.target.value)}
          className='container-form-email'
        />
        <input
          type='text'
          placeholder='اللقب'
          id='lastName'
          onChange={(e) => setLastName(e.target.value)}
          className='container-form-email'
        />
        <input
          type='text'
          placeholder='البريد الإلكتروني'
          id='email'
          onChange={handleEmailChange}
          className='container-form-email'
        />
        {!validEmail && <p className='error-message'>بريد إلكتروني خاطئ</p>}
        <input
          type='password'
          placeholder='كلمة السر'
          id='password'
          onChange={handlePasswordChange}
          className='container-form-password'
        />
        {!validPassword && <p className='error-message'>يجب أن تتكون كلمة المرور من 6 أحرف على الأقل</p>}
        <input
          type='text'
          placeholder='الهاتف'
          id='phone'
          onChange={(e) => setPhone(e.target.value)}
          className='container-form-email'
        />
        <span className='cookies'>
          بالنقر على زر "التسجيل"، فإنك توافق على{' '}
          <a onClick={() => navigate('/cookies')}>سياسة ملفات تعريف الارتباط</a>
          <br />
          (cookies) لدينا. قد تتلقى رسائل بريد إلكتروني منا ويمكنك إلغاء الاشتراك
          <br /> في أي وقت.
        </span>
        <hr />
        <span className='cookies'>
          <a onClick={() => navigate('/login')}>لدي حساب</a>
        </span>
        <button className='container-form-button' onClick={handleSubmit} disabled={!validEmail || !validPassword}>
          سجل الدخول
        </button>
      </div>
            {error && (
        <div className="popup">
            <div className="popup-content">
            <span className="close" onClick={closePopup}>
                &times;
            </span>
            <p className="error-message">{error}</p>
            </div>
            <div className="popup-overlay" onClick={closePopup} />
        </div>
)}

    </div>
  );
};

export default Registre;
