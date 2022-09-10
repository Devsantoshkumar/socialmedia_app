import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const [following, setFollowing] = useState(person.followings.includes(user._id)
  );
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultprofile.png"
          }
          className="followerImg"
          alt=""
        />
        <div className="name">
          <span>
            {person.firstname} {person.lastname}
          </span>
          <span>{person.workat}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        {following ? "Unfollow" : "follow"}
      </button>
    </div>
  );
};

export default User;
