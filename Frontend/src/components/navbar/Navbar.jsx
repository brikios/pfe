import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
export const Navbar = () => {
  const navigate =useNavigate()
  const handleNavigate=()=>{
    navigate('/')
  }
  const{user}=useContext(AuthContext)

  return (
    <div className='navbar'>
        <div className="navContainer">
          <span className='logo' onClick={handleNavigate}>داري</span>
           {user ? (<><img className='imgUser' src='' />{user.lastName}</>)  :( <div className="navItems">
                <button className='navButton'>إشترك</button>
                <button className='navButton'>سجل الدخول</button>
            </div>)}
            
        </div>
    </div>
  )
}
