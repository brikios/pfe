import React from 'react';
import './profile.css'


const Profile =(props)=> {
  return (
    <div className="cardP">
        <img src={props.img} alt="John" />
        <h1>{props.firstName} {props.lastName}</h1>
        <p className="title">{props.phone}</p>
        <p>{props.email}</p>
      
        <p><button>Contact</button></p>
</div>

  );
}

export default Profile