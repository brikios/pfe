import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { addContract } from '../../../../Backend/controllers/DemandController'
import './PopUpRes.css'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
const PopUpRes = ({setOpenPopUp,setShowSuccessPopUp,propertyId,currentUser}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {data,loading,error,refresh} = useFetch(`http://localhost:8800/property/get/${propertyId}`)
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
  setShowSuccessPopUp(true)
  };
  //console.log(data)
  return (
    <div className='popUp'>
        <div className="Pcontainer">
            <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenPopUp(false)} 
                />
            <form className='formul' onSubmit={handleSubmit}>
              <p className='parag'>بعد تقديم طلب الحجز وهو  يعتبر عقد مسبق سيتواصل معك مالك العقار لإكمال بقية الإجرائات في الإبان (العقد ليس  له أي صبغة قانونية فهو فقط لتنظيم و تسهيل الإجرائات للمالك )</p>
                  <label className='lab'>
                    تاريخ البداية : 
                    <input
                      type="date"
                      value={startDate}
                      className='date'
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </label>

                  <label className='lab'>
                    تاريخ النهاية :
                    <input
                      type="date"
                      value={endDate}
                      className='date'
                      onChange={(event) => setEndDate(event.target.value)}
                      min={startDate}
                    />
                  </label>

                  <button className='btnSub' type="submit" >طلب الحجز</button>
              </form>
        </div>
    </div>
  )
}

export default PopUpRes