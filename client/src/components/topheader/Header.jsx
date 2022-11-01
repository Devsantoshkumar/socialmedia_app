import React from 'react'
import { Link } from 'react-router-dom';
import "./header.css";
import { useSelector } from 'react-redux';

function Header() {

    const {user} = useSelector((state)=>state.AuthReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="header">
        <div className="col logo">
            <Link to='../home' className='logoLink'>
               CONNECT
            </Link>
        </div>
        <div className="col search">
            <div className="searchBox">
                <input type="search" placeholder='Search...'/>
                <span><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
        </div>
        <div className="col headerIcons">
            <Link to='../home' className="icon"><i class="fa-solid fa-house"></i></Link>
            <span className="icon"><i class="fa-solid fa-user"></i></span>
            <span className="icon"><i class="fa-solid fa-bell"></i></span>
            <Link to='../chat' className="icon"><i class="fa-solid fa-message"></i></Link>
            <span className="icon"><i class="fa-solid fa-grip"></i></span>
        </div>
        <div className="col headerProfile">
           <div className="profileDetails">
              <span className="name">{user.firstname}</span>
              <img src={user.profilePicture? serverPublic + user.profilePicture : serverPublic + "defaultprofile.png"} alt="" />
           </div>
        </div>
    </div>
  )
}

export default Header