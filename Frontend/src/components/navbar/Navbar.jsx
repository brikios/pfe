import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons'
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
           {user ? (<><div className='mesNotif'>
                      <FontAwesomeIcon className='ico' icon={faBell} />
                      <FontAwesomeIcon className='ico' icon={faMessage} onClick={()=>navigate('/messages')}/>
                      </div>
                        <div className="dropdown">          
                        <img className='profile-photo' src={user.img} alt="" />
                          
                          <div className="dropdown-content">
                            <a className='link' onClick={()=>handleNavigate(`/account/${user._id}`)}>حسابي</a>
                            <a className='link' onClick={()=>handleNavigate('/logout')}>خروج</a>
                            
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
