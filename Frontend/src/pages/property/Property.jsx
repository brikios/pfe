import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import './property.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
//import { useState } from "react";
import useFetch from './../../hooks/useFetch.js'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import PopUpRes from "../../components/popUpRes/PopUpRes";
import Profile from "../../components/profile/Profile";
import useFetch2 from "../../hooks/useFetch2";
const property = () =>{
    const location= useLocation();
    const navigate=useNavigate();
    const propertyId=location.pathname.split("/")[2]
    const currentUser=JSON.parse(localStorage.getItem('id'))
    const [slideNumber,setSlideNumber]=useState(0);
    const [openImg,setOpenImg]=useState(false);
    const [openPopUp,setOpenPopUp]=useState(false)
    const handleOpenImg=(index)=>{
        setSlideNumber(index);
        setOpenImg(true);   
    }
    const {data,loading,error,refresh} = useFetch(`http://localhost:8800/property/get/${propertyId}`)
    const {data2,load,err,ref} = useFetch2(`http://localhost:8800/users/get/${data.currentOwner}`)
    const {user}=useContext(AuthContext);
    useEffect(()=>{
        document.title=`${data.title}`
        
    })
    const handleImgChange= (direction)=>{
            let newSlideNumber;

            if(direction==="l")
            {
                newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
            }else{
                newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1

            }
            setSlideNumber(newSlideNumber)
    }
    

    const handleUserState=()=>{
       (user) ? setOpenPopUp(true) : navigate('/login') 
    }
    const handleNavigate=(path)=>{
        navigate(`/account/${path}`)
    }
    return(
        <div>
            <Navbar />
            {useEffect(()=>{
        document.title=`${data.adress}`
    },[])}
            <Header type="properties"/>
            {loading?("loading") : (
            <div className="propertyContainer">
                {openImg && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="exit" onClick={()=>setOpenImg(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleImgChange('r')}/>                  
                    <div className="sliderWrapper">
                        <img src={data.images[slideNumber]} alt="" className="sliderImg"  />
                    </div>
                    
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleImgChange('l')}/>
                </div>}
                <div className="propertyWrapper">
                    <h1 className="propertyTitle">{data.name}</h1>
                    <div className="propertyAdress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.adress}</span>
                    </div>
                    <span className="propertySubTitle">إحجز الان بأفضل الأسعار و يمكنك إلغاء الحجز لاحقا</span>
                    <div className="propertyImages">
                        {data.images?.map((img,index)=>(
                            <div className="propertyImageWrapper">
                                <img src={img} onClick={()=>handleOpenImg(index)} alt="" className="propertyImage" />
                            </div>
                        ))}
                        
                    </div>
                    <div className="propertyDetails">
                        <div className="propertyDetailText">
                            <h1 className="propertyDescTitle">{data.title}</h1>
                            <p className="propertyDesc">{data.description}</p>
                            
                        </div>
                        <div className="propertyDetailsPrice">
                            <h1>للكراء بالشهر أو بالأسبوع</h1>
                            <span>تريد ليلة نوم هانئة؟ حازت هذه المنشأة على تقييم عالٍ لما تتمتع به من مميزات مريحة للغاية.</span>
                            <h2><b>{data.price} دت</b> الشهر</h2>
                            <button onClick={handleUserState}>احجز الآن</button>
                        </div>
                        
                    </div>
                    <div >
                        <a onClick={()=>handleNavigate(data2._id)}>
                        <Profile 
                    key={data2.id}
                    img={data2.img}
                    firstName={data2.firstName}
                    lastName={data2.lastName}
                    phone={data2.phone}
                    email={data2.email}
                    /></a></div>
                </div>
            </div>)}
            {openPopUp && <PopUpRes setOpenPopUp={setOpenPopUp} propertyId={propertyId} currentUser={currentUser}/>}
            
        </div>
    )
}

export default property;