import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useState } from 'react'

const EditContractPopUp = ({setOpenPopUp,contractId}) => {
  const [contractState,setContractState]=useState('')
  const handleSubmit=(e)=>{
    console.log(contractId)
    try{
      axios.put(`http://localhost:8800/contract/update/${contractId}`,{
        status:contractState,
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='popUp'>
        <div className="Pcontainer">
            <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenPopUp(false)} 
                />
            <form className='formul' onSubmit={handleSubmit}>
              <p className='parag'>أجرِ تغييرات على حالة العقد لضمان التوافق مع التغيرات الحالية أو لتحقيق الهدف المطلوب في العقد.</p>
                  <label className='lab'>
                    <select value={contractState} onChange={(e)=>setContractState(e.target.value)}  name="" id="">
                      <option value="accepted">accepted</option>
                      <option value="canceled">cancelled</option>
                      </select> 
                   
                  </label>
                  <button className='btnSub' type="submit" >طلب الحجز</button>
              </form>
        </div>
    </div>
  )
}

export default EditContractPopUp