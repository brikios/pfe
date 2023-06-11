import React, { useContext, useEffect, useState } from 'react'
import './package.css'
import { Navbar } from '../../components/navbar/Navbar'
import { AuthContext, AuthContextProvider } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Package = () => {
    const [amount,setAmount]=useState(null)

    const {user}=useContext(AuthContext)
    const navigate=useNavigate()
    useEffect(()=>{
      if(user && !user.isConfirmed){
        navigate('/confirm')
      }
    },[])
    useEffect(()=>{
      if(user && user.Banned){
        navigate('/Banned')
      }
    },[])
    useEffect(()=>{
      if(user==null){
        navigate('/login')
      }
    },[])
    useEffect(() => {
        document.title = 'عروض الإشهار';
        console.log(amount);
    
        if (amount !== null) {
          axios
            .post(`http://localhost:8800/payment/addpayment`, {
              amount: amount,
            })
            .then((res) => {
              const {result}=res.data
              window.location.href = result.link
            })
            .catch((err) => console.log(err));
        }
      }, [amount]);
    const handleSumbit=(e,amo)=>{
        

        e.preventDefault()
        setAmount(amo);  
    }
        if(user==null){
        navigate('/login')
    }
  return (
  <div>
    <Navbar />
  <div className="background">
  <div className="container">
    <div className="panel pricing-table">
      <div className="pricing-plan">
        <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" className="pricing-img" />
        <h2 className="pricing-header">الخيار الأول</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">الإعلان عن العقار الواحد </li>
          <li className="pricing-features-item">مدة يوم</li>
        </ul>
        <span className="pricing-price">30 دت</span>
        <button href="#/" className="pricing-button" defaultValue={30} onClick={(e)=>handleSumbit(e,30000)}>إختر</button>
      </div>
      
      <div className="pricing-plan">
        <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" className="pricing-img" />
        <h2 className="pricing-header">الخيار الثاني (أحسن عرض)</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">الإعلان عن العقار الواحد</li>
          <li className="pricing-features-item">مدة 3 أيام</li>
        </ul>
        <span className="pricing-price">80 دت</span>
        <button href="#/" className="pricing-button is-featured"  onClick={(e)=>handleSumbit(e,80000)}>إختر</button>
      </div>
      
      <div className="pricing-plan">
        <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" className="pricing-img" /> 
        <h2 className="pricing-header">الخيار الثالث</h2>
        <ul className="pricing-features">
          <li className="pricing-features-item">الإعلان عن العقار الواحد</li>
          <li className="pricing-features-item">مدة أسبوع</li>
        </ul>
        <span className="pricing-price">180 دت</span>
        <button href="#/" className="pricing-button" defaultValue={180} onClick={(e)=>handleSumbit(e,180000)}>إختر</button>
      </div>
      
    </div>
  </div>
</div>
</div>)
}

export default Package