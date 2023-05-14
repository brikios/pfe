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
        if(user){
        const sameUser = data._id==user._id ?"true" :false
      }
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