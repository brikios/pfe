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


const LIMIT = 8;

const Home = () =>{
  useEffect(()=>{
    document.title='داري - يمكنك الحصول على أفضل العروض على موقعنا'
},[])
const {user}=useContext(AuthContext)
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

  useEffect(()=>{
    axios.post(`http://localhost:8800/payment/verifyPayment/${searchParams.get("payment_id")}`)
    .then(res=>{
      setResult(res.data.result.status)
      addAdsTokens(5)
    },[])
    .catch(err=>{console.log(err)})
  },[])
  
  const addAdsTokens=(number)=>{
    try{
    axios.put(`http://localhost:8800/users/updateUserAdsToken/${user._id}`,{
      adsTokens:number
    })}catch(err){
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
        }).catch(error => {
          console.log(error.response);
        })
      }
    useEffect(()=>{
      if(result === "SUCCESS"){
        setShowSuccessPopUp(true)
        setResult('')
      }else if(result === "FAILURE"){
        setShowFailurePopUp(true)
        setResult('')
      }
    })

    
      

    
    //console.log(properties)
    return(
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer" >
                <Featured />
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