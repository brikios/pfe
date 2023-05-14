import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Account = () => {
    
        const {user} = useContext(AuthContext)
  return (
    <div>
        <Navbar />
        <p>{user.email}</p>
        
    </div>
  )
}

export default Account