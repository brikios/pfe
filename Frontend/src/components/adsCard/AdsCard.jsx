import React, { useEffect, useState } from 'react';
import './adsCard.css';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const AdsCard = () => {
  const { data, loading, error, refresh } = useFetch('http://localhost:8800/advertise/getall');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, data]);

  return (
    <div className="carousel">
      <div className="carouselSlide">
        <h4>إشهار</h4>
        
        <img className='imageur' onClick={()=>navigate(`/property/${data[currentIndex]?.propertyId._id}`)} src={data[currentIndex]?.propertyId.images[0]} alt="Carousel Image" />
      
      </div>
      <div className="carouselDetails">
      <h3>{data[currentIndex]?.propertyId.title}</h3>
      </div>
      <div className="userImage">
        
          <img src={data[currentIndex]?.propertyId.currentOwner.img} onClick={()=>navigate(`/account/${data[currentIndex]?.propertyId.currentOwner._id}`)} alt="User Image" />
          <h3 onClick={()=>navigate(`/account/${data[currentIndex]?.propertyId.currentOwner._id}`)}>{data[currentIndex]?.propertyId.currentOwner.firstName} {data[currentIndex]?.propertyId.currentOwner.lastName}</h3>
          
        </div>
      
    </div>
  );
  
};

export default AdsCard;
