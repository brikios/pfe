import React, { useContext, useEffect, useState } from 'react'
import './conversations.css'
import axios from 'axios'
const Conversations = ({conversation,currentUser}) => {
  const [user,setUser]=useState(null)
  //const {user}=useContext(AuthContext)
   

  useEffect(()=>{
          const receiver = conversation.members.find((m)=>m !== currentUser._id)
          console.log(currentUser)
          const getUser= async ()=>{
            try{
            const res = await axios(`http://localhost:8800/users/get/${receiver}`)
            setUser(res.data)
            console.log(res.data)
            
          }catch(err){
            console.log(err)
          }
          }
          getUser()
        },[currentUser,conversation])
  return (
    <div className='conv'>
        <img src={user.img} alt="" className="convImg" />
        <span className="convName">{user.firstName}</span>
    </div>
  )
}

export default Conversations