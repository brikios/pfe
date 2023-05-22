import React, { useState } from 'react'
import './Registre.css'
import axios from 'axios'
const Registre = () => {
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const handleSubmit=(event)=>{
        event.preventDefault();
        try{
            axios.post('http://localhost:8800/auth/register',{
                firstName:firstName,
                lastName:lastName,
                email:email,
                password:password,
                phone:phone
            })
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='container'>
        <div className='container-form'>
            <h1>تسجيل الدخول</h1>
            <input type='text' placeholder='الإسم' id='firstname' onChange={(e)=>setFirstName(e.target.value)}  className='container-form-email' />
            <input type='text' placeholder='اللقب' id='lastName' onChange={(e)=>setLastName(e.target.value)} className='container-form-email' />
            <input type='text' placeholder='البريد الإلكتروني' id='email' onChange={(e)=>setEmail(e.target.value)} className='container-form-email' />
            <input type='password' placeholder='كلمة السر' id='password'  onChange={(e)=>setPassword(e.target.value)}className='container-form-password' />
            <input type='text' placeholder='الهاتف' id='lastName'  onChange={(e)=>setPhone(e.target.value)} className='container-form-email' />
            <span className='cookies'>بالنقر على زر "التسجيل"، فإنك توافق على سياسة ملفات تعريف الارتباط<br />(cookies) لدينا. قد تتلقى رسائل بريد إلكتروني منا ويمكنك إلغاء الاشتراك في أي وقت.</span>
            <button   className='container-form-button' onClick={handleSubmit} >سجل الدخول</button>
            
        </div>
   </div>
  )
}

export default Registre