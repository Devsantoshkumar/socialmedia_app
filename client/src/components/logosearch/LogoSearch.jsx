import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/network.png'

const LogoSearch = () => {
  return (
    <div className='logoSearch'>
      <Link to='../home'>
        <img src={Logo} alt="" />
      </Link>
        <div className="search">
            <input type="text" placeholder='#Explore' />
            <span class="material-symbols-sharp">search</span>
        </div>
    </div>
  ) 
}

export default LogoSearch