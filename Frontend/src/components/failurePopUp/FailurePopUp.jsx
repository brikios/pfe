import React, { useEffect } from 'react'

import './failurePopUp.css'
import { faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
const FailurePopUp = ({setShowFailurePopUp}) => {
    const navigate = useNavigate()
    const handleExitBtn=(event)=>{
        event.preventDefault();
        setShowFailurePopUp(false)
        navigate('/')
    }
  return (
    <div class="notification-popup">
        <div class="notification-content">
        <div class="notification-icon">
            <FontAwesomeIcon icon={faExclamation} className='fail' />
        </div>
        <div class="notification-text">
            <span>حصل خطأ ما الرجاء إعادة المحاولة</span>
            
        </div>
        <button class="close-btn" onClick={handleExitBtn}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
    </div>
  )
}

export default FailurePopUp