import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"


const ProfileCard = ({location}) => {

  const {user} = useSelector((state)=>state.AuthReducer.authData)
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className='profileCard'>
        <div className="profileImage">
            <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
            <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultprofile.png"} alt="" />
        </div>
        <div className="PfrofileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.workat? user.workat:"Write about yourself"}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{user.followings.length}</span>
                    <span>Followings</span>
                </div>
                <div className="verticalline"></div>
                <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>Follwers</span>
                </div>
                {location === "profilePage" && (
                    <>
                     <div className="verticalline"> </div>
                     <div className="follow">
                    <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                    <span>Posts</span>
                </div>
                    </>
                )}
            </div>
            <hr />
        </div>
        {location === "profilePage" ? "" : <span><Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>My Profile</Link></span>} 
    </div>
  )
}

export default ProfileCard