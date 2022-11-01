import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import ProfileCard from '../profilecard/ProfileCard'

const ProfileSide = () => {
  return (
    <div className="profiileSide">

      <ProfileCard location="homePage"/> 
      <FollowersCard />
    </div>
  )
}

export default ProfileSide