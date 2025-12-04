import React, { useEffect, useState } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";
import "./ErrorNotification.css";

const ErrorNotification = ({
  isVisible,
  onClose,
  title = "Error!",
  message = "Something went wrong. Please try again.",
  autoClose = false,
  duration = 5000,
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
    <div className={`error-notification-overlay ${isAnimating ? "show" : ""}`}>
      <div
        className={`error-notification ${
          isAnimating ? "slide-in" : "slide-out"
        }`}
      >
        <div className="error-notification-content">
          <div className="error-icon-container">
            <FaExclamationCircle className="error-icon" />
          </div>

          <div className="error-message-container">
            <h3 className="error-title">{title}</h3>
            <p className="error-message">{message}</p>
          </div>

          <button
            className="error-close-btn"
            onClick={handleClose}
            aria-label="Close notification"
          >
            <FaTimes />
          </button>
        </div>

        {autoClose && (
          <div
            className="error-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        )}
      </div>
    </div>
  );
};

export default ErrorNotification;
