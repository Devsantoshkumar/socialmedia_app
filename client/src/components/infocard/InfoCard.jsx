import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileModel from "../../components/profileModal/ProfileModal";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction";

const InfoCard = () => {
  const [modelOpened, setModelOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogout = () =>{
    dispatch(logOut())
  }

  return (
    <div className="InfoCard">
      <div className="infoHeading">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <span
              class="material-symbols-sharp"
              onClick={() => setModelOpened(true)}
            >
              edit
            </span>
            <ProfileModel
              modelOpened={modelOpened}
              setModelOpened={setModelOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.workat}</span>
      </div>
      <button className="button lg-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
