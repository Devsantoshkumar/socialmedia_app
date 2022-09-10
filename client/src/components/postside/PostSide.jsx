import React from 'react'
import Post from '../posts/Post'
import PostShare from '../postshare/PostShare'

const PostSide = () => {
  return (
    <div className="postSide">
        <PostShare/>
        <Post />
    </div>
  )
}

export default PostSide