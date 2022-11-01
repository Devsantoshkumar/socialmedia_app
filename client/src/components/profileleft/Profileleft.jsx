import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import InfoCard from '../infocard/InfoCard'

const Profileleft = () => {
  return (
    <div className='Profileleft'>
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default Profileleft