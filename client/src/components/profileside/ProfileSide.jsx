import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import LogoSearch from '../logosearch/LogoSearch'
import ProfileCard from '../profilecard/ProfileCard'

const ProfileSide = () => {
  return (
    <div className="profiileSide">
      <LogoSearch />
      <ProfileCard location="homePage"/> 
      <FollowersCard />
    </div>
  )
}

export default ProfileSide