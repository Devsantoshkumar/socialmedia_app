import React, { useState } from 'react'
import { useEffect } from 'react';
import { getUser } from '../../api/UserRequest';
import "./coversation.css"

const Coversation = ({data, currentUserId, online}) => {

  const [userData, setuserData] = useState(null);
  useEffect(()=>{
    const userId = data.members.find((id)=>id!==currentUserId)
    const getUserData = async()=>{
      try {
        const {data} = await getUser(userId);
        setuserData(data);
      } catch (error) {
         console.log(error);
      }
    }
    getUserData();
  }, [])
  return (
    <div className="follower conversation">
        <div>
            {online && <div className="online-dot"></div>}
            <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "40px", height: "40px" }}
            />
            <div className="name" style={{fontSize: "0.8rem"}}>
                <span>{userData?.firstname} {userData?.lastname}</span>
                <span className={online ? "online" : "offline"}>{online ? "online" : "offline"}</span>
            </div>
        </div>
    </div>
  )
}

export default Coversation