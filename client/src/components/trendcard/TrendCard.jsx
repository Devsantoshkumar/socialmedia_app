import React from 'react'
import {TrendData} from '../../Data/trendData.js'

const TrendCard = () => {
  return (
    <div className='trendCard'>
        <h3>Trend for you</h3>
        {
            TrendData.map((trend)=>{
                return(
                    <div className="trend">
                        <span>{trend.name}</span>
                        <span>{trend.shares}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TrendCard