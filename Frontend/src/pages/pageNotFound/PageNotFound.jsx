import React, { useEffect } from 'react'
import { Navbar } from "../../components/navbar/Navbar";
import img from './../../../../Images/404.png'
import './pageNotFound.css'
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
  useEffect(()=>{
    document.title="صفحة غير موجودة"
  })
  const navigate=useNavigate();
  return (
    <div>
      <Navbar />
    <div className="center">
      
        <img className='image' src={img} alt="" />
      
      <h1>الصفحة غير موجودة</h1>
      <p>يبدو أن الصفحة التي كنت تبحث عنها لم تعد هنا.</p>
      <button onClick={()=>navigate('/')}>الصفحة الرئيسية</button>
    </div>
    </div>
  )
}

export default PageNotFound