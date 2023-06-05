import React from 'react'
import './banned.css'
import img from './../../../../Images/ban.png'
import { useNavigate } from 'react-router-dom'
const Banned = () => {
    const navigate =useNavigate();
  return (
    <div className='center-container'>
        <img src={img} className='image' />
        <div class="message">
        تم حظر حسابك في الموقع بناءً على انتهاكات قواعد الاستخدام. نأسف لإبلاغك بذلك. يرجى مراجعة الشروط والأحكام الخاصة بالموقع والتأكد من الامتثال لها في المستقبل. إذا كنت تعتقد أن هذا الحظر كان خطأ، يرجى الاتصال بفريق الدعم لدينا لمزيد من المساعدة. نشكرك على تفهمك ونأمل أن تعود قريبًا.
        </div>
        <button onClick={(e)=>navigate('/logout')}>خروج</button>
    </div>
  )
}

export default Banned