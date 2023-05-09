import React, { useEffect } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import './properties.css'
import Search from "../../components/search/Search";
import { useLocation } from "react-router-dom";
import './../../components/search/search.css'


const Properties = () =>{

    useEffect(()=>{
        document.title='داري - بحث'
    },[])
    const location = useLocation();
    console.log(location)
    return(
        <div>
            <Navbar />
            <Header type="properties"/>
            <Search />
            
        </div>
    )
}

export default Properties;