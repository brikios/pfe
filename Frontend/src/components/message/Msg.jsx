import React from 'react'
import './msg.css'
const Msg = ({mine}) => {
  return (
    <div className={mine ? "msg mine":"msg"}>
        <div className="msgTop">
            <img 
                src="https://scontent.ftun2-2.fna.fbcdn.net/v/t39.30808-6/283636445_2063900240458504_6432182910430810018_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sSiXYrbLpYwAX8BPWwc&_nc_ht=scontent.ftun2-2.fna&oh=00_AfCDCuW_Sovb6KEyrOcOWtEIMQSaOLgd0HZFkO5Sx6-HQg&oe=64666DFE" 
                alt="" 
                className='msgImg'
            />
            <p className='msgText'>السلام عليكم و رحمت الله و بركاته السلام عليكم و رحمت الله و بركاته</p>
        </div>
        <div className="msgBottom">
            1 hour ago
        </div>
    </div>
  )
}

export default Msg