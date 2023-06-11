import React, { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import './dashboard.css'
import Stats from '../Components/Stats/Stats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartGantt, faPaperPlane, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import Users from '../Components/Users/Users'
import Reports from '../Components/reports/Reports'
const Dashboard = () => {
    const [state,setState]=useState("dashboard")
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
                <li><a href="#"><FontAwesomeIcon className='font' icon={faSignOut} /> تسجيل الخروج</a></li>
                </ul>
            </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard