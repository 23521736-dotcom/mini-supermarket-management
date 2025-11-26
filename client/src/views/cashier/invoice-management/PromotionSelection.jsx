import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaArrowLeft,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./PromotionSelection.css";

const PromotionSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceId } = location.state || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("Available");
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  // Sample promotions data matching the design
  const promotionsData = [
    {
      id: "PROMO001",
      code: "PROMO001",
      title: "Weekend Special - Fresh Produce",
      description: "20% off on all fresh produce",
      type: "Fresh Produce",
      discount: "20% OFF",
      validPeriod: "Valid: 11/8/2025 - 11/10/2025",
      validStart: "2025-11-08",
      validEnd: "2025-11-10",
      conditions: null,
      isLastDay: true,
      category: "Fresh Produce",
    },
    {
      id: "PROMO002",
      code: "PROMO002",
      title: "Dairy Delight",
      description: "15% off on all dairy products",
      type: "Dairy",
      discount: "15% OFF",
      validPeriod: "Valid: 11/10/2025 - 11/30/2025",
      validStart: "2025-11-10",
      validEnd: "2025-11-30",
      conditions: null,
      category: "Dairy",
    },
    {
      id: "PROMO003",
      code: "PROMO003",
      title: "Buy 2 Get 1 Free - Snacks",
      description: "Buy 2, Get 1 Free on selected snacks",
      type: "Snacks",
      discount: "BUY 2 GET 1 FREE",
      validPeriod: "Valid: 11/10/2025 - 11/12/2025",
      validStart: "2025-11-10",
      validEnd: "2025-11-12",
      conditions: "Applies to items of equal or lesser value",
      category: "Snacks",
    },
    {
      id: "PROMO004",
      code: "PROMO004",
      title: "Beverage Bonanza",
      description: "$5 off on beverage purchases above $20",
      type: "Beverages",
      discount: "$5 OFF",
      validPeriod: "Valid: 11/10/2025 - 11/17/2025",
      validStart: "2025-11-10",
      validEnd: "2025-11-17",
      conditions: "Minimum purchase $20",
      category: "Beverages",
    },
  ];

  const categories = [
    "All Categories",
    "Fresh Produce",
    "Dairy",
    "Snacks",
    "Beverages",
  ];

  const statusOptions = ["All", "Available", "Expired"];

  const isPromotionValid = (promotion) => {
    const today = new Date();
    const startDate = new Date(promotion.validStart);
    const endDate = new Date(promotion.validEnd);
    return today >= startDate && today <= endDate;
  };

  // Filter promotions based on search, category and status
  const filteredPromotions = promotionsData.filter((promo) => {
    const matchesSearch =
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || promo.category === categoryFilter;

    const promoIsValid = isPromotionValid(promo);
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Available" && promoIsValid) ||
      (statusFilter === "Expired" && !promoIsValid);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handlePromotionSelect = (promotion) => {
    if (selectedPromotion?.id === promotion.id) {
      setSelectedPromotion(null);
    } else {
      setSelectedPromotion(promotion);
    }
  };

  const handleApplyPromotion = () => {
    if (selectedPromotion) {
      // Navigate back to InvoiceDetail with selected promotion
      navigate(`/invoice/detail/${invoiceId}`, {
        state: { selectedPromotion },
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="promotion-selection-view">
      {/* Header */}
      <div className="promotion-header">
        <div className="promotion-header-left">
          <button className="promotion-back-btn" onClick={handleBack}>
            <FaArrowLeft />
          </button>
          <div className="promotion-header-info">
            <h1 className="promotion-page-title">Today's Active Promotions</h1>
            <p className="promotion-subtitle">
              {filteredPromotions.length} active promotions available today
            </p>
          </div>
        </div>
        <div className="promotion-header-right">
          <div className="promotion-date-display">
            <FaCalendarAlt className="promotion-date-icon" />
            <span>Monday, November 26, 2025</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="promotion-controls">
        <div className="promotion-search-container">
          <FaSearch className="promotion-search-icon" />
          <input
            type="text"
            placeholder="Search promotions by name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="promotion-search-input"
          />
        </div>
        <div className="promotion-filter-container">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="promotion-category-filter"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="promotion-filter-container">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="promotion-status-filter"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="promotion-grid">
        {filteredPromotions.map((promotion) => (
          <div
            key={promotion.id}
            className={`promotion-card ${
              selectedPromotion?.id === promotion.id ? "selected" : ""
            } ${!isPromotionValid(promotion) ? "expired" : ""}`}
            onClick={() =>
              isPromotionValid(promotion) && handlePromotionSelect(promotion)
            }
          >
            <div className="promotion-card-header">
              <div className="promotion-card-info">
                <span className="promotion-code">{promotion.code}</span>
                <span className="promotion-type-badge">{promotion.type}</span>
              </div>
              <div className="promotion-discount-badge">
                {promotion.discount}
              </div>
            </div>

            <div className="promotion-card-content">
              <h3 className="promotion-title">{promotion.title}</h3>
              <p className="promotion-description">{promotion.description}</p>

              {promotion.conditions && (
                <div className="promotion-conditions">
                  <FaExclamationTriangle className="promotion-warning-icon" />
                  <span>Conditions: {promotion.conditions}</span>
                </div>
              )}

              <div className="promotion-validity">
                <FaCalendarAlt className="promotion-calendar-icon" />
                <span>{promotion.validPeriod}</span>
                {promotion.isLastDay && (
                  <span className="promotion-last-day-badge">Last Day!</span>
                )}
              </div>
            </div>

            {selectedPromotion?.id === promotion.id && (
              <div className="promotion-selected-indicator">✓ Selected</div>
            )}

            {!isPromotionValid(promotion) && (
              <div className="promotion-expired-overlay">
                <span>Expired</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <div className="promotion-no-results">
          <p>No promotions found matching your criteria.</p>
        </div>
      )}

      {/* Action Button */}
      {selectedPromotion && (
        <div className="promotion-action-container">
          <button
            className="promotion-apply-btn"
            onClick={handleApplyPromotion}
          >
            Apply Promotion
          </button>
        </div>
      )}
    </div>
  );
};

export default PromotionSelection;
