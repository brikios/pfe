import React from 'react'
import './search.css'
import { useLocation } from 'react-router-dom';
import Records  from '../../../../Data/gov.json';
import Proper from '../../../../Data/propTypes.json';
import PropertyItemSearch from "../../components/propertyItemSearch/PropertyItemSearch";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './../../hooks/useFetch.js'

const Search = () => {
  
  const location = useLocation()
  const navigate=useNavigate();
  const handleSearch =()=>{
    navigate("/properties",{state:{destination,propType,minPrice,maxPrice}})
  }
  
  const [destination ,setDestination] = useState(location.state.destination)
  const [propType ,setPropType] = useState(location.state.propType)
  const [maxPrice ,setMaxPrice] = useState(location.state.maxPrice)
  const [minPrice, setMinPrice] = useState(location.state.minPrice);
 
  const{data,loading,error,refrech} = useFetch(`http://localhost:8800/property/getall?city=${destination}&type=${propType}&min=${minPrice || 0 }&max=${maxPrice || 999}`)
  
  return (
    <div className="propertiesContainer">
                <div className="propertiesWrapper">
                    <div className="propertiesSearch">
                        <h1 className="Title">إبحث</h1>
                        <div className="propertiesSearchItem">
                          <label htmlFor="">الوجهة</label>
                          <select type='text' 
                              
                              className='headerSearchInput'
                              onChange={e=>{setDestination(e.target.value)}}
                              defaultValue={location.state.destination}
                              ><option selected >إختر المكان</option>
                              {
                              Records.map((getGov) =>{
                              //console.log(getGov.Gouvernorat)
                              return(
                                <option  value={getGov.Gouvernorat} 
                                onChange={e=>{setDestination(e.target.value)}}>
                                  {getGov.Gouvernorat}</option>
                              )
                          })}</select>
                        </div>
                        <div className="propertiesSearchItem">
                          <label htmlFor="" >نوع العقار</label>
                          <select type='text' 
                              className='headerSearchInput'
                              onChange={e=>{setPropType(e.target.value)}}
                              defaultValue={location.state.propType}
                                ><option selected disabled>إختر نوع العقار</option>
                                {
                                    Proper.map((getProp) =>{
                                      //console.log(getProp.prop)
                                  return(
                                  <option value={getProp.prop}  
                                  onChange={e=>{setPropType(e.target.value)}}>
                                    {getProp.prop}</option>
                    )
                 })}</select>
                        </div>
                        <div className="propertiesSearchItem">
                          <label htmlFor="">أدنى سعر</label>
                          <input type="number" defaultValue={location.state.minPrice}  onChange={e=>{setMinPrice(e.target.value)}}/>
                        </div>
                        <div className="propertiesSearchItem">
                          <label htmlFor="">أعلى سعر</label>
                          <input type="number" defaultValue={location.state.maxPrice}  onChange={e=>{setMaxPrice(e.target.value)}}/>
                        </div>
                        
                    </div>
                    <div className="propertiesResult"></div>
                </div>
                <div className="propertiesResult">
                {loading ?"جاري التحميل":<>
                {data.map((Property=>
                <PropertyItemSearch 
                    key={Property._id}
                    props={Property}
                />
                ))}
                
                </>}
            </div>
            </div>
  )
}

export default Search