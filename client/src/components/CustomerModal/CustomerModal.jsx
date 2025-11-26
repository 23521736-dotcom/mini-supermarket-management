import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerModal.css";

const CustomerModal = ({ customer, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !customer) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditClick = () => {
    onClose();
    navigate(`/customer/edit/${customer.id}`);
  };

  return (
    <div className="customer-modal-overlay" onClick={handleOverlayClick}>
      <div className="customer-modal-content">
        {/* Modal Header */}
        <div className="customer-modal-header">
          <div className="customer-info">
            <h2 className="customer-name">{customer.name}</h2>
            <p className="customer-details">Customer Details</p>
          </div>
          <button className="customer-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="customer-modal-body">
          <div className="customer-info-grid">
            {/* Basic Information */}
            <div className="customer-info-row">
              <div className="customer-info-item">
                <label>Customer ID</label>
                <p>{customer.id}</p>
              </div>
              <div className="customer-info-item">
                <label>Username</label>
                <p>{customer.username || "johnsmith"}</p>
              </div>
            </div>

            <div className="customer-info-row">
              <div className="customer-info-item">
                <label>Email</label>
                <p>{customer.email}</p>
              </div>
              <div className="customer-info-item">
                <label>Phone</label>
                <p>{customer.phone}</p>
              </div>
            </div>

            <div className="customer-info-row">
              <div className="customer-info-item customer-full-width">
                <label>Address</label>
                <p>
                  {customer.address || "123 Main Street, Springfield, CA 94001"}
                </p>
              </div>
            </div>

            <div className="customer-info-row">
              <div className="customer-info-item">
                <label>Total Purchases</label>
                <p>{customer.totalPurchases || "$2200.00"}</p>
              </div>
              <div className="customer-info-item">
                <label>Loyalty Points</label>
                <p>{customer.loyaltyPoints || "245"}</p>
              </div>
            </div>

            <div className="customer-info-row">
              <div className="customer-info-item">
                <label>Last Purchase</label>
                <p>{customer.lastPurchase || "Nov 01, 2025"}</p>
              </div>
              <div className="customer-info-item">
                <label>Join Date</label>
                <p>{customer.joinDate || "Jan 15, 2024"}</p>
              </div>
            </div>

            <div className="customer-info-row">
              <div className="customer-info-item">
                <label>Membership Type</label>
                <span
                  className={`customer-membership-badge ${
                    customer.membership?.toLowerCase() || "gold"
                  }`}
                >
                  {customer.membership || "Gold"}
                </span>
              </div>
              <div className="customer-info-item">
                <label>Status</label>
                <span
                  className={`customer-status-badge ${
                    customer.status?.toLowerCase() || "active"
                  }`}
                >
                  {customer.status || "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="customer-modal-footer">
          <button className="edit-customer-btn" onClick={handleEditClick}>
            <span>✏️</span>
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
