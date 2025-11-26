import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CustomerModal from "../../../components/CustomerModal/CustomerModal";
import DeleteCustomerConfirmationModal from "../../../components/CustomerModal/DeleteCustomerConfirmationModal";
import "./CustomerListView.css";

const CustomerListView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("All Memberships");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  // Sample customer data - matching the design structure
  const customerData = [
    {
      id: "001",
      name: "John Smith",
      email: "john@gmail.com",
      phone: "+1234567890",
      membership: "Regular",
      joinDate: "Jan 15, 2024",
      status: "Active",
      totalPurchases: "$2200.00",
      points: 100,
      address: "123 Main St, City, CA 94001",
    },
    {
      id: "002",
      name: "John Smith",
      email: "john@gmail.com",
      phone: "+1234567890",
      membership: "Silver",
      joinDate: "Jan 15, 2024",
      status: "Inactive",
      totalPurchases: "$2200.00",
      points: 100,
    },
    {
      id: "003",
      name: "John Smith",
      email: "john@gmail.com",
      phone: "+1234567890",
      membership: "Platinum",
      joinDate: "Jan 15, 2024",
      status: "Inactive",
      totalPurchases: "$2200.00",
      points: 100,
    },
    {
      id: "004",
      name: "John Smith",
      email: "john@gmail.com",
      phone: "+1234567890",
      membership: "Gold",
      joinDate: "Jan 15, 2024",
      status: "Inactive",
      totalPurchases: "$2200.00",
      points: 100,
    },
    {
      id: "005",
      name: "Emma Wilson",
      email: "emma@gmail.com",
      phone: "+1 234 567-8902",
      membership: "Silver",
      joinDate: "Feb 20, 2024",
      status: "Active",
      totalPurchases: "$1850.00",
      points: 75,
    },
    {
      id: "006",
      name: "Michael Brown",
      email: "michael@gmail.com",
      phone: "+1 234 567-8903",
      membership: "Gold",
      joinDate: "Mar 10, 2024",
      status: "Active",
      totalPurchases: "$3200.00",
      points: 160,
    },
    {
      id: "007",
      name: "Sarah Davis",
      email: "sarah@gmail.com",
      phone: "+1 234 567-8904",
      membership: "Regular",
      joinDate: "Apr 05, 2024",
      status: "Inactive",
      totalPurchases: "$950.00",
      points: 45,
    },
    {
      id: "008",
      name: "James Johnson",
      email: "james@gmail.com",
      phone: "+1 234 567-8905",
      membership: "Platinum",
      joinDate: "May 15, 2024",
      status: "Active",
      totalPurchases: "$4500.00",
      points: 225,
    },
    {
      id: "009",
      name: "Lisa Anderson",
      email: "lisa@gmail.com",
      phone: "+1 234 567-8906",
      membership: "Regular",
      joinDate: "Jun 01, 2024",
      status: "Active",
      totalPurchases: "$1200.00",
      points: 60,
    },
    {
      id: "010",
      name: "Robert Taylor",
      email: "robert@gmail.com",
      phone: "+1 234 567-8907",
      membership: "Silver",
      joinDate: "Jul 20, 2024",
      status: "Inactive",
      totalPurchases: "$1750.00",
      points: 85,
    },
    {
      id: "011",
      name: "Jennifer White",
      email: "jennifer@gmail.com",
      phone: "+1 234 567-8908",
      membership: "Gold",
      joinDate: "Aug 10, 2024",
      status: "Active",
      totalPurchases: "$2800.00",
      points: 140,
    },
    {
      id: "012",
      name: "David Miller",
      email: "david@gmail.com",
      phone: "+1 234 567-8909",
      membership: "Regular",
      joinDate: "Sep 05, 2024",
      status: "Active",
      totalPurchases: "$890.00",
      points: 44,
    },
  ];

  const itemsPerPage = 10;

  // Calculate stats for header cards
  const totalCustomers = customerData.length;
  const premiumMembers = customerData.filter(
    (c) => c.membership === "Gold" || c.membership === "Platinum"
  ).length;
  const activeCustomers = customerData.filter(
    (c) => c.status === "Active"
  ).length;

  // Filter data first
  const filteredData = customerData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership =
      membershipFilter === "All Memberships" ||
      customer.membership === membershipFilter;
    const matchesStatus =
      statusFilter === "All Status" || customer.status === statusFilter;
    return matchesSearch && matchesMembership && matchesStatus;
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
  }, [searchTerm, membershipFilter, statusFilter]);

  const handleMembershipFilterChange = (membership) => {
    setMembershipFilter(membership);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleAddCustomer = () => {
    console.log("Add new customer");
    navigate("/customer/add");
  };

  const handleEdit = (customerId) => {
    console.log("Edit customer:", customerId);
    navigate(`/customer/edit/${customerId}`);
  };

  const handleDelete = (customerId) => {
    const customer = customerData.find((c) => c.id === customerId);
    if (customer) {
      setCustomerToDelete(customer);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      console.log("Deleting customer:", customerToDelete.id);
      // Add your actual delete logic here

      // Reset state
      setCustomerToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setCustomerToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleView = (customerId) => {
    const customer = customerData.find((c) => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "customer-status-approved";
      case "Inactive":
        return "customer-status-declined";
      default:
        return "customer-status-default";
    }
  };

  const getMembershipBadgeClass = (membership) => {
    switch (membership) {
      case "Regular":
        return "customer-membership-regular";
      case "Silver":
        return "customer-membership-silver";
      case "Gold":
        return "customer-membership-gold";
      case "Platinum":
        return "customer-membership-platinum";
      default:
        return "customer-membership-default";
    }
  };

  return (
    <div className="customer-list-view">
      {/* Header */}
      <div className="customer-page-header">
        <h1 className="customer-page-title">Customers</h1>
      </div>

      {/* Stats Cards */}
      <div className="customer-stats-section">
        <div className="customer-stats-grid">
          <div className="customer-stat-card">
            <div className="customer-stat-content">
              <div className="customer-stat-label">Total Customers</div>
              <div className="customer-stat-number">{totalCustomers}</div>
              <div className="customer-stat-sublabel-grey ">Active</div>
            </div>
          </div>

          <div className="customer-stat-card">
            <div className="customer-stat-content">
              <div className="customer-stat-label">Premium Members</div>
              <div className="customer-stat-number">{premiumMembers}</div>
              <div className="customer-stat-sublabel">Gold & Platinum</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="customer-filters-section">
        <div className="customer-left-filters">
          <div className="customer-search-container">
            <FaSearch className="customer-search-icon" />
            <input
              type="text"
              placeholder="Search customers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="customer-search-input"
            />
          </div>

          <div className="customer-dropdown">
            <select
              value={membershipFilter}
              onChange={(e) => handleMembershipFilterChange(e.target.value)}
              className="customer-filter-select"
            >
              <option value="All Memberships">All Memberships</option>
              <option value="Regular">Regular</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          <div className="customer-dropdown">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="customer-filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button className="customer-add-btn" onClick={handleAddCustomer}>
          <FaPlus className="customer-add-icon" />
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Membership</th>
              <th>Total purchases</th>
              <th>Points</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((customer, index) => (
              <tr key={`page-${currentPage}-${customer.id}-${index}`}>
                <td className="customer-id">{customer.id}</td>
                <td className="customer-info">
                  <div className="customer-name">{customer.name}</div>
                  <div className="customer-join-date">
                    Member since {customer.joinDate}
                  </div>
                </td>
                <td className="customer-contact">
                  <div className="customer-email">{customer.email}</div>
                  <div className="customer-phone">{customer.phone}</div>
                </td>
                <td>
                  <span
                    className={`customer-membership-badge ${getMembershipBadgeClass(
                      customer.membership
                    )}`}
                  >
                    {customer.membership}
                  </span>
                </td>
                <td className="customer-purchases">
                  {customer.totalPurchases}
                </td>
                <td className="customer-points">{customer.points}</td>
                <td>
                  <span
                    className={`customer-status-badge ${getStatusBadgeClass(
                      customer.status
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="customer-action-buttons">
                  <button
                    className="customer-action-btn customer-view-btn"
                    onClick={() => handleView(customer.id)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="customer-action-btn customer-edit-btn"
                    onClick={() => handleEdit(customer.id)}
                    title="Edit Customer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    style={{ display: "none" }}
                    className="customer-action-btn customer-delete-btn"
                    onClick={() => handleDelete(customer.id)}
                    title="Delete Customer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="customer-pagination-section">
        <div className="customer-pagination-info">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>
        <div className="customer-pagination-controls">
          <button
            className="customer-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="customer-page-numbers">
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
                  className={`customer-page-number ${
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
            className="customer-pagination-btn"
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

      {/* Customer Details Modal */}
      <CustomerModal
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCustomerConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CustomerListView;
