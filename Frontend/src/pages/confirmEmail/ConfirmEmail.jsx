import React, { useContext, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './ConfirmEmail.css'
const ConfirmEmail = () => {
  const [confirmationCode,setConfirmationCode]=useState('')
  const {user,refreshToken}=useContext(AuthContext)
  const handleSubmit= async(e)=>{
    e.preventDefault()
    try{
      await axios.post('http://localhost:8800/auth/confirm',{
        email:user.email,
        confirmationCode:confirmationCode
      })
      refreshToken(user);
    }catch(err){
      console.log(err)
    }
  }
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