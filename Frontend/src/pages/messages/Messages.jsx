import React, { useContext, useEffect, useRef, useState } from 'react'
import './messages.css'
import { Navbar } from '../../components/navbar/Navbar'
import Conversations from '../../components/conversations/Conversations'
import Msg from '../../components/message/Msg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
const messages = () => {
  const[conv,setConv]=useState([])
  const[chat,setChat]=useState(null)
  const[messages,setMessagess]=useState([])
  const[newMsg,setNewMsg]=useState("")
  const [arrivalMessage,setArrivalMessage]=useState("")
  const socket =useRef()
  const {user}=useContext(AuthContext)
  const scrollRef = useRef()
  const navigate=useNavigate()
  useEffect(()=>{
    if(user && !user.isConfirmed){
      navigate('/confirm')
    }
  },[])
  useEffect(()=>{
    if(user==null){
      navigate('/login')
    }
  },[])
  useEffect(()=>{
    socket.current=io("ws://localhost:8900")
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now(),
      })
    })
  },[])
  useEffect(()=>{
    arrivalMessage &&chat?.members.includes(arrivalMessage.sender)&&
    setMessagess((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,chat])
 if(user){
  useEffect(()=>{
    const getConversations=async()=>{
      try{
        
      const res = await axios.get(`http://localhost:8800/conversation/getconvbyid/${user._id}`)
      setConv(res.data)
    
    }catch(err){
      console.log(err)
    }
    //console.log(socket)
    }
    getConversations()
  },[user._id])
}
   useEffect(()=>{
      socket.current.emit("addUser",user._id) 
      socket.current.on("getUsers",users=>{
        console.log(users)  
      })
       
  },[user])
  useEffect(()=>{
    const getMessages = async()=>{
      try{
      const res = await axios.get(`http://localhost:8800/message/getMsg/${chat?._id}`)
      setMessagess(res.data)
    }catch(err){
      console.log(err)
    }}
    getMessages()
  },[chat])
  //console.log(chat)
  //console.log(messages)
  const handleSendMsg=async(e)=>{
      e.preventDefault();
      const message ={
        conversationId:chat._id,
        sender:user._id,
        text:newMsg,
      }
      const receiverId=chat.members.find(member=>member!==user.id)
      try{
        const res= await axios.post(`http://localhost:8800/message/addMsg/`,message)
        setMessagess([...messages,res.data])
        setNewMsg("")
        
      }catch(err){
        console.log(err)
      }
      socket.current.emit("sendMessage",{
        senderId:user._id,
        receiverId:receiverId,
        text:newMsg,
      })
      console.log({receiverId,newMsg})
  }
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView()
  },[messages])

 
  return (
    <>
      <Navbar />
      <div className="messages">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='إبحث عن شخص' className='chatMenuInput' />
            {conv.map((con)=>(
              <div onClick={()=>setChat(con)}>
                <Conversations conversation={con} currentUser={user}/>
                </div>
                ))}

          </div>
        </div>
        
        <div className="chatBox">{
              chat ?
              <>
          <div className="chatBoxWrapper">    
            <div className="chatBoxTop">

              {messages.map((m)=>(
                <div ref={scrollRef}>
              <Msg msg={m}  mine={m.sender !== user._id}/>
                </div>
              ))}
             
             
            </div>
            
            
          </div>
          <div className="chatBoxBottom">
              <textArea onChange={(e)=>setNewMsg(e.target.value)} value={newMsg} className="chatMsgInp" placeholder="أكتب رسالتك"></textArea>
              <button className='chatBtn' onClick={handleSendMsg}><FontAwesomeIcon icon={faArrowAltCircleUp} /></button>
            </div></> : <span className='noChat'> إفتح مراسلة لتبدأ</span>}
        </div>
        
        
      </div>
      </>
  )
}

export default messages