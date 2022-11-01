import React from 'react'
import Profileleft from '../../components/profileleft/Profileleft'
import ProfileCard from '../../components/profilecard/ProfileCard'
import PostSide from '../../components/postside/PostSide'
import RightSide from '../../components/rightside/RightSide'
import Header from '../../components/topheader/Header'
const Profile = () => {
  return (
    <>
    <Header/>
     <div className='Profile'>
          <Profileleft />
          <div className="profile-center">
            <ProfileCard location = "profilePage" /> 
            <PostSide />
          </div>
           <RightSide />
      </div>
    </>
  )
}

export default Profile