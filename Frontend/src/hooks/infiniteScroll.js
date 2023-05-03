import {readInfiniteScrollProperty} from './../api/Property.js';
import { useEffect, useState } from "react";
import axios from "axios";

export const infiniteScroll=()=>{
    const [properties,setProperties]=useState([]);
    const [skip,setSkip]=useState(40);
    useEffect(()=>{
        fetchProperties(); 
    }, [skip])
    const fetchProperties = async()=>{
        try{
            const {data,error} = await readInfiniteScrollProperty(skip);
            if(error){
                console.log(error);
                return;
            }
            setProperties([...properties,...data])
        }catch(err){
            console.log(err.message)
        }

    }
    
    return {properties,skip}
}

export const handleScroll =(e)=>{
    const {offsetHeight ,scrollTap,scrollHeight} = e.target;
    if(offsetHeight + scrollTap>=scrollHeight){
        setSkip(properties?.length)
    }
}