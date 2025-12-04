import React from "react";
import { useNotification } from "../../hooks/useNotification";
import SuccessNotification from "../Notification/SuccessNotification";
import ErrorNotification from "../Notification/ErrorNotification";
import "./NotificationDemo.css";

const NotificationDemo = () => {
  const {
    successNotification,
    errorNotification,
    showSuccess,
    showError,
    hideSuccess,
    hideError,
  } = useNotification();

  const handleShowSuccess = () => {
    showSuccess(
      "Order Pickup Confirmed!",
      "The order has been successfully marked as picked up and is ready for delivery."
    );
  };

  const handleShowError = () => {
    showError(
      "Pickup Failed!",
      "Unable to confirm order pickup. Please check your connection and try again."
    );
  };

  const handleShowCustomSuccess = () => {
    showSuccess(
      "Customer Updated!",
      "Customer information has been successfully updated in the system."
    );
  };

  const handleShowCustomError = () => {
    showError(
      "Validation Error!",
      "Please fill in all required fields before submitting the form."
    );
  };

  return (
    <div className="notification-demo">
      <div className="demo-header">
        <h2>Notification System Demo</h2>
        <p>Test the success and error notifications with different scenarios</p>
      </div>

      <div className="demo-buttons">
        <div className="button-group">
          <h3>Success Notifications</h3>
          <button className="demo-btn success-btn" onClick={handleShowSuccess}>
            Show Pickup Success
          </button>
          <button
            className="demo-btn success-btn"
            onClick={handleShowCustomSuccess}
          >
            Show Update Success
          </button>
        </div>

        <div className="button-group">
          <h3>Error Notifications</h3>
          <button className="demo-btn error-btn" onClick={handleShowError}>
            Show Pickup Error
          </button>
          <button
            className="demo-btn error-btn"
            onClick={handleShowCustomError}
          >
            Show Validation Error
          </button>
        </div>
      </div>

      {/* Notifications */}
      <SuccessNotification
        isVisible={successNotification.isVisible}
        title={successNotification.title}
        message={successNotification.message}
        onClose={hideSuccess}
        autoClose={true}
        duration={4000}
      />

      <ErrorNotification
        isVisible={errorNotification.isVisible}
        title={errorNotification.title}
        message={errorNotification.message}
        onClose={hideError}
        autoClose={false}
        duration={5000}
      />
    </div>
  );
};

export default NotificationDemo;
