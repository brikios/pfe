import React from 'react'
import './search.css'
import { useLocation } from 'react-router-dom';
import Records  from '../../../../Data/gov.json';
import Proper from '../../../../Data/propTypes.json';
import PropertyItemSearch from "../../components/propertyItemSearch/PropertyItemSearch";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const [destination ,setDestination] = useState('')
  const [propType ,setPropType] = useState('')
  const [maxPrice ,setMaxPrice] = useState('')
  const location = useLocation()
  const navigate=useNavigate();
  const handleSearch =()=>{
    navigate("/properties",{state:{destination,propType,maxPrice}})
  }
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
                              >
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
                                >
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
                          <label htmlFor="">أعلى سعر</label>
                          <input type="number" defaultValue={location.state.maxPrice}  onChange={e=>{setMaxPrice(e.target.value)}}/>
                        </div>
                        <button onClick={handleSearch}>إبحث</button>
                    </div>
                    <div className="propertiesResult"></div>
                </div>
                <div className="propertiesResult">
                <PropertyItemSearch />
                <PropertyItemSearch />
                <PropertyItemSearch />
                <PropertyItemSearch />
            </div>
            </div>
  )
}

export default Search