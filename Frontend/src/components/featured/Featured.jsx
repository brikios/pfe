import React from 'react'
import './featured.css'
import useFetch from './../../hooks/useFetch.js'
export const Featured = () => {
    const {data,loading,error} = useFetch("http://127.0.0.1:8800/property/countByCity?cities=القصرين,تونس,المهدية")
        //console.log(data)
    return (
    
        <div className="featured">
        {loading ? ("جاري التحميل"):(<><div className="featuredItem">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/TunisAveHabibBourguiba.jpg" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>تونس</h1>
                    <h1>{data[1]} ملكية</h1>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://www.tunisiatourism.info/thumbs/780-420-destinations-1596647270-29903459.jpg" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>المهدية</h1>
                    <h1>{data[2]} ملكية</h1>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://www.nachoua.com/Sbeitla/Z_sbeitla-06.jpg" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>القصرين</h1>
                    <h1>{data[0]} ملكية</h1>
                </div>
            </div></>)}
        </div>
    
  )
}
