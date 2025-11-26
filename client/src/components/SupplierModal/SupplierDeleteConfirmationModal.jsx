import React from "react";
import "./SupplierDeleteConfirmationModal.css";

const SupplierDeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
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
    <div className="supplier-delete-overlay" onClick={handleOverlayClick}>
      <div className="supplier-delete-content">
        {/* Header */}
        <div className="supplier-delete-header">
          <h2>Delete Supplier</h2>
        </div>

        {/* Body */}
        <div className="supplier-delete-body">
          <div className="supplier-warning-icon">
            <div className="supplier-triangle-warning">
              <span>!</span>
            </div>
          </div>
          <div className="supplier-delete-message">
            <p>Are you sure to delete this supplier?</p>
          </div>
        </div>

        {/* Footer */}
        <div className="supplier-delete-footer">
          <button className="supplier-btn-no" onClick={onClose}>
            No
          </button>
          <button className="supplier-btn-yes" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierDeleteConfirmationModal;
