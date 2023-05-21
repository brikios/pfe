    import React from 'react'
    import './SuccessPopUp.css'
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
    const SuccessPopUp = ({setShowSuccessPopUp}) => {
        const handleExitBtn=()=>{
            setShowSuccessPopUp(false)
        }
    return (
        <div class="notification-popup">
        <div class="notification-content">
        <div class="notification-icon">
            <FontAwesomeIcon icon={faCheck} className='check' />
        </div>
        <div class="notification-text">
            <span>تعليقك مهم لنا</span>
            
        </div>
        <button class="close-btn" onClick={handleExitBtn}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
    </div>
    )
    }

    export default SuccessPopUp