import React from "react"
import './card.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"


export default function Card (props){
    
    return (
        
        <div className="card">
             <div className="card--badge">{props.rating}</div>
            <img src={props.img} className="card--image" />
            <p className="card--title">{props.title}</p>
            <div className="card--stats">
                <img src="https://freepngimg.com/thumb/star/22-star-png-image.png" className="card--star" />
                <span> {props.rating} </span>
                <span className="gray">| | (99)  </span>
                <span className="gray">{props.city}</span>
            </div>
            
            <p className="card--price"><span className="bold">{props.price} دت</span> / الشهر</p>
        </div>
    )
}