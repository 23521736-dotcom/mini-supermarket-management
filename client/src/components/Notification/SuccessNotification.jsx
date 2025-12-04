import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import "./SuccessNotification.css";

const SuccessNotification = ({
  isVisible,
  onClose,
  title = "Success!",
  message = "Operation completed successfully.",
  autoClose = true,
  duration = 4000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div
      className={`success-notification-overlay ${isAnimating ? "show" : ""}`}
    >
      <div
        className={`success-notification ${
          isAnimating ? "slide-in" : "slide-out"
        }`}
      >
        <div className="success-notification-content">
          <div className="success-icon-container">
            <FaCheckCircle className="success-icon" />
          </div>

          <div className="success-message-container">
            <h3 className="success-title">{title}</h3>
            <p className="success-message">{message}</p>
          </div>

          <button
            className="success-close-btn"
            onClick={handleClose}
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>

        {autoClose && (
          <div
            className="success-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        )}
      </div>
    </div>
  );
};

export default SuccessNotification;
