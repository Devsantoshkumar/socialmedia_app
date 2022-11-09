import React from "react";
import { useState } from "react";
import Network from "../../images/network.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const loading = useSelector((state)=>state.AuthReducer.loading)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const restForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <div className="webname">
          <h1>Connect</h1>
          <h6>Who is your's close to heart, connect them</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignup ? "Sign up" : "Log In"}</h3>

          {isSignup && (
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last name"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />
            {isSignup && (
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm password"
                className="infoInput"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            className="errorMsg"
            style={{ display: confirmPass ? "none" : "block" }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
              onClick={() => {
                setIsSignup((prev) => !prev);
                restForm();
              }}
            >
              {isSignup
                ? " Already have an account. Login"
                : "Don't have an account? Signup"}
            </span>
          </div>
          <button className="button info-button" type="submit" disabled={loading}>
            {loading? "Loading..." : isSignup ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
