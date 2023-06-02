import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import './editPropertyPopUp.css'
import TextareaAutosize from '@mui/base/TextareaAutosize/TextareaAutosize';
import propTypes from './../../../../Data/propTypes.json'
import Citiest from './../../../../Data/gov.json'
import axios from 'axios'
import useFetch from '../../hooks/useFetch';
const EditPropertyPopUp = ({setOpenEditPropertyPopUp,propertyId}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [typeProp,setTypeProp] = useState('')
    const [city,setCity] = useState('')
    const [price,setPrice] = useState(null)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    const{data,error,refresh}=useFetch(`http://localhost:8800/property/get/${propertyId}`)
  return (
    <div className='popUp'>
    <div className="Pcontainer">
        
        <form className='formul'>
        <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenEditPropertyPopUp(false)} 
                />
          <p className='parag'>   لتعديل ملكية يجب عليك ملء هذه الاستمارة</p>
          <label className='lab'>إسم الملكية</label>
          <input type='text' className='inp' defaultValue={data.title} onChange={(e) => setTitle(e.target.value)}/>
            <label className='lab'>إختر نوع العقار</label>
                <select className='slct'  onChange={(e)=>setTypeProp(e.target.value)}>
                    <option className='opt' disabled > نوع العقار</option>
                {propTypes.map((getProp) =>{
            return(
                    <option onChange={(e)=>setTypeProp(e.target.value)} defaultValue={data.type}>{getProp.prop}</option>
                    )
                })}
                </select>
           
          <label className='lab'>إحتر الولاية</label>
          <select className='slct' onChange={(e)=>setCity(e.target.value)}>
                    <option className='opt' disabled selected> الولاية </option>
                {Citiest.map((city) =>{
            return(
                    <option onChange={(e)=>setCity(e.target.value)} defaultValue={data.city}>{city.Gouvernorat}</option>
                    )
                })}
                </select>
          
          <label className='lab'>مبلغ الإيجار الشهري</label>
          <input className='inp'  type='number' defaultValue={data.price} onChange={(e)=>setPrice(e.target.value)} />
          <label className='lab'>اضف التفاصيل هنا</label>
            <TextareaAutosize aria-label="empty textarea" defaultValue={data.description} placeholder="أكتب هنا التفاصيل" className='txtArea' onChange={(e) =>setDescription(e.target.value)} />
            
            
            <button className='btnSub' type="submit" >أرسل</button>
          </form>
    </div>
</div>
  )
}

export default EditPropertyPopUp