import React, { useState } from "react";
import "./SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../components/button/AppButton";
import AppInput from "../../components/input/AppInput";
import { SlLock, SlEnvolope, SlUser } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { SignupUserThunk } from "../../redux/thunk/AuthThunk";
import { notifyError } from "../../utils/toast";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signupHandler = () => {
    if (!userData.username) {
      notifyError("Please provide username!");
      return;
    }
    if (!userData.email) {
      notifyError("Please provide email!");
      return;
    }
    if (!userData.password) {
      notifyError("Please provide password!");
      return;
    }
    dispatch(SignupUserThunk({ ...userData, navigate }));
  };

  return (
    <>
      <div className="background" />
      <div className="login-container">
        <div className="login-box">
          <div className="login-signup-container">
            <h2>Sign up</h2>
            <span style={{ fontSize: 14 }}>
              Enter your details below to create your account and get started.
            </span>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="input-wrapper">
            <AppInput
              isIcon={true}
              Icon={<SlUser color="#0d6efd" />}
              placeholder="username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
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
            <AppButton
              onClick={signupHandler}
              label="Sign up"
              className={"btn"}
            />
          </div>
          {/* </form> */}
          <span style={{ fontSize: 14 }}>
            Already have an account?
            <Link to={"/login"}>
              <span className="">Login</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
