import React from 'react'
import './propertyItemSearch.css'
import './../../components/search/search.css'
const PropertyItemSearch = () => {
  return (
    <div className='propertyItem'>
        <img src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='propertyImg'/>
        <div className="propertyDescription">
            <h1 className="propertyTitle">منزل بنغل بيج على الواجهة الأمامية للمدرسة</h1>
            <span className="propertySub">منزل مجهز بالتكييف</span>
            <span className="propertyFeatures">2 بيوت * 1 حمام * 2 سرير</span>
            <span className='CancelPrice'>إلغاء الحجز مجاني</span>
            <span className="propertyCancel">يمكنك إلغاء الحجز لاحقا,لذا عليك بإستغلال هذا السعر</span>
        </div>
        <div className="propertyDetail">
            <div className="propertyRating">
                <span>ممتاز</span>
                <button>9.1</button>
            </div>
            <div className="propertyDetailsText">
                <span className="propertyPrice">
                    455DT
                </span>
                <span className="propertyTaxes">يشمل الضرائب والرسوم</span>
                <button className='propertyCheckButton'>مزيد من المعلومات</button>
            </div>
        </div>
    </div>
  )  
}

export default PropertyItemSearch