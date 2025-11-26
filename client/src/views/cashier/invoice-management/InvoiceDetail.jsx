import React, { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaTrash,
  FaUser,
  FaReceipt,
  FaEdit,
} from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./InvoiceDetail.css";

const InvoiceDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceId } = useParams();

  // Sample invoice data - in real app, fetch by invoiceId
  const invoiceData = {
    id: invoiceId || "INV-2024-001",
    status: "pending", // pending, completed, refunded
    paymentMethod: "Card Payment", // From invoice data
    customer: {
      id: "CUST-001",
      name: "John Doe",
      hasInfo: true, // true if customer has full info, false for guest
    },
  };

  // Modal state for cancel confirmation
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Payment method state - can be changed if status is pending
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    invoiceData.paymentMethod
  );

  // Available payment methods
  const paymentMethods = [
    { id: "Card Payment", name: "Card Payment", icon: "💳" },
    { id: "Cash", name: "Cash", icon: "💰" },
    { id: "Digital Wallet", name: "Digital Wallet", icon: "📱" },
  ];

  // Product list state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Milk 1L",
      category: "Dairy",
      quantity: 2,
      price: 24.5,
      total: 49.0,
    },
    {
      id: 2,
      name: "Whole Wheat Bread",
      category: "Bakery",
      quantity: 1,
      price: 18.0,
      total: 18.0,
    },
    {
      id: 3,
      name: "Greek Yogurt 500g",
      category: "Dairy",
      quantity: 3,
      price: 16.3,
      total: 48.9,
    },
    {
      id: 4,
      name: "Chocolate Chip Cookies",
      category: "Snacks",
      quantity: 1,
      price: 12.5,
      total: 12.5,
    },
    {
      id: 5,
      name: "Orange Juice 1L",
      category: "Beverages",
      quantity: 2,
      price: 15.8,
      total: 31.6,
    },
  ]);

  // Customer information based on invoice data
  const [customerInfo, setCustomerInfo] = useState(
    invoiceData.customer.hasInfo
      ? {
          id: invoiceData.customer.id,
          type: "Registered Customer",
          name: invoiceData.customer.name,
          description: "Member customer",
          contact: "john.doe@email.com",
          hasInfo: true,
        }
      : {
          id: null,
          type: "Guest Customer",
          name: "Guest Customer",
          description: "Walk-in customer",
          contact: "No contact information",
          hasInfo: false,
        }
  );

  // Discount & Promotion state - initialize from location.state if available
  const [discount, setDiscount] = useState(() => {
    if (location.state?.selectedPromotion) {
      // Clear location state immediately to prevent re-rendering issues
      const selectedPromotion = location.state.selectedPromotion;
      window.history.replaceState({}, document.title);

      return {
        code: selectedPromotion.code,
        type: selectedPromotion.type,
        name: selectedPromotion.title,
        description: selectedPromotion.description,
        percentage:
          parseFloat(selectedPromotion.discount.replace(/[^0-9]/g, "")) || 0,
        validPeriod: selectedPromotion.validPeriod,
      };
    }
    return null;
  });

  // Payment method - can be changed if pending
  const paymentMethod = selectedPaymentMethod;

  // Calculate totals
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const discountAmount = 0.0; // Based on the image
  const taxRate = 0.09; // 9% tax
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal - discountAmount + taxAmount;

  // Product list is readonly - no modifications allowed

  const handleCustomerAction = () => {
    if (customerInfo.hasInfo) {
      // Navigate to edit customer
      navigate(`/customer/edit/${customerInfo.id}`);
    } else {
      // Navigate to add customer
      navigate("/customer/add");
    }
  };

  const handlePromotionAction = () => {
    // Navigate to promotion selection page
    navigate("/promotion-selection", {
      state: { invoiceId },
    });
  };

  const handleRemovePromotion = () => {
    setDiscount(null);
  };

  const handleBack = () => {
    if (invoiceData.status === "pending") {
      // Update invoice status to pending and navigate back
      console.log("Saving invoice as pending:", invoiceData.id);
      // In real app: updateInvoiceStatus(invoiceData.id, "pending")
    }
    navigate(-1);
  };

  const handleConfirmPayment = () => {
    console.log("Confirming payment for:", invoiceData.id);
    // In real app: updateInvoiceStatus(invoiceData.id, "completed")
    // Show success message and navigate back
    alert("Payment confirmed successfully!");
    navigate(-1);
  };

  const handleCancelTransaction = () => {
    setShowCancelModal(true);
  };

  const confirmCancelTransaction = () => {
    console.log("Canceling transaction:", invoiceData.id);
    // In real app: updateInvoiceStatus(invoiceData.id, "refunded")
    alert("Transaction canceled and refunded!");
    setShowCancelModal(false);
    navigate(-1);
  };

  const handlePaymentMethodChange = (methodId) => {
    if (invoiceData.status === "pending") {
      setSelectedPaymentMethod(methodId);
      console.log("Payment method changed to:", methodId);
    }
  };

  const handleProcessPayment = () => {
    console.log("Process Payment", {
      products,
      customer: customerInfo,
      discount,
      paymentMethod,
      totals: {
        subtotal,
        discount: discountAmount,
        tax: taxAmount,
        total: totalAmount,
      },
    });
  };

  return (
    <div className="invoice-detail-view">
      {/* Header */}
      <div className="invoice-page-header">
        <h1 className="invoice-page-title">Invoice Detail</h1>
      </div>

      {/* Main Content */}
      <div className="invoice-detail-content">
        {/* Left Side - Product List & Customer Info */}
        <div className="invoice-form-container">
          {/* Product List Section */}
          <div className="invoice-form-section">
            <div className="invoice-section-header">
              <h2 className="invoice-section-title">Product List</h2>
              <div className="invoice-items-locked">
                <span>📦 Items locked from checkout</span>
              </div>
            </div>

            <div className="invoice-product-table">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="invoice-product-info">
                          <div className="invoice-product-name">
                            {product.name}
                          </div>
                          <div className="invoice-product-category">
                            {product.category}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="invoice-quantity-readonly">
                          <span className="invoice-quantity">
                            {product.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="invoice-price">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="invoice-total">
                        ${product.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="invoice-subtotal-row">
                <span>Subtotal ({products.length} items)</span>
                <span className="invoice-subtotal-amount">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Information Section */}
          <div className="invoice-form-section">
            <div className="invoice-section-header">
              <h2 className="invoice-section-title">Customer Information</h2>
              <button
                className={`invoice-customer-action-btn ${
                  customerInfo.hasInfo ? "edit" : "add"
                }`}
                onClick={handleCustomerAction}
              >
                {customerInfo.hasInfo ? (
                  <>
                    <FaEdit className="invoice-action-icon" />
                    Edit Customer
                  </>
                ) : (
                  <>
                    <FaPlus className="invoice-action-icon" />
                    Add Customer
                  </>
                )}
              </button>
            </div>

            <div className="invoice-customer-card">
              <div className="invoice-customer-avatar">
                <span>
                  {customerInfo.hasInfo
                    ? customerInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "GU"}
                </span>
              </div>
              <div className="invoice-customer-details">
                <h3 className="invoice-customer-name">{customerInfo.name}</h3>
                <p className="invoice-customer-type">
                  {customerInfo.description}
                </p>
                <p className="invoice-customer-contact">
                  {customerInfo.contact}
                </p>
              </div>
            </div>
          </div>

          {/* Discount & Promotion Section */}
          <div className="invoice-form-section">
            <div className="invoice-section-header">
              <h2 className="invoice-section-title">Discount & Promotion</h2>
              {invoiceData.status === "pending" && (
                <button
                  className={`invoice-promotion-action-btn ${
                    discount ? "change" : "add"
                  }`}
                  onClick={handlePromotionAction}
                >
                  {discount ? (
                    <>
                      <FaEdit className="invoice-action-icon" />
                      Change
                    </>
                  ) : (
                    <>
                      <FaPlus className="invoice-action-icon" />
                      Add
                    </>
                  )}
                </button>
              )}
            </div>

            {discount ? (
              <div className="invoice-discount-card">
                <div className="invoice-discount-header">
                  <div className="invoice-discount-code">
                    <span className="invoice-promo-code">{discount.code}</span>
                    <span className="invoice-promo-type">{discount.type}</span>
                  </div>
                  <div className="invoice-discount-badge">
                    {discount.percentage}% OFF
                  </div>
                </div>

                <h3 className="invoice-discount-name">{discount.name}</h3>
                <p className="invoice-discount-description">
                  {discount.description}
                </p>

                <div className="invoice-discount-validity">
                  <span>📅 {discount.validPeriod}</span>
                </div>

                {invoiceData.status === "pending" && (
                  <button
                    className="invoice-remove-promotion-btn"
                    onClick={handleRemovePromotion}
                  >
                    Remove Promotion
                  </button>
                )}
              </div>
            ) : (
              <div className="invoice-no-promotion">
                <div className="invoice-no-promotion-icon">🎫</div>
                <p className="invoice-no-promotion-text">
                  No promotion applied
                </p>
                <p className="invoice-no-promotion-subtitle">
                  Add a promotion to get discounts on your purchase
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Payment Summary */}
        <div className="invoice-action-panel">
          <div className="invoice-payment-summary">
            <h3 className="invoice-summary-title">Payment Summary</h3>

            <div className="invoice-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="invoice-summary-row discount">
              <span>Discount</span>
              <span className="invoice-discount-amount">-$0.00</span>
            </div>

            <div className="invoice-summary-row">
              <span>Tax (9%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>

            <div className="invoice-summary-row total">
              <span>Total Amount</span>
              <span className="invoice-total-amount">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="invoice-payment-method">
              <h4 className="invoice-method-title">Payment Method</h4>

              {invoiceData.status === "pending" ? (
                // Editable payment methods for pending invoices
                <div className="invoice-payment-options">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`invoice-payment-option ${
                        selectedPaymentMethod === method.id ? "selected" : ""
                      }`}
                      onClick={() => handlePaymentMethodChange(method.id)}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => handlePaymentMethodChange(method.id)}
                      />
                      <span className="invoice-payment-icon">
                        {method.icon}
                      </span>
                      <span className="invoice-payment-text">
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                // Readonly payment method for completed/refunded invoices
                <div className="invoice-payment-readonly">
                  <div className="invoice-payment-display">
                    <span className="invoice-payment-icon">
                      {paymentMethods.find((m) => m.id === paymentMethod)
                        ?.icon || "💳"}
                    </span>
                    <span className="invoice-payment-text">
                      {paymentMethod}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons based on invoice status */}
            <div className="invoice-action-buttons">
              {invoiceData.status === "pending" ? (
                <>
                  <button
                    className="invoice-confirm-btn"
                    onClick={handleConfirmPayment}
                  >
                    ✓ Confirm Payment
                  </button>
                  <button
                    className="invoice-cancel-btn"
                    onClick={handleCancelTransaction}
                  >
                    ✗ Cancel Transaction
                  </button>
                  <button className="invoice-back-btn" onClick={handleBack}>
                    Back
                  </button>
                </>
              ) : (
                <button className="invoice-back-btn" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div
          className="invoice-modal-overlay"
          onClick={() => setShowCancelModal(false)}
        >
          <div className="invoice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="invoice-modal-header">
              <h3>Cancel Transaction</h3>
            </div>
            <div className="invoice-modal-content">
              <p>Are you sure you want to cancel this transaction?</p>
              <p>This action will refund the payment and cannot be undone.</p>
            </div>
            <div className="invoice-modal-actions">
              <button
                className="invoice-modal-cancel"
                onClick={() => setShowCancelModal(false)}
              >
                No, Keep Transaction
              </button>
              <button
                className="invoice-modal-confirm"
                onClick={confirmCancelTransaction}
              >
                Yes, Cancel & Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
