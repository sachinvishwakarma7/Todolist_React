import React from "react";
import "./AppButton.css";

const AppButton = ({
  title = "title",
  label = "label",
  onClick,
  disabled,
  style,
  className,
}) => {
  return (
    <button
      type={"button"}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`common-button ${className}`} // Add custom and default classes
      style={style} // Inline styles if needed
    >
      {label}
    </button>
  );
};

export default AppButton;
