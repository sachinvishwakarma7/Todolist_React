import React from "react";
import "./AppInput.css";

const AppInput = ({
  isIcon = false,
  Icon,
  type = "text",
  onChange,
  value,
  placeholder = "Search",
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        // style={{ paddingLeft: "34px", borderRadius: "10px" }}
        className="app-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isIcon && (
        <div className="icon-container">
          {/* <SlMagnifier color="#0d6efd" /> */}
          {Icon}
        </div>
      )}
    </div>
  );
};

export default AppInput;
