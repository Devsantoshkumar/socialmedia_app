import React from 'react'
import like from '../../images/like.png'
import dislike from '../../images/dislike.png'
import comment from '../../images/comment.png'
import share from '../../images/send.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'



const SinglePost = ({data}) => {
  const {user} = useSelector((state)=>state.AuthReducer.authData)

  const [liked, setliked] = useState(data.likes.includes(user._id))
  const [likes, setlikes] = useState(data.likes.length)
  
  const handleLike =()=>{
    setliked((prev)=>!prev)
    likePost(data._id, user._id)
    liked? setlikes((prev)=>prev -1) : setlikes((prev)=>prev+1)
  }

  return (
    <div className='post'>
        <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />

        <div className="postReact">
           <img src={liked?like:dislike} alt="" onClick={handleLike} />
           <img src={comment} alt="" />
           <img src={share} alt="" />
        </div>
        <span>{likes} likes</span>
        <div className="details">
            <span><b>{user.firstname} {user.lastname}</b></span>
            <span>{data.desc}</span>
        </div>
    </div>
  )
}

export default SinglePost