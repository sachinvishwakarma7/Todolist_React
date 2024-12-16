import React, { useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { SlLayers, SlBubbles, SlSettings } from "react-icons/sl"; // Icons from React Icons
import { useSelector } from "react-redux";

const HomePage = () => {
  const { loginData } = useSelector((state) => state.userReducer);

  return (
    <div className="home-container">
      <div className="name-home-container">
        <h1>Welcome, {loginData?.user?.username}</h1>
        <p>Here's an overview of your activity.</p>
      </div>

      {/* Dashboard Cards */}
      <section className="dashboard-cards">
        <div className="card">
          <SlBubbles className="card-icon" />
          <h3>Chats</h3>
          <p>Stay up to date with Chats.</p>
          <Link to="/chat" className="card-link">
            View Messages
          </Link>
        </div>
        <div className="card">
          <SlLayers className="card-icon" />
          <h3>Tasks</h3>
          <p>Manage your to-do list.</p>
          <Link to="/todoList" className="card-link">
            Go to Tasks
          </Link>
        </div>
        <div className="card">
          <SlSettings className="card-icon" />
          <h3>Settings</h3>
          <p>Update your profile and preferences.</p>
          <Link to="/setting" className="card-link">
            Go to Settings
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Links</h2>
        <ul>
          <li>
            <Link to="/chat">Go to Chat</Link>
          </li>
          <li>
            <Link to="/todoList">Go to To-Do</Link>
          </li>
          <li>
            <Link to="/setting">Go to Settings</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
