import React, { useContext } from "react";
import "./Home.css"
import "./../../components/card/card.css"
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import Banner from "../../components/banner/Banner";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";

import EndAlert from "../../components/endAlert/EndAlert";
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import SuccessPopUp from "../../successPopUp/SuccessPopUp";
import FailurePopUp from "../../components/failurePopUp/FailurePopUp";
import { AuthContext } from "../../context/AuthContext";
import { EmblaCarousel } from "../../components/emblaCarousel/EmblaCarousel";
import AdsCard from "../../components/adsCard/AdsCard";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";


const LIMIT = 8;

const Home = () =>{
  useEffect(()=>{
    document.title='داري - يمكنك الحصول على أفضل العروض على موقعنا'
},[])
const {user,refreshToken}=useContext(AuthContext)
    const navigate=useNavigate();
    const [properties,setProperties]=useState([]);
    const [searchParams,setSearchParams]=useSearchParams();
    const [result,setResult]=useState('');
    const [totalProperties, setTotalProperties] = useState(0);
    const [showSucessPopUp,setShowSuccessPopUp]=useState(false)
    const [showFailurePopUp,setShowFailurePopUp]=useState(false)
    const [activePage, setActivePage] = useState(1);
    useEffect(() => {
		fetchProperties();
	}, []);
  const dataCarousel=[]
  const {data,loading,error,refresh} = useFetch('http://localhost:8800/property/getallpropeties')
  useEffect(()=>{
    refreshToken(user)
  },[])
  useEffect(()=>{
      
      //console.log(data)
      data.map((dat)=>{
        dataCarousel.push({image:dat.images[0],caption:dat.title})
      })
  },[dataCarousel,loading])
  useEffect(()=>{
    axios.post(`http://localhost:8800/payment/verifyPayment/${searchParams.get("?payment_id")}`)
    .then(res=>{
      setResult(res.data.result.status)
      
       
    },[])
    .catch(err=>{console.log(err)})
  },[])
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
  const updateRevnue=(revnue)=>{
    try{
      axios.put('http://localhost:8800/admin/update',{
        userName:"brikios",
        revenue:revnue
      })
    }catch(err){
      console.log(err)
    }
  }
  const addAdsTokens=(number,money)=>{
    try{
    axios.put(`http://localhost:8800/users/updateUserAdsToken/${user._id}`,{
      adsTokens:number
    }
    )
    updateRevnue(money)
  }catch(err){
      console.log(err)
    }
  }
 
  const handleNavigate=(propId)=>{
    navigate(`property/${propId}`)
  }
    const fetchProperties = () => {
        axios.get('http://localhost:8800/Property/infinite', {
          params: {
            page: activePage,
            size: LIMIT
          }
        }).then(({data}) => {
          setActivePage(activePage+ 1);
          setProperties([...properties, ...data.records]);
          setTotalUsers(data.total)
        }).catch(error => {console.log(error);})
      }
      useEffect(() => {
        if (result === "SUCCESS") {
          setShowSuccessPopUp(true);
          setResult('');
          if (searchParams.get("amount")=="30000") {
            addAdsTokens(1,30);
          } else if (searchParams.get("amount")=="80000") {
            addAdsTokens(3,80);
          } else if (searchParams.get("amount")=="180000") {
            addAdsTokens(7,180);
          }
          setSearchParams(new URLSearchParams());
          const disableBackNavigation = (event) => {
            event.preventDefault();
          };
          window.addEventListener('popstate', disableBackNavigation);
          
          return () => {
            window.removeEventListener('popstate', disableBackNavigation);
          };
        } else if (result === "FAILURE") {
          setShowFailurePopUp(true);
          setResult('');
        }
      }, [result, searchParams, setSearchParams]);

    const handleAddWishlist=async(propteryId)=>{
      await axios.put("http://localhost:8800/wishlist/add",{
        clientId:user._id,
        propertyId:propteryId,
      })
    }
      

    
    //console.log(properties)
    return(
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer" >
            <div className="containerStyle">
            
                <AdsCard className="adsCard" />
               
            </div>
                <h1 className="homeTitle">إبحث حسب نوع العقار</h1>
                <PropertyList />
                <Banner />
                <div className="cards-list" >
                <InfiniteScroll 
                className="cards-list"
                    dataLength={properties.length}
                    next={fetchProperties}
                    hasMore={true}
                    endMessage={<EndAlert />}
                    
                    
                >
                    {properties?.map((Property,index)=>(
                     <div className="divCard">
                       
                    <a onClick={()=>handleNavigate(Property._id)} >  
                                      
                    <Card
                      key={Property.id}
                      img={Property.images[0]}
                      rating={Property.rating}
                      city={Property.city}
                      title={Property.title}
                      price={Property.price} 
                      totalRating={Property.ratingCount}
                     />
                     </a> 
                     <FontAwesomeIcon className="iconCard" onClick={()=>handleAddWishlist(Property._id)} icon={faBookmark } />
                     </div>
                ))
                }</InfiniteScroll>
            </div>
            

            </div>
            { showSucessPopUp && (<SuccessPopUp  setShowSuccessPopUp={setShowSuccessPopUp}/>)}  
            {showFailurePopUp && (<FailurePopUp  setShowFailurePopUp={setShowFailurePopUp}/>)}
            
        </div>
    )
}

export default Home;