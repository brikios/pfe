import React from 'react'
import './propertylist.css'
const PropertyList = () => {
  return (
    <div className='list'>
        <div className="listItem">
            <img src="https://images.pexels.com/photos/7710011/pexels-photo-7710011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="listImg" />
        
        <div className="listTitles">
            <h1>منزل</h1>
            <h2>154 منزل</h2>
        </div>
        </div>
        <div className="listItem">
            <img src="https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="listImg" />
        
        <div className="listTitles">
            <h1>شقة</h1>
            <h2>154 شقة</h2>
        </div>
        </div>
        <div className="listItem">
            <img src="https://images.pexels.com/photos/102728/pexels-photo-102728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="listImg" />
        
        <div className="listTitles">
            <h1>أرض</h1>
            <h2>154 أرض</h2>
        </div>
        </div>
        <div className="listItem">
            <img src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="listImg" />
        
        <div className="listTitles">
            <h1>مستودع</h1>
            <h2>154 مستودع</h2>
        </div>
        </div>
        <div className="listItem">
            <img src="https://images.pexels.com/photos/5864208/pexels-photo-5864208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="listImg" />
        
        <div className="listTitles">
            <h1>محل تجاري</h1>
            <h2>154 محل تجاري</h2>
        </div>
        </div>
    </div>
  )
}

export default PropertyList