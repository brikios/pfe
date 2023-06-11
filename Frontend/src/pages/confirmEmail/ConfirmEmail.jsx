import React, { useContext, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './ConfirmEmail.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const ConfirmEmail = () => {
  const [confirmationCode,setConfirmationCode]=useState('')
  const {user,refreshToken}=useContext(AuthContext)
  const navigate=useNavigate()
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:8800/auth/confirm',{
        email:user.email,
        confirmationCode:confirmationCode
      })
      await refreshToken(user);
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if(user && !user.Banned){
      navigate('/Banned')
    }
  },[])
  return (
    <div><Navbar />
    <div className='center-container'>
        <div class="message">
        تم إنشاء حسابك بنجاح! تم إرسال بريد إلكتروني إلى حسابك البريدي يحتوي على رمز التأكيد لتفعيل حسابك. يُرجى التحقق من بريدك الإلكتروني واتباع التعليمات لتأكيد حسابك. شكرًا لك على الانضمام إلينا!
        </div>
    <input type='text' onChange={(e)=>setConfirmationCode(e.target.value)} />
    <button onClick={handleSubmit}>تحقق</button>
    </div>
    </div>
  )
}

export default ConfirmEmail