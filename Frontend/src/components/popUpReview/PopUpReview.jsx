import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './popUpReview.css'
import useFetch from '../../hooks/useFetch';
const PopUpReview = ({setOpenPopUpReview,propertyId,currentUser}) => {
    const [rating, setRating] = useState(0)
      const handleRating = (rate) => {
        setRating(rate)
      }
      const {data,loading,error,refresh} = useFetch (`http://localhost:8800/property/get/${propertyId}`)
      const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
        axios.post('http://localhost:8800/contract/addContract',{
          propertyId: propertyId,
          startDate:startDate,
          endDate:endDate,
        })
        //console.log(response.data);;
      }catch(error){
        console.log(error)
      }
      };
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
            <p>{rating}</p>
                <TextareaAutosize aria-label="empty textarea" placeholder="أكتب هنا" className='txtArea' />
            <button className='btnSub' type="submit">أرسل</button>
          </form>
    </div>
</div>
  )
}

export default PopUpReview