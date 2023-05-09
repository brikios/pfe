import React from 'react'
import './propertyItemSearch.css'
import './../../components/search/search.css'
import { Link } from 'react-router-dom'
const PropertyItemSearch = ({props}) => {
  return (
    <div className='propertyItem'>
        <img src={props.images[0]} className='propertyImg'/>
        <div className="propertyDescription">
            <h1 className="propertyTitle">{props.name}</h1>
            <span className="propertySub">{props.adress}</span>
            <span className="propertyFeatures">{props.description}</span>
            <span className='CancelPrice'>إلغاء الحجز مجاني</span>
            <span className="propertyCancel">يمكنك إلغاء الحجز لاحقا,لذا عليك بإستغلال هذا السعر</span>
        </div>
        <div className="propertyDetail">
           {props.rating && <div className="propertyRating">
                <span>ممتاز</span>
                <button>{props.rating}</button>
            </div>}
            <div className="propertyDetailsText">
                <span className="propertyPrice">
                    {props.price}دت
                </span>
                <span className="propertyTaxes">يشمل الضرائب والرسوم</span>
                <Link to={`http://localhost:5173/property/${props._id}`}>
                <button className='propertyCheckButton'>مزيد من المعلومات</button>
                </Link>
            </div>
        </div>
    </div>
  )  
}

export default PropertyItemSearch