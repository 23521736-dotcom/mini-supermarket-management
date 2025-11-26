import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import "./AssignedOrdersView.css";

const AssignedOrdersView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample assigned orders data
  const ordersData = [
    {
      id: "001",
      customer: "Nguyen Van A",
      deliveryDate: "Nov 07, 2025",
      address: "123 Le Loi Street, District 1, HCMC",
      phone: "+84 901 234 567",
      items: "Milk, Bread, Eggs",
      totalAmount: "250,000 VND",
      assignedTime: "08:30 AM",
      estimatedDelivery: "10:00 AM",
      dateSort: new Date("2025-11-07"),
    },
    {
      id: "002",
      customer: "Tran Thi B",
      deliveryDate: "Nov 07, 2025",
      address: "456 Nguyen Hue Boulevard, District 1, HCMC",
      phone: "+84 902 345 678",
      items: "Rice, Oil, Sugar",
      totalAmount: "180,000 VND",
      assignedTime: "09:00 AM",
      estimatedDelivery: "10:30 AM",
      dateSort: new Date("2025-11-07"),
    },
    {
      id: "003",
      customer: "Le Van C",
      deliveryDate: "Nov 06, 2025",
      address: "789 Dong Khoi Street, District 1, HCMC",
      phone: "+84 903 456 789",
      items: "Fruits, Vegetables",
      totalAmount: "320,000 VND",
      assignedTime: "07:45 AM",
      estimatedDelivery: "09:15 AM",
      dateSort: new Date("2025-11-06"),
    },
    {
      id: "004",
      customer: "Pham Thi D",
      deliveryDate: "Nov 07, 2025",
      address: "321 Hai Ba Trung Street, District 3, HCMC",
      phone: "+84 904 567 890",
      items: "Meat, Fish, Chicken",
      totalAmount: "450,000 VND",
      assignedTime: "10:15 AM",
      estimatedDelivery: "11:45 AM",
      dateSort: new Date("2025-11-07"),
    },
    {
      id: "005",
      customer: "Ho Van E",
      deliveryDate: "Nov 08, 2025",
      address: "654 Vo Van Tan Street, District 3, HCMC",
      phone: "+84 905 678 901",
      items: "Snacks, Drinks",
      totalAmount: "150,000 VND",
      assignedTime: "08:00 AM",
      estimatedDelivery: "09:30 AM",
      dateSort: new Date("2025-11-08"),
    },
  ];

  const itemsPerPage = 10;

  // Filter orders based on search term and time
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Sort orders based on time filter
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (timeFilter === "Latest") {
      return b.dateSort - a.dateSort; // Latest first (newest to oldest)
    } else if (timeFilter === "Earliest") {
      return a.dateSort - b.dateSort; // Earliest first (oldest to newest)
    }
    return 0; // No sorting for "All"
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalItems = sortedOrders.length;
  const paginatedData = sortedOrders.slice(startIndex, endIndex);

  const handleTimeFilterChange = (time) => {
    setTimeFilter(time);
    setCurrentPage(1);
  };

  return (
    <div className="assigned-orders-view">
      {/* Header */}
      <div className="orders-page-header">
        <h1 className="orders-page-title">Assigned orders</h1>
      </div>

      {/* Filters and Actions */}
      <div className="orders-filters-section">
        <div className="orders-left-filters">
          <div className="orders-search-container">
            <FaSearch className="orders-search-icon" />
            <input
              type="text"
              placeholder="Search orders or customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="orders-search-input"
            />
          </div>

          <div className="orders-dropdown">
            <select
              value={timeFilter}
              onChange={(e) => handleTimeFilterChange(e.target.value)}
              className="orders-filter-select"
            >
              <option value="All">All</option>
              <option value="Latest">Latest</option>
              <option value="Earliest">Earliest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Delivery Date</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order, index) => (
              <tr key={`page-${currentPage}-${order.id}-${index}`}>
                <td className="orders-order-id">{order.id}</td>
                <td className="orders-customer-info">
                  <div className="orders-customer-name">{order.customer}</div>
                  <div className="orders-customer-phone">{order.phone}</div>
                </td>
                <td className="orders-delivery-date">{order.deliveryDate}</td>
                <td className="orders-address">
                  <div className="orders-address-text">{order.address}</div>
                </td>
                <td className="orders-action-buttons">
                  <button
                    className="orders-action-btn orders-view-btn"
                    onClick={() => navigate(`/assigned-orders/${order.id}`)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="orders-pagination-section">
        <div className="orders-pagination-info">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>
        <div className="orders-pagination-controls">
          <button
            className="orders-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="orders-page-numbers">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              let pageNum;

              if (totalPages <= 3) {
                pageNum = i + 1;
              } else if (currentPage === 1) {
                pageNum = i + 1;
              } else if (currentPage === totalPages) {
                pageNum = totalPages - 2 + i;
              } else {
                pageNum = currentPage - 1 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`orders-page-number ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="orders-pagination-btn"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            title="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignedOrdersView;
