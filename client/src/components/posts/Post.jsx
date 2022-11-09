import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import SinglePost from "../singlepost/SinglePost";

const Post = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);


  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, []);
  return (
    <div className="posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <SinglePost data={post} id={id} />;
          })}
    </div>
  );
};
              
export default Post;
