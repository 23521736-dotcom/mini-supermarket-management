import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaFileInvoiceDollar,
  FaCalendarAlt,
} from "react-icons/fa";
import "./InvoiceListView.css";

const InvoiceListView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("All Methods");
  const [statusFilter, setStatusFilter] = useState("Pending"); // Mặc định là "Pending" - chưa thanh toán
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample invoice data - matching the design structure
  const invoiceData = [
    {
      id: "INV-2024-001",
      txnNumber: "TXN001234",
      date: "Nov 26, 2025",
      time: "09:15:23",
      customer: "John Doe",
      customerInitials: "JO",
      customerId: "CUST-001",
      hasCustomerInfo: true,
      staff: "Staff A",
      items: "3 items",
      itemsList: "Fresh Milk, Bread, ...",
      amount: "$135.50",
      paymentMethod: "Card",
      status: "Pending",
    },
    {
      id: "INV-2024-002",
      txnNumber: "TXN001235",
      date: "Nov 25, 2025",
      time: "09:32:45",
      customer: "Emma Wilson",
      customerInitials: "EM",
      customerId: "CUST-002",
      hasCustomerInfo: true,
      staff: "Staff A",
      items: "2 items",
      itemsList: "Coca Cola 2L, ...",
      amount: "$89.00",
      paymentMethod: "Cash",
      status: "Completed",
    },
    {
      id: "INV-2024-003",
      txnNumber: "TXN001236",
      date: "Nov 25, 2025",
      time: "10:05:12",
      customer: "Sarah Smith",
      customerInitials: "SA",
      customerId: null,
      hasCustomerInfo: false,
      staff: "Staff A",
      items: "3 items",
      itemsList: "Greek Yogurt, ...",
      amount: "$36.30",
      paymentMethod: "E-Wallet",
      status: "Completed",
    },
    {
      id: "INV-2024-004",
      txnNumber: "TXN001237",
      date: "Nov 24, 2025",
      time: "10:28:36",
      customer: "Mike Johnson",
      customerInitials: "MI",
      customerId: "CUST-003",
      hasCustomerInfo: true,
      staff: "Staff A",
      items: "3 items",
      itemsList: "Chicken Breast, ...",
      amount: "$16.04",
      paymentMethod: "Card",
      status: "Completed",
    },
    {
      id: "INV-2024-005",
      txnNumber: "TXN001238",
      date: "Nov 22, 2025",
      time: "11:15:33",
      customer: "Guest",
      customerInitials: "GU",
      customerId: null,
      hasCustomerInfo: false,
      staff: "Staff A",
      items: "2 items",
      itemsList: "Chocolate Bar, ...",
      amount: "$13.75",
      paymentMethod: "Cash",
      status: "Completed",
    },
    {
      id: "INV-2024-006",
      txnNumber: "TXN001239",
      date: "Nov 21, 2025",
      time: "11:48:22",
      customer: "Emily Davis",
      customerInitials: "EM",
      customerId: "CUST-004",
      hasCustomerInfo: true,
      staff: "Staff A",
      items: "2 items",
      itemsList: "Croissant, ...",
      amount: "$21.76",
      paymentMethod: "E-Wallet",
      status: "Completed",
    },
    {
      id: "INV-2024-007",
      txnNumber: "TXN001240",
      date: "Nov 20, 2025",
      time: "12:10:15",
      customer: "Robert Brown",
      customerInitials: "RO",
      customerId: null,
      hasCustomerInfo: false,
      staff: "Staff A",
      items: "2 items",
      itemsList: "Frozen Pizza, ...",
      amount: "$24.20",
      paymentMethod: "Card",
      status: "Refunded",
    },
    {
      id: "INV-2024-008",
      txnNumber: "TXN001241",
      date: "Nov 24, 2025",
      time: "08:30:10",
      customer: "Alice Cooper",
      customerInitials: "AL",
      customerId: "CUST-005",
      hasCustomerInfo: true,
      staff: "Staff B",
      items: "4 items",
      itemsList: "Coffee, Sugar, ...",
      amount: "$42.90",
      paymentMethod: "Card",
      status: "Pending",
    },
    {
      id: "INV-2024-009",
      txnNumber: "TXN001242",
      date: "Nov 23, 2025",
      time: "09:45:22",
      customer: "David Lee",
      customerInitials: "DA",
      customerId: null,
      hasCustomerInfo: false,
      staff: "Staff B",
      items: "1 item",
      itemsList: "Energy Drink",
      amount: "$5.50",
      paymentMethod: "Cash",
      status: "Pending",
    },
    {
      id: "INV-2024-010",
      txnNumber: "TXN001243",
      date: "Nov 26, 2025",
      time: "10:20:45",
      customer: "Maria Garcia",
      customerInitials: "MA",
      customerId: "CUST-006",
      hasCustomerInfo: true,
      staff: "Staff C",
      items: "5 items",
      itemsList: "Vegetables, Fruits, ...",
      amount: "$78.30",
      paymentMethod: "E-Wallet",
      status: "Pending",
    },
  ];

  const itemsPerPage = 10;

  // Calculate stats for header cards
  const totalRevenue = invoiceData
    .filter((invoice) => invoice.status === "Completed")
    .reduce(
      (sum, invoice) => sum + parseFloat(invoice.amount.replace("$", "")),
      0
    );

  const totalInvoices = invoiceData.length;
  const completedInvoices = invoiceData.filter(
    (inv) => inv.status === "Completed"
  ).length;
  const totalRefunded = invoiceData
    .filter((invoice) => invoice.status === "Refunded")
    .reduce(
      (sum, invoice) => sum + parseFloat(invoice.amount.replace("$", "")),
      0
    );

  // Filter data first
  const filteredData = invoiceData.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.itemsList.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPaymentMethod =
      paymentMethodFilter === "All Methods" ||
      invoice.paymentMethod === paymentMethodFilter;
    const matchesStatus =
      statusFilter === "All Status" || invoice.status === statusFilter;

    // Date filtering logic
    const matchesDate =
      selectedDate === "" ||
      (() => {
        // Convert invoice date from "Nov 11, 2025" format to comparable date
        const invoiceDate = new Date(invoice.date);
        const selectedDateObj = new Date(selectedDate);

        // Compare only the date part (ignore time)
        return invoiceDate.toDateString() === selectedDateObj.toDateString();
      })();

    return (
      matchesSearch && matchesPaymentMethod && matchesStatus && matchesDate
    );
  });

  // Calculate pagination based on filtered data
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, paymentMethodFilter, statusFilter, selectedDate]);

  const handlePaymentMethodFilterChange = (method) => {
    setPaymentMethodFilter(method);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleView = (invoiceId) => {
    // Navigate to InvoiceDetail with the invoice ID
    navigate(`/invoice/detail/${invoiceId}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "invoice-status-completed";
      case "Pending":
        return "invoice-status-pending";
      case "Refunded":
        return "invoice-status-refunded";
      default:
        return "invoice-status-default";
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Card":
        return "💳";
      case "Cash":
        return "💰";
      case "E-Wallet":
        return "📱";
      default:
        return "💳";
    }
  };

  return (
    <div className="invoice-report-view">
      {/* Header */}
      <div className="invoice-page-header">
        <h1 className="invoice-page-title">Invoices</h1>
      </div>

      {/* Stats Cards */}
      <div className="invoice-stats-section">
        <div className="invoice-stats-grid">
          <div className="invoice-stat-card">
            <div className="invoice-stat-icon invoice-stat-revenue">$</div>
            <div className="invoice-stat-content">
              <div className="invoice-stat-label">Total Revenue</div>
              <div className="invoice-stat-number">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="invoice-stat-sublabel">+6 completed</div>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon invoice-stat-invoices">📋</div>
            <div className="invoice-stat-content">
              <div className="invoice-stat-label">Total Invoices</div>
              <div className="invoice-stat-number">{totalInvoices}</div>
              <div className="invoice-stat-sublabel">invoices</div>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon invoice-stat-completed">✓</div>
            <div className="invoice-stat-content">
              <div className="invoice-stat-label">Completed</div>
              <div className="invoice-stat-number">
                {completedInvoices}/{totalInvoices}
              </div>
              <div className="invoice-stat-sublabel">transactions</div>
            </div>
          </div>

          <div className="invoice-stat-card">
            <div className="invoice-stat-icon invoice-stat-refunded">↩️</div>
            <div className="invoice-stat-content">
              <div className="invoice-stat-label">Total Refunded</div>
              <div className="invoice-stat-number">
                ${totalRefunded.toFixed(2)}
              </div>
              <div className="invoice-stat-sublabel">1 refunds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="invoice-filters-section">
        <div className="invoice-left-filters">
          <div className="invoice-search-container">
            <FaSearch className="invoice-search-icon" />
            <input
              type="text"
              placeholder="Search invoice ID, customer name, or item..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="invoice-search-input"
            />
          </div>

          <div className="invoice-dropdown">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="invoice-date-picker"
              title="Select date"
            />
          </div>

          <div className="invoice-dropdown">
            <select
              value={paymentMethodFilter}
              onChange={(e) => handlePaymentMethodFilterChange(e.target.value)}
              className="invoice-filter-select"
            >
              <option value="All Methods">All Methods</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>
          </div>

          <div className="invoice-dropdown">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="invoice-filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((invoice, index) => (
              <tr key={`page-${currentPage}-${invoice.id}-${index}`}>
                <td className="invoice-id">
                  <div className="invoice-number">{invoice.id}</div>
                  <div className="invoice-txn">{invoice.txnNumber}</div>
                </td>
                <td className="invoice-datetime">
                  <div className="invoice-date">{invoice.date}</div>
                  <div className="invoice-time">{invoice.time}</div>
                </td>
                <td className="invoice-customer">
                  <div className="invoice-customer-info">
                    <div className="invoice-customer-initials">
                      {invoice.customerInitials}
                    </div>
                    <div className="invoice-customer-details">
                      <div className="invoice-customer-name">
                        {invoice.customer}
                      </div>
                      <div className="invoice-staff">{invoice.staff}</div>
                    </div>
                  </div>
                </td>
                <td className="invoice-items">
                  <div className="invoice-item-count">{invoice.items}</div>
                  <div className="invoice-item-list">{invoice.itemsList}</div>
                </td>
                <td className="invoice-amount">
                  <div className="invoice-total">{invoice.amount}</div>
                  {invoice.status === "Refunded" && (
                    <div className="invoice-refund-note">$2.00</div>
                  )}
                </td>
                <td className="invoice-payment">
                  <div className="invoice-payment-method">
                    <span className="invoice-payment-icon">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                    </span>
                    {invoice.paymentMethod}
                  </div>
                </td>
                <td>
                  <span
                    className={`invoice-status-badge ${getStatusBadgeClass(
                      invoice.status
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="invoice-action-buttons">
                  <button
                    className="invoice-action-btn invoice-view-btn"
                    onClick={() => handleView(invoice.id)}
                    title="View Details"
                  >
                    View <span className="invoice-arrow">›</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="invoice-pagination-section">
        <div className="invoice-pagination-info">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>
        <div className="invoice-pagination-controls">
          <button
            className="invoice-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="invoice-page-numbers">
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
                  className={`invoice-page-number ${
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
            className="invoice-pagination-btn"
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

export default InvoiceListView;
