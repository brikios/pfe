import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import './property.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCircleArrowLeft, faCircleArrowRight, faCircleXmark,  faExclamationTriangle,  faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetch from './../../hooks/useFetch.js'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import PopUpRes from "../../components/popUpRes/PopUpRes";
import Profile from "../../components/profile/Profile";
import useFetch2 from "../../hooks/useFetch2";
import PopUpReview from "../../components/popUpReview/PopUpReview";
import SuccessPopUp from "../../successPopUp/SuccessPopUp";
import ReportPopUp from "../../components/reportPopUp/ReportPopUp";
import EditPropertyPopUp from "../../components/editPropertyPopUp/EditPropertyPopUp.JSX";
import axios from "axios";
import Comments from "../../components/comments/Comments";
import AdsPopUp from "../../components/adsPopUp/AdsPopUp";


  

const property = () =>{
    const location= useLocation();
    const navigate=useNavigate();
    const propertyId=location.pathname.split("/")[2]
    const currentUser=JSON.parse(localStorage.getItem('id'))
    const [slideNumber,setSlideNumber]=useState(0);
    const [openImg,setOpenImg]=useState(false);
    const[records,setRecords]=useState([])
    const [openPopUp,setOpenPopUp]=useState(false)
    const [openPopUpReview,setOpenPopUpReview]=useState(false)
    const [showSucessPopUp,setShowSuccessPopUp]=useState(false)
    const [openReportPopUp,setOpenReportPopUp]=useState(false)
    const [openEditPropertyPopUp,setOpenEditPropertyPopUp]=useState(false)
    const [openPopUpAds,setOpenPopUpAds]=useState(false);
    const [userReview, setUserReview] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [banned,setBanned]=useState([])
  
    const handleOpenImg=(index)=>{
        setSlideNumber(index);
        setOpenImg(true);   
    }
   
    const {data,loading,error,refresh} = useFetch(`http://localhost:8800/property/get/${propertyId}`)
    const {data2,load,err,ref} = useFetch2(`http://localhost:8800/users/get/${data.currentOwner}`)
    const {user,refreshToken}=useContext(AuthContext);

    const [socket,setSocket]=useState(null)
  
    
    useEffect(()=>{
        if(user && !user.isConfirmed){
          navigate('/confirm')
        }
      },[])
      useEffect(()=>{
        if(user && user.Banned){
          navigate('/Banned')
        }
      },[])
      
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
    
useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`http://localhost:8800/users/get/${data?.currentOwner}`);
        setBanned(response.data)
        console.log(banned)
        }catch(err){
            console.log(err)
        };
        fetchData();
        }}, [data.currentOwner]);
    useEffect(() => {
        const getReviews = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/review/get/${propertyId}`);
            setRecords(response.data);
    
            const userReview = response.data.find((review) => review.user._id === user?._id);
            setUserReview(userReview);
                setHasReviewed(!!userReview);
          } catch (err) {
            console.log(err);
          }
        };
    
        getReviews();
      }, [propertyId, user?._id]);
      useEffect(() => {
        if ( data2.banned) {
          navigate('/userBanned');
        }
      }, [data2]);
    const handleUserState=()=>{
       (user) ? setOpenPopUp(true) : navigate('/login') 
    }
    const handleNavigate=(path)=>{
        navigate(`/account/${path}`)
    }
    let sameUser=false
    if(user){
        sameUser = data.currentOwner==user._id ?true :false
    }
   
    const handleUserStateReview=()=>{
        if(user){
        (!sameUser) ?setOpenPopUpReview(true) : alert("you're not allowed to do that")
    }else{
        navigate('/login')
    }
    }
    
    const handleUserStateReport=()=>{
        if(user){
        (!sameUser) ?setOpenReportPopUp(true) : alert("you're not allowed to do that")
    }else{
        navigate('/login')
    }}
    const handleAddWishlist=async(propteryId)=>{
        await axios.put("http://localhost:8800/wishlist/add",{
          clientId:user._id,
          propertyId:propteryId,
        })
      }

      useEffect(()=>{
        if(data2.Banned){
          navigate('/userBanned')
        
        }
      })
      
    return(
        <div>
            
            <Navbar socket={socket} />
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
                        <span>{data.adress} ، {data.city}</span>
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
                        <button className="reportBtn" onClick={handleUserStateReport} ><FontAwesomeIcon icon={faExclamationTriangle} /> تبليغ عن الملكية</button><br/>
                        <button className="wishBtn" onClick={()=>handleAddWishlist(propertyId)} ><FontAwesomeIcon icon={faBookmark} /> أضف إلي قائمة المفضلات</button>

                            <h1 className="propertyDescTitle">{data.title}</h1>
                            <p className="propertyDesc">{data.description}</p>
                            
                        </div>
                        {sameUser ?(<>
                        
                            <button class="button-56" onClick={()=>setOpenEditPropertyPopUp(true)} role="button">تعديل</button>
                            <button className="button-56" onClick={()=>setOpenPopUpAds(true)}>أشهر هذه الملكية</button>
                            </> )
                            :<div className="propertyDetailsPrice">
                            <h1>للكراء بالشهر أو بالأسبوع</h1>
                            <span>تريد ليلة نوم هانئة؟ حازت هذه المنشأة على تقييم عالٍ لما تتمتع به من مميزات مريحة للغاية.</span>
                            <h2><b>{data.price} دت</b> الشهر</h2>
                            <button onClick={handleUserState}>احجز الآن</button>
                        </div>}
                        
                      
                    </div>
                    <div className="propertyDetails">
                    {sameUser ?<></>:<><a onClick={()=>handleNavigate(data2._id)}>
                        <Profile 
                    key={data2.id}
                    img={data2.img}
                    firstName={data2.firstName}
                    lastName={data2.lastName}
                    phone={data2.phone}
                    email={data2.email}
                    /></a></>}
                    
                    <div className="propertyDetailsPrice1">
                        {records.map((record,index)=>(
                           <div>
                            
                                <Comments 
                                img={record.user.img}
                                    firstName={record.user.firstName}
                                    lastName={record.user.lastName}
                                    rating={record.rating}
                                    comment={record.reviewText}
                                />     
                                
                                <hr/>
                               </div> 
                        ))}
                        
                        
                    </div>
                    </div>
                </div>
                
               {sameUser ? <></> :!hasReviewed && (
            <button className="btnReview" onClick={handleUserStateReview}>
              أضف مراجعة
            </button>
          )}
                           
            </div>)}
            
            {openPopUp && 
            <PopUpRes 
            setOpenPopUp={setOpenPopUp} 
            setShowSuccessPopUp={setShowSuccessPopUp} 
             propertyId={propertyId}
            currentUser={currentUser} 
            socket={socket}/>
            }
            {openPopUpAds && 
            <AdsPopUp setOpenPopUpAds={setOpenPopUpAds} 
            setShowSuccessPopUp={setShowSuccessPopUp}  
            propertyId={propertyId} />
            }
            {openPopUpReview && 
            <PopUpReview setOpenPopUpReview={setOpenPopUpReview} 
            setShowSuccessPopUp={setShowSuccessPopUp} 
            propertyId={propertyId}/>
            }
            
            {showSucessPopUp && 
            <SuccessPopUp  
            setShowSuccessPopUp={setShowSuccessPopUp}
             />}
            {openReportPopUp && 
            <ReportPopUp 
            setOpenReportPopUp={setOpenReportPopUp} 
            setShowSuccessPopUp={setShowSuccessPopUp} 
            propertyId={propertyId} />}
            {openEditPropertyPopUp && 
            <EditPropertyPopUp 
            setOpenEditPropertyPopUp={setOpenEditPropertyPopUp} 
            propertyId={propertyId} />}
        </div>
    )
}

export default property;