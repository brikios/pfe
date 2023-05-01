import React from 'react'
import './featured.css'
import useFetch from './../../hooks/useFetch.js'
export const Featured = () => {
    const {data,loading,error} = useFetch("property/countByCity?cities=sbeitla,kasserine")
        console.log(data,loading,error)
    return (
    <div>
        <div className="featured">
            <div className="featuredItem">
                <img src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>منزل</h1>
                    <h1>152 منزل</h1>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://images.pexels.com/photos/55766/pexels-photo-55766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>أرض</h1>
                    <h1>152 أرض</h1>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>مستودع</h1>
                    <h1>152 مستودع</h1>
                </div>
            </div>
        </div>
    </div>
  )
}
