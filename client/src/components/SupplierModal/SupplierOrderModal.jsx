import React from "react";
import "./SupplierOrderModal.css";

const SupplierOrderModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="staff-info">
            <h2 className="staff-name">{order.id}</h2>
            <p className="staff-position"></p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="info-grid">
            {/* Order Information */}
            <div className="info-row">
              <div className="info-item">
                <label>Supplier</label>
                <p>{order.supplier}</p>
              </div>
              <div className="info-item">
                <label>Status</label>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status),
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Order Date</label>
                <p>{order.orderDate}</p>
              </div>
              <div className="info-item">
                <label>Delivery Date</label>
                <p>{order.deliveryDate}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="info-row">
              <div className="info-item full-width">
                <label>Order Items</label>
                <div className="order-items-table">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.unit}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="info-row">
                <div className="info-item full-width">
                  <label>Notes</label>
                  <p>{order.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrderModal;
