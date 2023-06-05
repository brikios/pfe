import React, { useEffect, useState } from 'react';


import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


import './adsCard.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';

const AdsCard = () => {
  const { data, loading, error, refresh } = useFetch('http://localhost:8800/property/getallpropeties');
  
  const navigate=useNavigate()
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    
   
   
<CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}
      > 
      <Slider>       <Slide index={0}>    
   {data?.map((Property,index)=>{
                {console.log(Property)}
                return(
                 
                     <a onClick={()=>navigate(`/property/${Property._id}`)} >  
                      
                     <Card
                       key={Property._id}
                       img={Property.images[0]}
                       rating={Property.rating}
                       city={Property.city}
                       title={Property.title}
                       price={Property.price} 
                       totalRating={Property.ratingCount}
                      />
                      
                      </a> 
                      
                    ) } 
                 )
                 }
                 </Slide>
                 </Slider>  
               </CarouselProvider>
             

           
  );
};

export default AdsCard;
