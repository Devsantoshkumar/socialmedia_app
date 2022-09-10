import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import User from "../user/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

const FollowersCard = () => {
  const [person, setPerson] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPerson(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="followersCard">
      <h3>People you may know</h3>
      {
      person.map((person, id) => {
        if (person._id !== user._d) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
