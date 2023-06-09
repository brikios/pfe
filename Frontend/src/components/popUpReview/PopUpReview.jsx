import React, { useContext, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './popUpReview.css'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
const PopUpReview = ({setOpenPopUpReview,setShowSuccessPopUp,propertyId,currentUser}) => {
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const {user,refreshToken}=useContext(AuthContext)
      const handleRating = (rate) => {
        setRating(rate)
      }
      const handleSubmit = async () => {
        console.log(propertyId)
        console.log(rating)
        console.log(reviewText)
        try{
        axios.post('http://localhost:8800/review/addReview',{
          propertyId: propertyId,
          rating:rating,
          reviewText:reviewText,
        })
        refreshToken(user)
        //console.log(response.data);;
      }catch(error){
        console.log(error)
      }
      };

      const handleOnClick=(event)=>{
        event.preventDefault();

        handleSubmit()
        setOpenPopUpReview(false)
        setShowSuccessPopUp(true)
      }
  return (
    <div className='popUp'>
    <div className="Pcontainer">
        
        <form className='formul' >
        <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenPopUpReview(false)} 
                />
          <p className='parag'>نقدر رأيكم! شاركونا تعليقاتكم على العقارات لمساعدتنا في تحسين تجربتكم وتقديم عروض أفضل بكثير. إن مساهمتكم قيّمة في صياغة تحسيناتنا المستقبلية.</p>
          <Rating onClick={handleRating} initialValue={rating} />
            
            <TextareaAutosize aria-label="empty textarea" placeholder="أكتب هنا" className='txtArea' onChange={(event)=>setReviewText(event.target.value)} />
            <button className='btnSub' type="submit" onClick={handleOnClick}>أرسل</button>
          </form>
    </div>
</div>
  )
}

export default PopUpReview