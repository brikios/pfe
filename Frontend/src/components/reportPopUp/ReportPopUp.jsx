import React, { useState } from 'react'
import repProp from '../../../../Data/reportProperty.json';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from '@mui/base/TextareaAutosize/TextareaAutosize';

const ReportPopUp = ({setOpenReportPopUp,setShowSuccessPopUp,propertyId,currentUser}) => {
    const [repCase,setRepCase]=useState('')
    const [repCaseText,setRepCaseText]=useState('')
    const handleSubmit=()=>{
    try{
        axios.post('http://localhost:8800/report/addreport',{
          propertyId: propertyId,
          reason:repCase,
          description:repCaseText,

        })
    }catch(err){
        console.log(err)
    }}
    const handleOnClick=(event)=>{
        event.preventDefault();

        handleSubmit()
        setOpenReportPopUp(false)
        setShowSuccessPopUp(true)
      }
  return (
    <div className='popUp'>
    <div className="Pcontainer">
        
        <form className='formul' >
        <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenReportPopUp(false)} 
                />
          <p className='parag'>نقدر رأيكم! شاركونا تعليقاتكم على العقارات لمساعدتنا في تحسين تجربتكم وتقديم عروض أفضل بكثير. إن مساهمتكم قيّمة في صياغة تحسيناتنا المستقبلية.</p>
          <select type='text' 
          required 
                 className='headerSearchInput'
                 
                 onChange={e=>{setRepCase(e.target.value)}}
                 ><option selected disabled>إختر السبب</option>
                 {
                  repProp.map((repP) =>{
                    return(
                      <option value={repP.case} 
                      onChange={e=>{setRepCase(e.target.value)}}>
                        {repP.case}</option>
                    )
                 })}</select>
            
            <TextareaAutosize aria-label="empty textarea" placeholder="أكتب هنا التفاصيل" className='txtArea' onChange={(event)=>setRepCaseText(event.target.value)} />
            <button className='btnSub' type="submit" onClick={handleOnClick}>أرسل</button>
          </form>
    </div>
</div>
  )
}

export default ReportPopUp