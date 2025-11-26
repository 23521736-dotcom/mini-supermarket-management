import React from "react";
import "./Logo.css";

const Logo = ({ size = "medium", className = "" }) => {
  return (
    <div className={`logo-container logo-${size} ${className}`}>
      <div className="logo-icon">🛒</div>
      <h1 className="logo-text">Mini Supermarket</h1>
    </div>
  );
};

export default Logo;
