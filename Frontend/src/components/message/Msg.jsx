import React, { useContext } from 'react'
import './msg.css'
import {format} from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
const Msg = ({msg,mine}) => {
  const{user}=useContext(AuthContext)
  return (
    <div className={mine ? "msg mine":"msg"}>
        <div className="msgTop">
            
            <p className='msgText'>{msg.text}</p>
        </div>
        <div className="msgBottom">
            {format(msg.createdAt)}
        </div>
    </div>
  )
}

export default Msg