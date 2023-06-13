    import React, { useEffect, useState } from 'react'
    import axios from  'axios'

    import './reports.css'
    const Reports = () => {
        const [dataProperty, setDataProperty] = useState([]); 
        const [dataUser, setDataUser] = useState([]); 
        const [propList,setPropList]=useState("")
        useEffect(() => {
            const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/report/typeUser');
                setDataUser(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
            };
            fetchData();
    }, []);
    const handleReports=(e,id,status)=>{
        e.preventDefault();
        try{
            axios.put(`http://localhost:8800/report/update`,{
                reportId:id,
                status:status
            })
            console.log("done")
        }catch(err){
            console.log(err)
        }
      }

      const handleUnBanUser=async (e,id,status)=>{
        e.preventDefault();
        try{
            axios.put(`http://localhost:8800/users/update/${id}`,{
                Banned:false
            })
            await handleReports(e,id,status)
        }catch(err){
            console.log(err)
        }
      }
      const handleDeleteProperty=async (e,id,propId,status)=>{
        e.preventDefault();
        try{
            axios.delete(`http://localhost:8800/property/delete/${propId}`,{
                Banned:false
            })
            await handleReports(e,id,status)
        }catch(err){
            console.log(err)
        }
      }
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8800/report/typeProperty');
            setDataProperty(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
        };
        fetchData();
}, []);
    
    return (
       <div>
        <div className='buttons'>
<button className="btnproperties" onClick={() => setPropList("properties")}>
        تقارير الملكيات
      </button>
      <br />
      <button className="btnAccounts" onClick={() => setPropList("user")}>
        تقارير الحسابات
      </button>       
      </div> {propList=="properties"?<div>
        <button className="btnproperties" onClick={() => setPropList("properties")}>
        تقارير الملكيات
      </button>
      <br />
      <button className="btnAccounts" onClick={() => setPropList("user")}>
        تقارير الحسابات
      </button>
            <table className="styled-table">
                <tr>
                    <td>
            إسم المبلغ
                    </td>   
                    
                    <td>
                         السبب
                    </td>
                    
                    <td>
                    أكثر تفاصيل
                    </td>
                    <td>الحالة</td>
                    <td>
                        قبول التقرير و فسخ الملكية
                    </td>
                    <td>
                        رفض التقرير
                    </td>
                    
                </tr>
            {dataProperty?.map((item) => (
            <tr className="active-row"> 
                <td>{item.user.firstName}</td>
                <td>{item.reason}</td>
                <td>{item.description}</td>
                <td>{item.status=="accepted" ?"مقبول":(item.status=="refused"?"غير مقبول":"معلق")}</td>
            {item.status=="draft" ? <td><button onClick={(e)=>handleDeleteProperty(e,item._id,item.property._id,"accepted")}>فسخ</button> </td>:<></>}
            {item.status=="draft" ?  <td><button onClick={(e)=>handleReports(e,item._id,"refused")}>رفض</button></td>:<></>}
            </tr>
        ))}
        </table>
        </div>:
        <div>
        <table className="styled-table">
            <tr>
                <td>
                 إسم صاحب التقرير
                </td>   
                <td>
                     المشتكى به
                </td>
                <td>
                    سبب
                </td>
                
                <td>
                    أكثر تفاصيل
                </td>
                <td>
                    الحالة
                </td>
                <td>
                    قبول التقرير و فسخ الملكية
                </td>
                <td>
                    رفض التقرير
                </td>
                
            </tr>
        {dataUser?.map((item) => (
        <tr className="active-row"> 
            <td>{item.user.firstName}</td>
            <td>{item.userReported?.firstName}</td>
            <td>{item.reason}</td>
            <td>{item.description}</td>
           
            <td>{item.status=="accepted" ?"مقبول":(item.status=="refused"?"غير مقبول":"معلق")}</td>
            {item.status=="draft" ? <td><button onClick={(e)=>handleUnBanUser(e,item._id,"accepted")}>حضر</button> </td>:<></>}
            {item.status=="draft" ?  <td><button onClick={(e)=>handleReports(e,item._id,"refused")}>رفض</button></td>:<></>}
           
        </tr>
    ))}
    </table>
    </div>
        }
        </div>
    )
    }

    export default Reports