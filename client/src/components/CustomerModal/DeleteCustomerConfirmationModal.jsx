import React from "react";
import "./DeleteCustomerConfirmationModal.css";

const DeleteCustomerConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="delete-customer-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-customer-modal-content">
        {/* Header */}
        <div className="delete-customer-modal-header">
          <h2>Delete item</h2>
        </div>

        {/* Body */}
        <div className="delete-customer-modal-body">
          <div className="customer-warning-icon">
            <div className="customer-triangle-warning">
              <span>!</span>
            </div>
          </div>
          <div className="delete-customer-message">
            <p>Are you sure to delete this customer?</p>
          </div>
        </div>

        {/* Footer */}
        <div className="delete-customer-modal-footer">
          <button className="delete-customer-btn-no" onClick={onClose}>
            No
          </button>
          <button className="delete-customer-btn-yes" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerConfirmationModal;
