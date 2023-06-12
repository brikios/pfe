import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import './dashboard.css'
import Stats from '../Components/Stats/Stats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartGantt, faPaperPlane, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import Users from '../Components/Users/Users'
import Reports from '../Components/reports/Reports'
import { AuthContext } from '../context/AuthContext'
import Cookies from 'js-cookie';

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const [state,setState]=useState("dashboard")
    const{admin,dispatch}=useContext(AuthContext)
    const navigate=useNavigate()
    useEffect(()=>{
      if (!admin){
        navigate('/login')
      }
    },[])
    const handleLogOut=async()=>{
      try {
        await axios.delete('http://localhost:8800/auth/logoutAdmin');
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('expireTime');
        localStorage.removeItem('admin');
        Cookies.remove('access_admin_token');
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  return (
    <div className='body'>
    <div className="containerAdmin">
        <Navbar />
        {state=="dashboard" ? (<Stats />) : (state=="users"? <Users />:<Reports />)}
        <div className="footer">
            <div className="sidebar">
                <ul>
                <li><a href="#" onClick={(e)=>setState("dashboard")}><FontAwesomeIcon className='font' icon={faChartGantt} /> الإحصائيات</a></li>
                <li><a href="#" onClick={(e)=>setState("users")}><FontAwesomeIcon className='font' icon={faUser} /> المستخدمون</a></li>
                <li><a href="#" onClick={(e)=>setState("reports")}><FontAwesomeIcon className='font' icon={faPaperPlane} /> التقارير</a></li>
                <li><a href="#" onClick={handleLogOut}><FontAwesomeIcon className='font' icon={faSignOut} /> تسجيل الخروج</a></li>
                </ul>
            </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard