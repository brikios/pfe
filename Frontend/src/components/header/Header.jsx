import React from 'react'
import './Header.css'
import { faBuilding, faHouse,faListUl, faLocation, faMoneyBill, faPersonSwimming, faSearch, faStore, faTree, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Records  from '../../../../Data/gov.json';
import Proper from '../../../../Data/propTypes.json';
export const Header = ({type}) => {
  const [destination ,setDestination] = useState('')
  const [propType ,setPropType] = useState('')
  const [maxPrice ,setMaxPrice] = useState('')

  const navigate =useNavigate()
  const handleSearch =()=>{
    navigate("/properties",{state:{destination,propType,maxPrice}})
  }

  return (
    <div className='header'>
      <div className={type =='properties' ? 'headerContainer propertiesMode':'headerContainer'} >
        <div className="headerList">
          <div className="headerListItem  active" >
            <FontAwesomeIcon icon={faHouse} />
            <span>منازل</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBuilding} />
            <span>شقق</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faWarehouse} />
            <span>مستودعات</span>    
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTree} />
            <span>أراضي</span>            
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faStore} />
            <span>محلات تجارية</span>            
            </div>
        </div>
        { type !=='properties' &&
          <>
        <h1 className="headerTitle">نقدم لك أحسن العروض لإستئجار مرفق جيد</h1>
        <p className="headerDescription">أحصل على أحسن الأسعار لقضاء عطلة سعيدة أو لإستئجار مرفق لعملك الجديد معنا على موقعنا </p>
        <button className="headerButton"> إشترك أو سجل الدخول</button>
        <div className="headerSearch">
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faLocation}  className='headerIcon' />
          <select type='text' 
                 placeholder='إلي أين أنت ذاهب ؟' 
                 className='headerSearchInput'
                 onChange={e=>{setDestination(e.target.value)}}
                 ><option selected disabled>إختر المكان</option>
                 {
                  Records.map((getGov) =>{
                    //console.log(getGov.Gouvernorat)
                    return(
                      <option value={getGov.Gouvernorat} 
                      onChange={e=>{setDestination(e.target.value)}}>
                        {getGov.Gouvernorat}</option>
                    )
                 })}</select>
          
        </div>
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faSearch}  className='headerIcon' />
        <select type='text' 
                 placeholder='إلي أين أنت ذاهب ؟' 
                 className='headerSearchInput'
                 onChange={e=>{setPropType(e.target.value)}}
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
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faMoneyBill}  className='headerIcon' />
          <input type='number' 
                 placeholder='المبلغ الأقصى '
                 className='headerSearchInput'
                 onChange={e=>{setMaxPrice(e.target.value)}}
                 />
          
        </div>
        <div className="headerSearchItem">
          <button className='headerSearchItemButton' onClick={handleSearch}>إبحث</button>
        </div>
        </div>
        </>}
        </div>
    </div>
  )
}

