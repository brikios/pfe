import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAd, faChartArea, faChartGantt, faHandPaper, faHandshake, faHome, faMoneyBill1Wave, faPager, faPaperPlane, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from  'axios'
import './stats.css'
const Stats = () => {
  const [dataUser, setDataUser] = useState(); 
  const [dataContract,setDataContract] = useState()
  const [dataReport,setDataReport] = useState()
  const [dataProperties,setDataProperties] = useState()
  const [dataAdvertise,setDataAdvertise] = useState()
  const [revenue,setRevenue] = useState(0)
 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8800/users/getall');
            setDataUser(response.data.length);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/admin/get');
        const { revenue } = response.data;
        setRevenue(revenue);
        console.log(revenue);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/property/getallpropeties');
        setDataProperties(response.data.length);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/contract/getall');
        setDataContract(response.data.length);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/report/get');
      setDataReport(response.data.length);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/advertise/getall');
      setDataAdvertise(response.data.length);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);


  return (
    <div>
        <div className="content">
      <div className="stats">
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faUser} /><br />
          <h2>المستخدمون</h2>
          <p>{dataUser}</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faHome} /><br />
          <h2>الملكيات</h2>
          <p>{dataProperties}</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faMoneyBill1Wave} /><br />
          <h2>المداخيل</h2>
          <p>{revenue} دت</p>
        </div>
      </div>
    </div>
    <div className="content">
      <div className="stats">
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faHandshake} /><br />
          <h2>عملية كراء</h2>
          <p>{dataContract}</p>
        </div>
        <div className="stat">
        <FontAwesomeIcon className='font' icon={faPaperPlane} /><br />
          <h2>تقارير</h2>
          <p>{dataReport}</p>
        </div>
        <div className="stat">
          <FontAwesomeIcon className='font' icon={faAd} /><br />
          <h2>عمليت إشهار</h2>
          <p>{dataAdvertise}</p>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default Stats