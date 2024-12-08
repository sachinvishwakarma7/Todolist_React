import React, { useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../components/button/AppButton";
import AppInput from "../../components/input/AppInput";
import { SlLock, SlEnvolope } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../redux/thunk/AuthThunk";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    // e.preventDefault();
    // alert(`Logging in with ${userData.email}`);
    dispatch(loginUserThunk({...userData, navigate}));
  };

  return (
    <>
      <div className="background" />
      <div className="login-container">
        <div className="login-box">
          <div className="login-signup-container">
            <h2>Login</h2>
            <span style={{ fontSize: 14 }}>Login to account below</span>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="input-wrapper">
            <AppInput
              isIcon={true}
              Icon={<SlEnvolope color="#0d6efd" />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="input-wrapper">
            <AppInput
              isIcon={true}
              Icon={<SlLock color="#0d6efd" />}
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <AppButton onClick={handleSubmit} label="Login" className={"btn"} />
          </div>
          {/* </form> */}
          <span style={{ fontSize: 14 }}>
            Don't have an account?
            <Link to={"/signup"}>
              <span className="">Sign up for free</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
