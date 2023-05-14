import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
export const Navbar = () => {
  const navigate =useNavigate()
  const handleNavigate=(path)=>{
    navigate(path)
  }
  const{user}=useContext(AuthContext)

  return (
    <div className='navbar'>
        <div className="navContainer">
          <span className='logo' onClick={()=>handleNavigate('/')}>داري</span>
           {user ? (<><div className="dropdown">
            <img className='profile-photo' src={user.img} alt="" />
                          
                          <div class="dropdown-content">
                            <a onClick={()=>handleNavigate('/account')}>حسابي</a>
                            <a onClick={()=>handleNavigate('/logout')}>خروج</a>
                            <a>{user.email}</a>
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
