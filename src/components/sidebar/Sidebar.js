import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SlHome,
  SlSettings,
  SlLayers,
  SlBubbles,
  SlLogout,
  SlUser,
} from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { removeAuthStorage } from "../../redux/slices/AuthSlice";
import { removeMessagesStorage } from "../../redux/slices/MessagesSlice";
import Modal from "../model/Modal";
import AppButton from "../button/AppButton";

const Sidebar = () => {
  const { loginData } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const location = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);

  const [dashboardData, setDashboardData] = useState([
    {
      id: 1,
      title: "Home",
      path: "/",
      iconName: "home",
    },
    {
      id: 2,
      title: "Chat",
      path: "/chat",
      iconName: "chat",
    },
    {
      id: 3,
      title: "TodoList",
      path: "/todoList",
      iconName: "todoList",
    },
    {
      id: 4,
      title: "Setting",
      path: "/setting",
      iconName: "setting",
    },
  ]);

  const SideBarIcon = (name) => {
    switch (name) {
      case "home":
        return <SlHome color="#0d6efd" />;
      case "todoList":
        return <SlLayers color="#0d6efd" />;
      case "setting":
        return <SlSettings color="#0d6efd" />;
      case "chat":
        return <SlBubbles color="#0d6efd" />;
      default:
        return <SlHome color="#0d6efd" />;
    }
  };

  const logouthandler = () => {
    localStorage.removeItem("authToken");
    dispatch(removeAuthStorage());
    dispatch(removeMessagesStorage());
  };

  return (
    <>
      <div className="side-bar-container">
        <div className="logo-container">
          <div className="logo-div">
            {loginData?.user?.profileImage ? (
              <img
                className="logo-image"
                alt="profileImage"
                src={loginData?.user?.profileImage}
              />
            ) : (
              <SlUser color="#0d6efd" />
            )}
          </div>
          <div className="name-container">
            <strong>{loginData?.user?.username}</strong>
            <span>{loginData?.user?.email}</span>
          </div>
        </div>
        {dashboardData.map((ele) => (
          <div key={ele.id} className="button-wrapper">
            <Link
              key={ele.id}
              to={ele.path}
              className={`button-container ${
                location.pathname === ele.path ? "active" : ""
              }`}
            >
              <div className="sidebar-icon-container">
                {SideBarIcon(ele.iconName)}
              </div>
              <span className="button-title">{ele.title}</span>
            </Link>
          </div>
        ))}
        <div className="button-wrapper logout-wrapper">
          <button
            onClick={() => setLogoutModal(true)}
            className="logout-button-container"
          >
            <div className="button-container logout-container">
              <div className="sidebar-icon-container">
                <SlLogout color="#0d6efd" />
              </div>
              <span className="button-title">{"Logout"}</span>
            </div>
          </button>
        </div>
      </div>
      <Modal isOpen={logoutModal} onClose={() => setLogoutModal(false)}>
        <p>Are you want to Logout?</p>
        <div>
          <div className="modal-buttons">
            <AppButton
              label="Done"
              className={"done-btn"}
              onClick={() => {
                logouthandler();
                setLogoutModal(false);
              }}
            />
            <AppButton
              label="Cancel"
              className="cancel-btn"
              onClick={() => setLogoutModal(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
