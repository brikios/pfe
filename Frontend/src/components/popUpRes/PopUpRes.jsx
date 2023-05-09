import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { createContract } from '../../../../Backend/controllers/ContractContoller'

const PopUpRes = ({setOpenPopUp,propertyId,currentUser}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createContract({
        property: propertyId,
        startDate,
        endDate,
      });

      console.log(response.data); // or do something else with the created contract
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='popUp'>
        <div className="Pcontainer">
            <FontAwesomeIcon icon={faCircleXmark}
                className='iconXmark'
                onClick={()=>setOpenPopUp(false)} 
                />
            <form onSubmit={handleSubmit}>
                  <label>
                    Start date:
                    <input
                      type="date"
                      value={startDate}
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </label>

                  <label>
                    End date:
                    <input
                      type="date"
                      value={endDate}
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </label>

                  <button type="submit">Book</button>
              </form>
        </div>
    </div>
  )
}

export default PopUpRes