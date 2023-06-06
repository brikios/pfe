import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAd, faChartArea, faChartGantt, faHandPaper, faHandshake, faHome, faMoneyBill1Wave, faPager, faPaperPlane, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import './stats.css'
const Stats = () => {
  return (
    <div>
        <div className="content">
      <div className="stats">
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faUser} /><br />
          <h2>المستخدمون</h2>
          <p>50</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faHome} /><br />
          <h2>الملكيات</h2>
          <p>100</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faMoneyBill1Wave} /><br />
          <h2>المداخيل</h2>
          <p>25,000 دت</p>
        </div>
      </div>
    </div>
    <div className="content">
      <div className="stats">
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faHandshake} /><br />
          <h2>عملية كراء</h2>
          <p>37</p>
        </div>
        <div className="stat">
        <FontAwesomeIcon className='font' icon={faPaperPlane} /><br />
          <h2>تقارير</h2>
          <p>5</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faAd} /><br />
          <h2>عمليت إشهار</h2>
          <p>23</p>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Stats