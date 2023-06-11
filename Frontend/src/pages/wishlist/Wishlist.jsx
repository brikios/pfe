import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import useFetch from './../../hooks/useFetch.js';
import { AuthContext } from '../../context/AuthContext';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import "./../../components/card/card.css";
import "./wishlist.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const { data, loading, refresh, error } = useFetch(`http://localhost:8800/wishlist/${user?._id}`);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user && user.Banned){
      navigate('/Banned')
    }
  },[])
  useEffect(()=>{
    if(user && !user.isConfirmed){
      navigate('/confirm')
    }
  },[])
  useEffect(() => {
    if (!loading && !error) {
      if (refresh) {
        setWishlist(refresh[0]?.propertyIds || []);
      } else {
        setWishlist(data[0]?.propertyIds || []);
      }
    }
  }, [loading, data, refresh, error]);

  const handleDelete = async (propertyId) => {
    try {
      await axios.delete("http://localhost:8800/wishlist/delete", {
        data: {
          clientId: user._id,
          propertyId: propertyId,
        },
      });

      // Remove the deleted property from the wishlist
      setWishlist((prevWishlist) =>
        prevWishlist.filter((prop) => prop._id !== propertyId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="cards-list">
        {wishlist.length > 0 ? (
          wishlist.map((prop) => (
            <div className='divdov' key={prop._id}>
              <a onClick={() => navigate(`/property/${prop._id}`)}>
                <Card
                  img={prop?.images[0]}
                  rating={prop.rating}
                  city={prop.city}
                  title={prop.title}
                  price={prop.price}
                />
              </a>
              <FontAwesomeIcon
                className='xmark'
                onClick={() => handleDelete(prop._id)}
                icon={faXmark}
              />
            </div>
          ))
        ) : (
          <p>No items in the wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
