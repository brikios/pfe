import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
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
           {user ? (<><div class="dropdown">
            <img className='profile-photo' src="https://images.pexels.com/photos/16654873/pexels-photo-16654873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                          
                          <div class="dropdown-content">
                            <a href="#">Profile</a>
                            <a href="/logout">Logout</a>
                          </div>
                        </div>
                        </>)  
           :( <div className="navItems">
           
                <button className='navButton' >إشترك</button>
                <Link to={'http://localhost:5173/login'} >
                <button className='navButton'>سجل الدخول</button>
                </Link>
            </div>)}
            
        </div>
    </div>
  )
}
