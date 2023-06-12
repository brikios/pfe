import React from 'react'
import './userBannedProperty.css'
import img from './../../../../Images/ban.png'
import { useNavigate } from 'react-router-dom'
import { Navbar } from "../../components/navbar/Navbar";
const UserBannedProperty = () => {
  const navigate=useNavigate()
  return (
    <div>
    <Navbar />
    <div className='center-container'>
        <img src={img} className='image' />
        <div class="message">
         صاحب هاذا الحساب تم حظره في الموقع بناءً على انتهاكات قواعد الاستخدام. نأسف لإبلاغك بذلك.
        </div>
        <button onClick={(e)=>navigate('/')}>عودة</button>
    </div>
    </div>
  )
}

export default UserBannedProperty