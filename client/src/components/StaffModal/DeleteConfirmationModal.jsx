import React from "react";
import "./DeleteConfirmationModal.css";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, staffName }) => {
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
    <div className="delete-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-modal-content">
        {/* Header */}
        <div className="delete-modal-header">
          <h2>Delete item</h2>
        </div>

        {/* Body */}
        <div className="delete-modal-body">
          <div className="warning-icon">
            <div className="triangle-warning">
              <span>!</span>
            </div>
          </div>
          <div className="delete-message">
            <p>Are you sure to delete this staff?</p>
          </div>
        </div>

        {/* Footer */}
        <div className="delete-modal-footer">
          <button className="delete-btn-no" onClick={onClose}>
            No
          </button>
          <button className="delete-btn-yes" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
