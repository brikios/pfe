import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import useFetch2 from '../../hooks/useFetch2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Contract = () => {

        const[column,setColumn]=useState([])
        const[records,setRecords]=useState([])
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
  return (
    <div>
        <Navbar />
        <table>
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
            </tr>
            {records.map((list,index)=>(
                <tr>
                {list.client && (
              <>
                <td>{list.client.firstName}</td>
                <td>{list.client.lastName}</td>
                <td>{list.client.phone}</td>
              </>
            )}
            </tr>
            ))}
            
        </table>
    </div>
  )
}

export default Contract