import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import './PopUpRes.css';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { io } from 'socket.io-client';

const PopUpRes = ({ setOpenPopUp, setShowSuccessPopUp, propertyId, currentUser, senderName, socket }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dates, setDates] = useState([]);
  const { data, loading, error, refresh } = useFetch(`http://localhost:8800/property/get/${propertyId}`);
  const { user } = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/contract/getDates/${propertyId}`);
        setDates(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDates();
  }, [propertyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const overlap = dates.some(
        (date) => new Date(startDate) <= new Date(date.endDate) && new Date(endDate) >= new Date(date.startDate)
      );

      if (overlap) {
        setIsButtonDisabled(true);
        return;
      }

      axios.post('http://localhost:8800/contract/addContract', {
        propertyId: propertyId,
        startDate: startDate,
        endDate: endDate,
      });
    } catch (error) {
      console.log(error);
    }
    setShowSuccessPopUp(true);
    setOpenPopUp(false);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setIsButtonDisabled(false); 
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setIsButtonDisabled(false); 
  };

  const filteredDates = dates.filter((date) => new Date(date.startDate) >= new Date());

  return (
    <div className='popUp'>
      <div className='Pcontainer'>
        <FontAwesomeIcon icon={faCircleXmark} className='iconXmark' onClick={() => setOpenPopUp(false)} />
        <form className='formul' onSubmit={handleSubmit}>
          <p className='parag'>
            بعد تقديم طلب الحجز وهو يعتبر عقد مسبق سيتواصل معك مالك العقار لإكمال بقية الإجرائات في الإبان
            (العقد ليس له أي صبغة قانونية فهو فقط لتنظيم وتسهيل الإجرائات للمالك)
          </p>
          <label className='lab'>
            محجوزة في:
            {filteredDates.map((date) => (
              <div>
              <span key={date._id}>{date.startDate.split("T")[0]} - {date.endDate.split("T")[0]}</span><br/>
              </div>
            ))}
          </label>
          <label className='lab'>
            تاريخ البداية:
            <input type='date' value={startDate} className='date' onChange={handleStartDateChange} />
          </label>
          <label className='lab'>
            تاريخ الانتهاء:
            <input
              type='date'
              value={endDate}
              className='date'
              onChange={handleEndDateChange}
              min={startDate}
            />
          </label>
          <button className='btnSub' type='submit' disabled={isButtonDisabled}>
            طلب الحجز
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUpRes;
