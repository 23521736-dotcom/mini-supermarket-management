import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, orderData }) => {
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
    <div
      className="pickup-confirmation-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div className="pickup-confirmation-modal-content">
        {/* Header */}
        <div className="pickup-confirmation-modal-header">
          <h2>Confirm Pickup</h2>
        </div>

        {/* Body */}
        <div className="pickup-confirmation-modal-body">
          <div className="pickup-warning-icon">
            <div className="pickup-triangle-warning">
              <span>✓</span>
            </div>
          </div>
          <div className="pickup-confirmation-message">
            <p>
              Are you sure you want to confirm pickup for order{" "}
              <strong>{orderData?.id || "#001"}</strong>?
            </p>
            <div className="pickup-note-text">
              This action will mark the order as picked up and ready for
              delivery.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pickup-confirmation-modal-footer">
          <button className="pickup-confirmation-btn-no" onClick={onClose}>
            Cancel
          </button>
          <button
            className="pickup-confirmation-btn-yes"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
