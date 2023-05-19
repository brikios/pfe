import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import './account.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/card/Card';
import "./../../components/card/card.css"
import InfiniteScroll from "react-infinite-scroll-component"
import useFetch2 from '../../hooks/useFetch2';



const Account = () => {
        const location= useLocation();
        const userId=location.pathname.split("/")[2]
        
        const {user} = useContext(AuthContext)
        const {data2,load,err,ref} = useFetch2(`http://localhost:8800/property/getByOwner/${userId}`)
        const {data,loading,error,refresh} = useFetch(`http://localhost:8800/users/get/${userId}`)
        
       //console.log(userId)
        //console.log(data)
        //console.log(data2)
        useEffect(()=>{
          document.title=`${data.firstName} ${data.lastName}`
        })
      
        const sameUser = userId==user._id ?true :false
      
  return (
    <div>
        <Navbar />
        <div className="profile">
      <img src={data.img} alt="Profile Picture" />
      <h1>{data.firstName} {data.lastName}</h1>
      <p>{data.phone} 216+ </p>
      <div className="stats">
        
        <div>
          <h3>ملكية</h3>
          <p>123</p>
        </div>
        <div>
          <h3>عملية كراء</h3>
          <p>456</p>
        </div>
        <div>
          <h3>متابعين</h3>
          <p>789</p>
        </div>
      </div>
      {sameUser ?<>
      <button className='btnAdd'>
    <span>أضف ملكية</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/> </svg>
</button>
<button className='btnSet'>
    <span>إعدادات </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/> </svg>
</button></>
      :<></>}
    </div>
     

    <div className="cards-list" >
    
    {
      data2?.map((prop,index)=>{
        return(
          <Card 
          key={prop.id}
          img={prop.images[0]}
          rating={prop.rating}
          city={prop.city}
          title={prop.title}
          price={prop.price} 
              />
              )})
    }
    </div>
    </div>
  )
}

export default Account