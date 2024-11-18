import React, { useState } from "react";
import "./Sidebar.css";
import { SlHome, SlSettings, SlLayers } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
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
      title: "TodoList",
      path: "/todoList",
      iconName: "todoList",
    },
    {
      id: 3,
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
      default:
        return <SlHome color="#0d6efd" />;
    }
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
            <div className="icon-container">{SideBarIcon(ele.iconName)}</div>
            <span className="button-title">{ele.title}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
