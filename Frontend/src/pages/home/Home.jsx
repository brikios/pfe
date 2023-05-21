import React from "react";
import "./Home.css"
import "./../../components/card/card.css"
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import Banner from "../../components/banner/Banner";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
import {readInfiniteScrollProperty} from './../../api/Property.js'
import EndAlert from "../../components/endAlert/EndAlert";
import InfiniteScroll from "react-infinite-scroll-component"
//import {infiniteScroll,handleScroll} from "./../../hooks/infiniteScroll";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import property from "../property/Property";
import { Link } from 'react-router-dom'


const LIMIT = 8;

const Home = () =>{
  useEffect(()=>{
    document.title='داري - يمكنك الحصول على أفضل العروض على موقعنا'
},[])
    const navigate=useNavigate();
    const [properties,setProperties]=useState([]);
    //const [skip,setSkip]=useState(0);
    const [totalProperties, setTotalProperties] = useState(0);
    const [activePage, setActivePage] = useState(1);
    useEffect(() => {
		fetchProperties();
	}, []);
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
            
        </div>
    )
}

export default Home;