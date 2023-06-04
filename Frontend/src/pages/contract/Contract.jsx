import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import useFetch2 from '../../hooks/useFetch2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './contract.css'
import { set } from 'mongoose'
const Contract = () => {

        const[myPropertyContract,setMyPropertyContract]=useState(true);
        const[records,setRecords]=useState([])
        const[recordsClient,setRecordsClients]=useState([])
        const {user}=useContext(AuthContext)
        //const {data,loading,ref,err}=useFetch(`http://localhost:8800/contract/getowner/${user._id}`)
        //const {data2,loading2,ref2,err2}=useFetch2(`http://localhost:8800/contract/getclient/${user._id}`)
        const navigate=useNavigate()
        useEffect(()=>{
            if(user && !user.isConfirmed){
              navigate('/confirm')
            }
          },[])
          useEffect(()=>{
            if(user==null){
              navigate('/login')
            }
          },[])
        useEffect(()=>{
            const fetchDataClient = async()=>{
                try{
                    const res = await axios.get(`http://localhost:8800/contract/getowner/${user._id}`)
                    setRecords(res.data)
                }catch{
                    console.log(err)
                }
            }
            fetchDataClient()
        },[])
        useEffect(()=>{
          const fetchDataOwner = async()=>{
              try{
                  const res = await axios.get(`http://localhost:8800/contract/getclient/${user._id}`)
                  setRecordsClients(res.data)
              }catch{
                  console.log(err)
              }
          }
          fetchDataOwner()
      },[])
      
      const className = myPropertyContract ? 'isActive' : 'inactive';
      const className2 = !myPropertyContract ? 'isAactive' : 'inactive';

  return (
    <div>
        <Navbar />
        <button className={className} onClick={()=>setMyPropertyContract(true)} >عقود عقاراتي</button><br/>
        <button className={className2} onClick={()=>setMyPropertyContract(false)}>عقودي المقترجين</button>
        {myPropertyContract ? (<table className="styled-table">
            <tr>
                <td>
                    إسم 
                </td>   
                <td>
                    لقب
                </td>
                <td>
                    هاتف
                </td>
                <td>
                    الملكية
                </td>
                <td>
                    تاريخ بداية العقد
                </td>
                <td>
                    تاريخ نهاية العقد
                </td>
                <td>
                    الحالة
                </td>
                <td>
                    تغيير
                </td>
                <td>
                    تواصل
                </td>
                <td>
                    تحميل
                </td>
            </tr>
            {records.map((list,index)=>(
                <tr className="active-row">
                {list.client && (
              <>
                <td>{list.client.firstName}</td>
                <td>{list.client.lastName}</td>
                <td>{list.client.phone}</td>
                <td>{list.propertyId.title}</td>
                <td>{list.startDate.split("T")[0]}</td>
                <td>{list.endDate.split("T")[0]}</td>
                <td>{list.status}</td>
                <td><button className='btnModify'>تغيير</button></td>
                <td><button className='btnContact'>تواصل</button></td>
                <td><button className='btnDownload'>تحميل</button></td>
              </>
            )}
            </tr>
            ))}
            
        </table>):(<table className="styled-table">
            <tr>
                <td>
                    إسم 
                </td>   
                <td>
                    لقب
                </td>
                <td>
                    هاتف
                </td>
                <td>
                    الملكية
                </td>
                <td>
                    تاريخ بداية العقد
                </td>
                <td>
                    تاريخ نهاية العقد
                </td>
                <td>
                    الحالة
                </td>
                
                <td>
                    تواصل
                </td>
                <td>
                    تحميل
                </td>
            </tr>
            {recordsClient.map((list,index)=>(
                <tr className="active-row">
                {list?.client && (
              <>
                <td>{list.owner.firstName}</td>
                <td>{list.owner.lastName}</td>
                <td>{list.owner.phone}</td>
                <td>{list.propertyId.title}</td>
                <td>{list.startDate.split("T")[0]}</td>
                <td>{list.endDate.split("T")[0]}</td>
                <td>{list.status}</td>
               
                <td><button className='btnContact'>تواصل</button></td>
                <td><button className='btnDownload'>تحميل</button></td>
              </>
            )}
            </tr>
            ))}
            
        </table>)}
    </div>
  )
}

export default Contract