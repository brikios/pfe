import React, { useEffect } from 'react';
import './search.css';
import { useLocation } from 'react-router-dom';
import Records from '../../../../Data/gov.json';
import Proper from '../../../../Data/propTypes.json';
import PropertyItemSearch from "../../components/propertyItemSearch/PropertyItemSearch";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/properties", { state: { destination, propType, minPrice, maxPrice } });
  }

  const [destination, setDestination] = useState(location.state.destination);
  const [propType, setPropType] = useState(location.state.propType);
  const [maxPrice, setMaxPrice] = useState(location.state.maxPrice);
  const [minPrice, setMinPrice] = useState(location.state.minPrice);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8800/property/getall?city=${destination}&type=${propType}&min=${minPrice || 0}&max=${maxPrice || 9999999}`);
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [destination, propType, minPrice, maxPrice]);

  return (
    <div className="propertiesContainer">
      <div className="propertiesWrapper">
        <div className="propertiesSearch">
          <h1 className="Title">إبحث</h1>
          <div className="propertiesSearchItem">
            <label htmlFor="">الوجهة</label>
            <select
              type='text'
              className='headerSearchInput'
              onChange={e => { setDestination(e.target.value) }}
              defaultValue={destination}
            >
              <option disabled>إختر المكان</option>
              {Records.map((getGov) => (
                <option key={getGov.id} value={getGov.Gouvernorat}>
                  {getGov.Gouvernorat}
                </option>
              ))}
            </select>
          </div>
          <div className="propertiesSearchItem">
            <label htmlFor="">نوع العقار</label>
            <select
              type='text'
              className='headerSearchInput'
              onChange={e => { setPropType(e.target.value) }}
              defaultValue={propType}
            >
              <option disabled>إختر نوع العقار</option>
              {Proper.map((getProp) => (
                <option key={getProp.id} value={getProp.prop}>
                  {getProp.prop}
                </option>
              ))}
            </select>
          </div>
          <div className="propertiesSearchItem">
            <label htmlFor="">أدنى سعر</label>
            <input
              type="number"
              defaultValue={minPrice}
              onChange={e => { setMinPrice(e.target.value) }}
            />
          </div>
          <div className="propertiesSearchItem">
            <label htmlFor="">أعلى سعر</label>
            <input
              type="number"
              defaultValue={maxPrice}
              onChange={e => { setMaxPrice(e.target.value) }}
            />
          </div>
        </div>
        <div className="propertiesResult"></div>
      </div>
      <div className="propertiesResult">
        {loading ? "جاري التحميل" : (
          <>
            {data.map((Property) => (
              <PropertyItemSearch
                key={Property._id}
                props={Property}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Search;
