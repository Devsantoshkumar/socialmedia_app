import React from 'react'
import Profileleft from '../../components/profileleft/Profileleft'
import ProfileCard from '../../components/profilecard/ProfileCard'
import PostSide from '../../components/postside/PostSide'
import RightSide from '../../components/rightside/RightSide'
const Profile = () => {
  return (
    <div className='Profile'>
          <Profileleft />
          <div className="profile-center">
            <ProfileCard location = "profilePage" /> 
            <PostSide />
          </div>
           <RightSide />
    </div>
  )
}

export default Profile