import React, { useEffect, useState } from 'react'
import axios from  'axios'
import './users.css'
const Users = () => {
    const [data, setData] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8800/users/getall');
            setData(response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
  }, []);
  const handleBanUser=(e,id)=>{
    e.preventDefault();
    try{
        axios.put(`http://localhost:8800/users/update/${id}`,{
            Banned:true
        })
        console.log("done")
    }catch(err){
        console.log(err)
    }
  }
  const handleUnBanUser=(e,id)=>{
    e.preventDefault();
    try{
        axios.put(`http://localhost:8800/users/update/${id}`,{
            Banned:false
        })
        console.log("done")
    }catch(err){
        console.log(err)
    }
  }
  
  return (
    <div>
        <table className="styled-table">
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
                    البريد الالكتروني
                </td>
                <td>
                    الحالة
                </td>
                <td>
                    تغيير
                </td>
                
            </tr>
        {data.map((item) => (
        <tr className="active-row"> 
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.isConfirmed ?"موثق":"غير موثق"}</td>
            <td>{item.Banned ?"محضور":"غير محضور"}</td>
            {!item.Banned ?<button onClick={(e)=>handleBanUser(e, item._id)} classNmae='btnModify'>حضر</button>:<button onClick={(e)=>handleUnBanUser(e, item._id)} classNmae='btnModify'>تغيير</button> }
            
        </tr>
      ))}
      </table>
    </div>
  )
}

export default Users