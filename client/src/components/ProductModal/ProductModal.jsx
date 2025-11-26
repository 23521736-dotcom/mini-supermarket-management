import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductModal.css";

const ProductModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditClick = () => {
    onClose();
    navigate(`/products/edit/${product.id}`);
  };

  // Format price
  const formatPrice = (price) => {
    return `$${parseFloat(price || 0).toFixed(2)}`;
  };

  // Format barcode
  const formatBarcode = (barcode) => {
    return barcode || "890123456790";
  };

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal-content">
        {/* Modal Header */}
        <div className="product-modal-header">
          <div className="product-modal-info">
            <h2 className="product-modal-name">{product.name}</h2>
            <p className="product-modal-category">{product.category}</p>
          </div>
          <button className="product-modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Product Image */}
        <div className="product-modal-image-section">
          <img
            src={product.image || "https://placehold.co/400"}
            alt={product.name}
            className="product-modal-image"
            onError={(e) => {
              e.target.src = "https://placehold.co/400";
            }}
          />
        </div>

        {/* Modal Body */}
        <div className="product-modal-body">
          <div className="product-modal-info-grid">
            {/* Basic Information */}
            <div className="product-modal-info-row">
              <div className="product-modal-info-item">
                <label>Product ID</label>
                <p>{product.id || "001"}</p>
              </div>
              <div className="product-modal-info-item">
                <label>Barcode</label>
                <p>{formatBarcode(product.barcode)}</p>
              </div>
            </div>

            <div className="product-modal-info-row">
              <div className="product-modal-info-item">
                <label>Price</label>
                <p>{formatPrice(product.price)}</p>
              </div>
              <div className="product-modal-info-item">
                <label>Stock</label>
                <p>{product.stock || "150kg"}</p>
              </div>
            </div>

            <div className="product-modal-info-row">
              <div className="product-modal-info-item">
                <label>Supplier</label>
                <p>{product.supplier || "Supplier 1"}</p>
              </div>
              <div className="product-modal-info-item">
                <label>Last Restocked</label>
                <p>{product.lastRestocked || "Oct 30, 2025"}</p>
              </div>
            </div>

            <div className="product-modal-info-row">
              <div className="product-modal-info-item">
                <label>Status</label>
                <span
                  className={`product-modal-status-badge ${(
                    product.status || "in-stock"
                  )
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {product.status || "In Stock"}
                </span>
              </div>
            </div>

            <div className="product-modal-info-row">
              <div className="product-modal-info-item product-modal-full-width">
                <label>Description</label>
                <p>
                  {product.description ||
                    "Fresh organic tomatoes from local farms"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="product-modal-footer">
          <button className="product-modal-edit-btn" onClick={handleEditClick}>
            <span>✏️</span>
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
