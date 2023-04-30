import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate =useNavigate()
  const handleNavigate=()=>{
    navigate('/')
  }
  return (
    <div className='navbar'>
        <div className="navContainer">
          <span className='logo' onClick={handleNavigate}>داري</span>
                <div className="navItems">
                <button className='navButton'>إشترك</button>
                <button className='navButton'>سجل الدخول</button>
            </div>
            
        </div>
    </div>
  )
}
