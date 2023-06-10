import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from '@mui/base/TextareaAutosize/TextareaAutosize'
import React, { useContext, useState } from 'react'
import propTypes from './../../../../Data/propTypes.json'
import Citiest from './../../../../Data/gov.json'
import './addPropertyPopUp.css'
import axios from 'axios'
import { uploadCloudinary } from '../../utils/upload'
const AddPropertyPopUp = ({setOpenAddPropertyPopUp,currentUser}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [typeProp,setTypeProp] = useState('')
    const [city,setCity] = useState('')
    const [images, setImages] = useState([]);
    const [price,setPrice] = useState(null)
    const [adress,setAdress] = useState('')
    
    const [links,setLinks]= useState([])
    const uploadImages = async () => {
      try {
        let arr = [];
        for (let i = 0; i < images.length; i++) {
          const data = await uploadCloudinary(images[i]);
          arr.push(data.url);
        }
        return arr;
      } catch (err) {
        console.log(err);
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const links = await uploadImages();
    
        await axios.post('http://localhost:8800/property/add', {
          title: title,
          description: description,
          type: typeProp,
          city: city,
          images: links,
          price: price,
          adress:adress
        });
        window.location.reload();
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
          <label className='lab'> العنوان</label>
          <input type='text' className='inp' onChange={(e) => setAdress(e.target.value)}/>
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
            <input type="file" multiple  onChange={(e)=>setImages(e.target.files)}/>
            <button className='btnSub' type="submit" >أرسل</button>
          </form>
    </div>
</div>
  )
}

export default AddPropertyPopUp