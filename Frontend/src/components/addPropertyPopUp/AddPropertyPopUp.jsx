import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from '@mui/base/TextareaAutosize/TextareaAutosize'
import React, { useContext, useState } from 'react'
import propTypes from './../../../../Data/propTypes.json'
import Citiest from './../../../../Data/gov.json'
import './addPropertyPopUp.css'
import axios from 'axios'
const AddPropertyPopUp = ({setOpenAddPropertyPopUp,currentUser}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [typeProp,setTypeProp] = useState('')
    const [city,setCity] = useState('')
    const [images, setImages] = useState([]);
    const [price,setPrice] = useState(null)
    
    
    
    const handleImageChange = (e) => {
      const files = e.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      setImages(formData);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('title', title);
      data.append('description', description);
      data.append('type', typeProp);
      data.append('city', city);
      data.append('images', images);
      data.append('price', price);
  
      try {
        await axios.post('http://localhost:8800/property/add', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className='popUp'>
    <div className="Pcontainer">
        
        <form className='formul' onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenAddPropertyPopUp(false)} 
                />
          <p className='parag'>   لإضافة ملكية يجب عليك ملء هذه الاستمارة</p>
          <label className='lab'>إسم الملكية</label>
          <input type='text' className='inp' onChange={(e) => setTitle(e.target.value)}/>
            <label className='lab'>إختر نوع العقار</label>
                <select className='slct' onChange={(e)=>setTypeProp(e.target.value)}>
                    <option className='opt' disabled selected> نوع العقار</option>
                {propTypes.map((getProp) =>{
            return(
                    <option onChange={(e)=>setTypeProp(e.target.value)} defaultValue={getProp.prop}>{getProp.prop}</option>
                    )
                })}
                </select>
           
          <label className='lab'>إحتر الولاية</label>
          <select className='slct' onChange={(e)=>setCity(e.target.value)}>
                    <option className='opt' disabled selected> الولاية </option>
                {Citiest.map((city) =>{
            return(
                    <option onChange={(e)=>setCity(e.target.value)} value={city.Gouvernorat}>{city.Gouvernorat}</option>
                    )
                })}
                </select>
          
          <label className='lab'>مبلغ الإيجار الشهري</label>
          <input className='inp'  type='number' onChange={(e)=>setPrice(e.target.value)} />
          <label className='lab'>اضف التفاصيل هنا</label>
            <TextareaAutosize aria-label="empty textarea" placeholder="أكتب هنا التفاصيل" className='txtArea' onChange={(e) =>setDescription(e.target.value)} />
            
            <label className='lab'>أضف الصور</label>
            <input type="file" multiple onChange={handleImageChange}/>
            <button className='btnSub' type="submit" >أرسل</button>
          </form>
    </div>
</div>
  )
}

export default AddPropertyPopUp