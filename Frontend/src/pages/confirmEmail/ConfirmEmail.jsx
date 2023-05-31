import React, { useContext, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

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
    <input type='text' onChange={(e)=>setConfirmationCode(e.target.value)} />
    <button onClick={handleSubmit}>تحقق</button>
    </div>
  )
}

export default ConfirmEmail