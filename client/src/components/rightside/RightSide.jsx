import React from "react";
import { useState } from "react";
import TrendCard from "../trendcard/TrendCard";
import ShareModel from "../shareModel/ShareModel";

const RightSide = () => {
  const [modelOpened, setModelOpened] = useState(false);
  return (
    <div className="rightSide">
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
