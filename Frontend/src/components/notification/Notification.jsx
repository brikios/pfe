import React from 'react'

const Notification = ({props}) => {
  return (
    <div className='notific'>
        <div className="info">
            <img src={props.userImg} alt="" className="userImg" />
            <span>{props.firstName} {props.lastName}</span>
        </div>
        
    </div>
  )
}

export default Notification