import React from 'react'
import PostSide from '../../components/postside/PostSide'
import ProfileSide from '../../components/profileside/ProfileSide'
import RightSide from '../../components/rightside/RightSide'
import Header from '../../components/topheader/Header'

const Home = () => {
  return (
    <div className='home'>
        <Header/>
        <ProfileSide />
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home