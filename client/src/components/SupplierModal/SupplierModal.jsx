import React from "react";
import { useNavigate } from "react-router-dom";
import "./SupplierModal.css";

const SupplierModal = ({ supplier, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !supplier) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditClick = () => {
    onClose();
    navigate(`/supplier/edit/${supplier.id}`);
  };

  const handlePlaceOrderClick = () => {
    onClose();
    navigate(`/supplier/place-order/${supplier.id}`);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="staff-info">
            <h2 className="staff-name">{supplier.name}</h2>
            <p className="staff-position">{supplier.category}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="info-grid">
            {/* Basic Information */}
            <div className="info-row">
              <div className="info-item">
                <label>Supplier ID</label>
                <p>{supplier.id}</p>
              </div>
              <div className="info-item">
                <label>Category</label>
                <p>{supplier.category}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Contact Person</label>
                <p>
                  {supplier.contactPerson ||
                    supplier.contact?.split("\n")[0] ||
                    "N/A"}
                </p>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <p>
                  {supplier.phone || supplier.contact?.split("\n")[1] || "N/A"}
                </p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item full-width">
                <label>Email</label>
                <p>{supplier.email}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item full-width">
                <label>Address</label>
                <p>{supplier.address}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Total Orders</label>
                <p>{supplier.orders}</p>
              </div>
              <div className="info-item">
                <label>Last Order Date</label>
                <p>{supplier.lastOrder}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="footer-buttons">
            <button className="edit-supplier-btn" onClick={handleEditClick}>
              <span>✏️</span>
              Edit Supplier
            </button>
            <button className="place-order-btn" onClick={handlePlaceOrderClick}>
              <span>🛒</span>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;
