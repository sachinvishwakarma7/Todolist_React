import React from "react";
import "./AppInput.css";

const AppInput = ({
  isIcon = false,
  Icon,
  type = "text",
  onChange,
  value,
  placeholder = "Search",
  name,
}) => {
  return (
    <div>
      <div className="input-container">
        <input
          name={name}
          type={type}
          style={{ paddingLeft: !isIcon && "10px" }}
          className={`app-input`}
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
    </div>
  );
};

export default AppInput;
