import React from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
const property = () =>{
    return(
        <div>
            <Navbar />
            <Header type="property"/>
        </div>
    )
}

export default property;