import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import {
  SlHome,
  SlSettings,
  SlLayers,
  SlBubbles,
  SlLogout,
} from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { removeAuthStorage } from "../../redux/slices/AuthSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const location = useLocation();
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
  };

  return (
    <div className="side-bar-container">
      {/* <div className="logo-container">
          <span>Logo</span>
        </div> */}
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
        <button onClick={logouthandler} className="logout-button-container">
          <div className="button-container logout-container">
            <div className="sidebar-icon-container">
              <SlLogout color="#0d6efd" />
            </div>
            <span className="button-title">{"Logout"}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
