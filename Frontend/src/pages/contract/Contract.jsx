import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import './contract.css';
import EditContractPopUp from '../../components/editContractPopUp/EditContractPopUp';


const Contract = () => {
  const [myPropertyContract, setMyPropertyContract] = useState(true);
  const [records, setRecords] = useState([]);
  const [recordsClient, setRecordsClients] = useState([]);
  const [openPopUp,setOpenPopUp]=useState(false)
  const [contractId,setContractId]=useState('')
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isConfirmed) {
      navigate('/confirm');
    }
  }, []);
  useEffect(()=>{
    if(user && user.Banned){
      navigate('/Banned')
    }
  },[])
  useEffect(() => {
    if (user == null) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchDataClient = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/contract/getowner/${user._id}`);
        setRecords(res.data);
      } catch {
        console.log(err);
      }
    };
    fetchDataClient();
  }, []);

  useEffect(() => {
    const fetchDataOwner = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/contract/getclient/${user._id}`);
        setRecordsClients(res.data);
      } catch {
        console.log(err);
      }
    };
    fetchDataOwner();
  }, []);



  const className = myPropertyContract ? 'isActive' : 'inactive';
  const className2 = !myPropertyContract ? 'isAactive' : 'inactive';

  const generatePdf = (ownerName, clientName, address, startDate, endDate, price) => {
    
    const doc = new jsPDF();
    
    
    doc.setFontSize(15);

    
    const contractContent = `
    Rental contract for properties between Mr./Mrs. ${ownerName}, hereinafter 
    referred to as "Owner", and Mr./Mrs. ${clientName}, hereinafter referred 
    to as "Client".

    The following has been agreed upon:
    
    Article 1: Subject
    The following property is being leased:
    Property Address: ${address}
    
    Article 2: Rental Period
    This contract starts on ${startDate} and continues until ${endDate}.
    
    Article 3: Rent
    The Client undertakes to pay a rental amount of ${price} TND.
    
    Article 4: Financial Guarantee
    The Client undertakes to pay an agreed-upon amount as a financial guarantee,
    which will be refunded upon the contract's termination and after confirming 
    the property's condition.
    
    Article 5: Use
    The Client must use the property for residential purposes only and refrain 
    from using it for any commercial or illegal purposes.
    
    Article 6: Signature
    The parties hereby sign this contract on ......................
    
    Owner: ${ownerName}                                                       Client: ${clientName}
    `;
          doc.text(contractContent, 10, 10,{ lang: 'ar' });
          doc.save('arabic-pdf.pdf');

  };

  return (
    <div>
      <Navbar />
      <button className={className} onClick={() => setMyPropertyContract(true)}>
        عقود عقاراتي
      </button>
      <br />
      <button className={className2} onClick={() => setMyPropertyContract(false)}>
        عقودي المقترجين
      </button>
      {myPropertyContract ? (
        <table className="styled-table">
          <tr>
            <td>إسم</td>
            <td>لقب</td>
            <td>هاتف</td>
            <td>الملكية</td>
            <td>تاريخ بداية العقد</td>
            <td>تاريخ نهاية العقد</td>
            <td>الحالة</td>
            <td>تغيير</td>
            <td>تواصل</td>
            <td>تحميل</td>
          </tr>
          {records.map((list, index) => (
            <tr className="active-row">
              {list.client && (
                <>
                  <td>{list.client.firstName}</td>
                  <td>{list.client.lastName}</td>
                  <td>{list.client.phone}</td>
                  <td>{list.propertyId.title}</td>
                  <td>{list.startDate.split('T')[0]}</td>
                  <td>{list.endDate.split('T')[0]}</td>
                  <td>{list.status}</td>
                  <td>
                    {list.status == 'draft' || list.status == 'accepted' ? (
                      <button className="btnModify" onClick={()=>setOpenPopUp(true)&setContractId(list._id)}>تغيير</button>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td>
                    <button
                      className="btnContact"
                      onClick={() => navigate(`/account/${list.client._id}`)}
                    >
                      تواصل
                    </button>
                  </td>
                  <td>
                    <button
                      className="btnDownload"
                      onClick={() =>
                        generatePdf(
                          list.owner.firstName,
                          list.client.firstName,
                          list.address,
                          list.startDate.split('T')[0],
                          list.endDate.split('T')[0],
                          list.price
                        )
                      }
                    >
                      تحميل
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </table>
      ) : (
        <table className="styled-table">
          <tr>
            <td>إسم</td>
            <td>لقب</td>
            <td>هاتف</td>
            <td>الملكية</td>
            <td>تاريخ بداية العقد</td>
            <td>تاريخ نهاية العقد</td>
            <td>الحالة</td>
            <td>تواصل</td>
            <td>تحميل</td>
          </tr>
          {recordsClient.map((list, index) => (
            <tr className="active-row">
              {list?.client && (
                <>
                  <td>{list.owner.firstName}</td>
                  <td>{list.owner.lastName}</td>
                  <td>{list.owner.phone}</td>
                  <td>{list.propertyId.title}</td>
                  <td>{list.startDate.split('T')[0]}</td>
                  <td>{list.endDate.split('T')[0]}</td>
                  <td>{list.status}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/account/${list.owner._id}`)}
                      className="btnContact"
                    >
                      تواصل
                    </button>
                  </td>
                  <td>
                  <button
                      className="btnDownload"
                      onClick={() =>
                        generatePdf(
                          list.owner.firstName,
                          list.client.firstName,
                          list.address,
                          list.startDate.split('T')[0],
                          list.endDate.split('T')[0],
                          list.price
                        )
                      }
                    >
                      تحميل
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </table>
      )}
      {openPopUp && <EditContractPopUp setOpenPopUp={setOpenPopUp} contractId={contractId} />}
    </div>
  );
};

export default Contract;
