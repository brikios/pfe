import React, { useContext, useEffect, useState } from 'react'
import './messages.css'
import { Navbar } from '../../components/navbar/Navbar'

import Conversations from '../../components/conversations/Conversations'
import Msg from '../../components/message/Msg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const messages = () => {
  const[conv,setConv]=useState([])
  const {user}=useContext(AuthContext)

  useEffect(()=>{
    const getConversations=async()=>{
      try{
      const res = await axios.get(`http://localhost:8800/conversation/getconvbyid/${user._id}`)
      setConv(res.data)
      console.log(conv)
    }catch(err){
      console.log(err)
    }

    }
    getConversations()
  },[user._id])
  return (
    <>
      <Navbar />
      <div className="messages">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='إبحث عن شخص' className='chatMenuInput' />
            {conv.map((con)=>(
                <Conversations conversation={con} currentUser={user}/>
                ))}
            
           
            
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
             <Msg mine={true}/>
             <Msg/>
             <Msg mine={true}/>
             <Msg/>
             <Msg mine={true}/>
             <Msg/>
             <Msg mine={true}/>
             <Msg/>
             <Msg mine={true}/>
             <Msg/>
             <Msg mine={true}/>
             <Msg/>
             
            </div>
          </div>
          <div className="chatBoxBottom">
              <textArea className="chatMsgInp" placeholder="أكتب رسالتك"></textArea>
              <button className='chatBtn'><FontAwesomeIcon icon={faArrowAltCircleUp} /></button>
            </div>
        </div>
        
        
      </div>
      </>
  )
}

export default messages