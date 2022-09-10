import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import home from "../../images/home.png";
import bell from "../../images/bell.png";
import comment from "../../images/comment.png";
import setting from "../../images/settings.png";
import TrendCard from "../trendcard/TrendCard";
import ShareModel from "../shareModel/ShareModel";

const RightSide = () => {
  const [modelOpened, setModelOpened] = useState(false);
  return (
    <div className="rightSide">
      <div className="navIcons">
        <Link to='../home'>
          <img src={home} alt="" />
        </Link>
        <img src={bell} alt="" />
        <img src={comment} alt="" />
        <img src={setting} alt="" />
      </div>
      <TrendCard />
      <button
        className="button share-button"
        onClick={() => setModelOpened(true)}
      >
        Share
      </button>
      <ShareModel modelOpened={modelOpened} setModelOpened={setModelOpened}/>
    </div>
  );
};

export default RightSide;
