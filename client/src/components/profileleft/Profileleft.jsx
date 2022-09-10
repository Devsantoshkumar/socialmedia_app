import React from 'react'
import LogoSearch from '../logosearch/LogoSearch'
import FollowersCard from '../followerscard/FollowersCard'
import InfoCard from '../infocard/InfoCard'

const Profileleft = () => {
  return (
    <div className='Profileleft'>
        <LogoSearch />
        <InfoCard />
        <FollowersCard />
    </div>
  )
}

export default Profileleft