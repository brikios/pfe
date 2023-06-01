import React from 'react'
import './featured.css'
import useFetch from './../../hooks/useFetch.js'

export const Featured = () => {
    const {data,loading,error} = useFetch("http://127.0.0.1:8800/property/countByCity?cities=القصرين,تونس,المهدية")
    
     
    return (
    <div className="featured">
        <ImageSlider effectDelay={500} autoPlayDelay={2000}>
      <Slide>
        <img alt="img2" src="https://images.pexels.com/photos/4582605/pexels-photo-4582605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      </Slide>
      <Slide>
        <img alt="img2" src="https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
      </Slide>
      <Slide>
        <img alt="img1" src="https://images.pexels.com/photos/4582567/pexels-photo-4582567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      </Slide>
    </ImageSlider>
    </div>
    
  )
}
