import React from "react";
import "./Home.css"
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import Banner from "../../components/banner/Banner";
const Home = () =>{
    return(
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">إبحث حسب نوع العقار</h1>
                <PropertyList />
                <Banner />
                <Featured />
                <PropertyList />
            </div>
        </div>
    )
}

export default Home;