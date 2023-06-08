import React, { useContext, useEffect, useState } from 'react';
import './adsPopUp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdsPopUp = ({ setOpenPopUpAds, setShowSuccessPopUp, propertyId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysBetween, setDaysBetween] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate()
  const { user,refreshToken } = useContext(AuthContext);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    const differenceMs = Math.abs(end - start);
    const days = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    setDaysBetween(days);

    if (days > user.adsTokens) {
      setButtonState(true);
      setErrorMessage(`عدد الأيام يجب أن يكون أقل من أو يساوي ${user.adsTokens}`);
    } else {
      setButtonState(false);
      setErrorMessage('');
    }
  }, [startDate, endDate, user.adsTokens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (daysBetween > user.adsTokens) {
      setErrorMessage(`عدد الأيام يجب أن يكون أقل من أو يساوي ${user.adsTokens}`);
    } else {
      try {
        axios.post('http://localhost:8800/advertise/createAd', {
          propertyId: propertyId,
          startDate: startDate,
          endDate: endDate,
        });

        const updatedTokens = user.adsTokens - daysBetween;

        await axios.put(`http://localhost:8800/users/updateUserAdsToken/${user._id}`, {
        adsTokens: updatedTokens,
      });
      refreshToken(user);
        setShowSuccessPopUp(true);
        setOpenPopUpAds(false);

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className='popUp'>
      <div className='Pcontainer'>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className='iconXmark'
          onClick={() => setOpenPopUpAds(false)}
        />
        <form className='formul'>
          <p className='parag'>
            اجذب انتباه العالم إلى ملكيتك مع إعلانات مبتكرة ومؤثرة تعزز تجربة المستخدم وتزيد من نجاحه.
          </p>
          <p className='parag'> في رصيدك عدد {user.adsTokens} من أيام للإشهار </p>
          <label className='lab'>
            تاريخ بداية الإعلان:
            <input
              type='date'
              value={startDate}
              className='date'
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          <label className='lab'>
            تاريخ نهاية الإعلان:
            <input
              type='date'
              value={endDate}
              className='date'
              onChange={(event) => setEndDate(event.target.value)}
              min={startDate}
            />
          </label>

          {errorMessage && <span style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
           className='error'>{errorMessage} إذا أردت شراء tokens 
           <a style={{ color: 'black',fontWeight:'bold', cursor: 'pointer' }}
            className='tokensLink' onClick={()=>navigate('/package')}>إضغط هنا</a></span>}

          <button disabled={buttonState} onClick={handleSubmit} className='btnSub' type='submit'>
            طلب الحجز
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdsPopUp;
