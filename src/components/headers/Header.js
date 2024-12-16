import React from "react";
import "./Header.css";
import AppButton from "../button/AppButton";

const Header = () => {
  return (
    <div className="headerDiv">
      <div>
        <span className="headerOptionText">Tanya Jawibs</span>
      </div>
      <AppButton label="Get App" className={"done-btn"} />
    </div>
  );
};

export default Header;
