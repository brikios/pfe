import React, { useContext, useState } from 'react'
import './editAccount.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { uploadCloudinary } from '../../utils/upload'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
const EditeAccount = ({setOpenEditAccountPopUp,currenUser}) => {


    const {user}=useContext(AuthContext)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [phone,setPhone] = useState(null)
    const navigate=useNavigate()
    const [images,setImages] = useState([])
    const [links,setLinks]= useState('')
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

        const updatedData = {};
        if (firstName !== '') {
            updatedData.firstName = firstName;
          }
          if (lastName !== '') {
            updatedData.lastName = lastName;
          }
          if (phone !== null) {
            updatedData.phone = phone;
          }
          if (links[0] !== '') {
            updatedData.img = links[0];
          }
        console.log(links)
        await axios.put(`http://localhost:8800/users/update/${user._id}`, updatedData);
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
                onClick={()=>setOpenEditAccountPopUp(false)} 
                />
          <p className='parag'>   إعدادات الحساب</p>
          <label className='lab'>إسم </label>
          <input type='text' className='inp' onChange={(e) => setFirstName(e.target.value)}/>
          <label className='lab'>لقب </label>
          <input type='text' className='inp' onChange={(e) => setLastName(e.target.value)}/>
          <label className='lab'> هاتف</label>
          <input type='text' className='inp' onChange={(e) => setPhone(e.target.value)}/>
            
            <label className='lab'>أضف صور</label>
            <input type="file"  onChange={(e)=>setImages(e.target.files)}/>
            <button className='btnSub' type="submit" >أرسل</button>
          </form>
    </div>
</div>
  )
}

export default EditeAccount