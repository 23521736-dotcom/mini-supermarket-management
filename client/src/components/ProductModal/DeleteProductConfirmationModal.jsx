import React from "react";
import "./DeleteProductConfirmationModal.css";

const DeleteProductConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
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
    <div className="delete-product-modal-overlay" onClick={handleOverlayClick}>
      <div className="delete-product-modal-content">
        {/* Header */}
        <div className="delete-product-modal-header">
          <h2>Delete Product</h2>
        </div>

        {/* Body */}
        <div className="delete-product-modal-body">
          <div className="warning-icon">
            <div className="triangle-warning">
              <span>!</span>
            </div>
          </div>
          <div className="delete-message">
            <p>Are you sure to delete this product?</p>
          </div>
        </div>

        {/* Footer */}
        <div className="delete-product-modal-footer">
          <button className="delete-product-btn-no" onClick={onClose}>
            No
          </button>
          <button className="delete-product-btn-yes" onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductConfirmationModal;
