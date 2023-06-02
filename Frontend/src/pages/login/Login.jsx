import React, { useContext, useEffect } from 'react'
import './login.css'
import { useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [credentials,setCredentials]= useState({
        email:undefined,
        password:undefined,
    })
    const{loading,error,dispatch}=useContext(AuthContext)
    const [errorMessage,setErrorMessage]=useState("")
    const navigate = useNavigate()
    const handleChnage=(e)=>{
         setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    
    useEffect(()=>{
        document.title='داري - تسجيل الدخول'
    },[])
    const handleLogin=async e=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:8800/auth/login",credentials)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                  token: res.data.token,
                  user: res.data.user,
                },
              });
            navigate('/')
            const EXPIRE_TIME = 1000*60*60;
            localStorage.setItem('expireTime', JSON.stringify({
                time: new Date(),
                    }))
                    setTimeout(function() {
                        localStorage.removeItem('expireTime');
                        localStorage.removeItem('user')
                    }, EXPIRE_TIME);
        }catch(err){
            dispatch({type:"LOGIN_FAILURE",payloud:err.response.data})
            
        }
    }
    //console.log(user)
    return (
   <div className='container'>
        <div className='container-form'>
            <h1>تسجيل الدخول</h1>
            <input type='text' placeholder='البريد الإلكتروني' id='email' onChange={handleChnage} className='container-form-email' />
            <input type='password' placeholder='كلمة السر' id='password' onChange={handleChnage} className='container-form-password' />
            <hr/>
            <span><a className='link' onClick={()=>navigate('/register')}>إنشاء حساب</a></span>
            <button onClick={handleLogin} className='container-form-button'>سجل الدخول</button>
            {error &&<span>{error.Message}</span>}
        </div>
   </div>
  )
}

export default Login