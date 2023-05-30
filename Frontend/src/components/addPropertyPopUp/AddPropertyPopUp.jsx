import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from '@mui/base/TextareaAutosize/TextareaAutosize'
import React from 'react'
import propTypes from './../../../../Data/propTypes.json'
import Citiest from './../../../../Data/gov.json'
import './addPropertyPopUp.css'
const AddPropertyPopUp = ({setOpenAddPropertyPopUp}) => {
    
  return (
    <div className='popUp'>
    <div className="Pcontainer">
        
        <form className='formul' >
        <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenAddPropertyPopUp(false)} 
                />
          <p className='parag'>   لإضافة ملكية يجب عليك ملء هذه الاستمارة</p>
          <label className='lab'>إسم الملكية</label>
          <input type='text' className='inp'/>
            <label className='lab'>إختر نوع العقار</label>
                <select className='slct'>
                    <option className='opt' disabled selected> نوع العقار</option>
                {propTypes.map((getProp) =>{
            return(
                    <option value={getProp.prop}>{getProp.prop}</option>
                    )
                })}
                </select>
           
          <label className='lab'>إحتر الولاية</label>
          <select className='slct'>
                    <option className='opt' disabled selected> الولاية </option>
                {Citiest.map((city) =>{
            return(
                    <option value={city.Gouvernorat}>{city.Gouvernorat}</option>
                    )
                })}
                </select>
          <input className='inp' type='text' />
          <label className='lab'>مبلغ الإيجار الشهري</label>
          <input className='inp'  type='number' />
          <label className='lab'>اضف التفاصيل هنا</label>
            <TextareaAutosize aria-label="empty textarea" placeholder="أكتب هنا التفاصيل" className='txtArea' onChange={(event)=>setRepCaseText(event.target.value)} />
            <button className='btnSub' type="submit" >أرسل</button>
            <label className='lab'>أضف الصور</label>
            <input type="file" multiple/>
          </form>
    </div>
</div>
  )
}

export default AddPropertyPopUp