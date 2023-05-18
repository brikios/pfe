import React, { useContext } from 'react'
import './msg.css'
import {format} from 'timeago.js'
const Msg = ({msg,mine}) => {
  
  return (
    <div className={mine ? "msg mine":"msg"}>
        <div className="msgTop">
            <img 
                src="https://scontent.ftun2-2.fna.fbcdn.net/v/t39.30808-6/283636445_2063900240458504_6432182910430810018_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sSiXYrbLpYwAX8BPWwc&_nc_ht=scontent.ftun2-2.fna&oh=00_AfCDCuW_Sovb6KEyrOcOWtEIMQSaOLgd0HZFkO5Sx6-HQg&oe=64666DFE" 
                alt="" 
                className='msgImg'
            />
            <p className='msgText'>{msg.text}</p>
        </div>
        <div className="msgBottom">
            {format(msg.createdAt)}
        </div>
    </div>
  )
}

export default Msg