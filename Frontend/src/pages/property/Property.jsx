import React, { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import './property.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
//import { useState } from "react";
const property = () =>{

    const [slideNumber,setSlideNumber]=useState(0);
    const [openImg,setOpenImg]=useState(false);
    const handleOpenImg=(index)=>{
        setSlideNumber(index);
        setOpenImg(true);   
    }
    const photo = [
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905025.jpg?k=b748235a7579600ef1c6af72ee808cc559e1d57f475443971b77e47de77c5161&o=&hp=1"
        },
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905470.jpg?k=a6564e442fce9b80aee8593bcb23a466db89954d35eab07818608d4683f5cf82&o=&hp=1"
        },
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905118.jpg?k=8e8fdb1db5b5133bfdf0843fc9b8b2242240dc0e7647744c77bab0348c3a6b39&o=&hp=1"
        },
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905157.jpg?k=f09fa338e6706491518cb7bcb2331236a19733becf774a276211805eb9d23551&o=&hp=1"
        },
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905168.jpg?k=374b610f5cfecd98f9e79dfa994e03eeabe5dc6b6a4b2a2ce89aa434ad073c7d&o=&hp=1"
        },
        {
            "src":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/68905043.jpg?k=dda378f4daf5fddaccb48c726ab2bc7e6afaf691188ca1329beb95bd6408a2d6&o=&hp=1"
        }
    ]

    const handleImgChange= (direction)=>{
            let newSlideNumber;

            if(direction==="l")
            {
                newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
            }else{
                newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1

            }
            setSlideNumber(newSlideNumber)
    }
    return(
        <div>
            <Navbar />
            <Header type="properties"/>
            <div className="propertyContainer">
                {openImg && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className="exit" onClick={()=>setOpenImg(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleImgChange('r')}/>                  
                    <div className="sliderWrapper">
                        <img src={photo[slideNumber].src} alt="" className="sliderImg"  />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleImgChange('l')}/>
                </div>}
                <div className="propertyWrapper">
                    <h1 className="propertyTitle">دار بن بلقاسم</h1>
                    <div className="propertyAdress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>43 نهج عمر بن عبد العزيزة سبيطلة</span>
                    </div>
                    <span className="propertySubTitle">إحجز الان بأفضل الأسعار و يمكنك إلغاء الحجز لاحقا</span>
                    <div className="propertyImages">
                        {photo.map((img,index)=>(
                            <div className="propertyImageWrapper">
                                <img src={img.src} onClick={()=>handleOpenImg(index)} alt="" className="propertyImage" />
                            </div>
                        ))}
                    </div>
                    <div className="propertyDetails">
                        <div className="propertyDetailText">
                            <h1 className="propertyDescTitle">دار بن بلقاسم في مدينة تونس</h1>
                            <p className="propertyDesc">يقع Dar Ben Gacem في مدينة تونس ، على بُعد 12.1 كم من مطار تونس قرطاج الدولي ، وهو عبارة عن مكان إقامة مصمم على الطراز التقليدي ويوفر خدمة الواي فاي المجانية وتراسًا يطل على المدينة.
تم تزيين الغرف على الطراز التونسي التقليدي. تحتوي كل غرفة على تكييف وتلفزيون مع قنوات فضائية وحمام خاص مع دش.                                   

يتم تقديم وجبة الإفطار كل صباح في Dar Ben Gacem. يمكن للضيوف الاستمتاع بها على التراس وكذلك في الصالة التقليدية في الفناء.

تقع دار بن قاسم على بعد 20 دقيقة بالسيارة من ملعب قرطاج للجولف و 13.7 كم من ميناء سيدي بوسعيد.

أحب الأزواج تحديدًا الموقع ، وقيّموه 9.7 لرحلة لشخصين.</p>
                        </div>
                        <div className="propertyDetailsPrice">
                            <h1>للكراء بالشهر أو بالأسبوع</h1>
                            <span>تريد ليلة نوم هانئة؟ حازت هذه المنشأة على تقييم عالٍ لما تتمتع به من أسرّة مريحة للغاية.</span>
                            <h2><b>550 دت</b> الشهر</h2>
                            <button>احجز الآن</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default property;