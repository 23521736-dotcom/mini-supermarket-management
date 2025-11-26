import React from "react";
import "./Input.css";

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
        {...props}
      />
    </div>
  );
};

export default Input;
