import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaShoppingCart,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import SupplierModal from "../../../components/SupplierModal/SupplierModal";
import SupplierOrderModal from "../../../components/SupplierModal/SupplierOrderModal";
import SupplierDeleteConfirmationModal from "../../../components/SupplierModal/SupplierDeleteConfirmationModal";
import "./SupplierListView.css";

const SupplierListView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState("suppliers"); // "suppliers" or "orders"
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Sample supplier data
  const supplierData = [
    {
      id: "001",
      name: "Supplier 1",
      contactPerson: "Sarah Miller",
      phone: "+1234567890",
      contact: "Sarah Miller\n+1234567890",
      category: "Category 1",
      orders: 38,
      lastOrder: "Oct 30, 2025",
      status: "Active",
      email: "sarah@gmail.com",
      address: "456 Milk Lane, Cream City, CA 94124",
    },
    {
      id: "002",
      name: "Supplier B",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 13,
      lastOrder: "Oct 15, 2025",
      status: "Active",
      email: "supplierb@email.com",
      address: "456 Commerce Ave, City, State 12345",
    },
    {
      id: "003",
      name: "Supplier C",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 14,
      lastOrder: "Oct 15, 2025",
      status: "Active",
      email: "supplierc@email.com",
      address: "789 Trade Blvd, City, State 12345",
    },
    {
      id: "004",
      name: "Supplier D",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 15,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierd@email.com",
      address: "321 Supply Lane, City, State 12345",
    },
    {
      id: "005",
      name: "Supplier E",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 16,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "suppliere@email.com",
      address: "654 Vendor St, City, State 12345",
    },
    {
      id: "006",
      name: "Supplier F",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 17,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierf@email.com",
      address: "987 Distribution Dr, City, State 12345",
    },
    {
      id: "007",
      name: "Supplier G",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 19,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierg@email.com",
      address: "147 Wholesale Way, City, State 12345",
    },
    {
      id: "001",
      name: "Supplier A",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 12,
      lastOrder: "Oct 15, 2025",
      status: "Active",
      email: "suppliera@email.com",
      address: "123 Business St, City, State 12345",
    },
    {
      id: "002",
      name: "Supplier B",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 13,
      lastOrder: "Oct 15, 2025",
      status: "Active",
      email: "supplierb@email.com",
      address: "456 Commerce Ave, City, State 12345",
    },
    {
      id: "003",
      name: "Supplier C",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 14,
      lastOrder: "Oct 15, 2025",
      status: "Active",
      email: "supplierc@email.com",
      address: "789 Trade Blvd, City, State 12345",
    },
    {
      id: "004",
      name: "Supplier D",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 15,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierd@email.com",
      address: "321 Supply Lane, City, State 12345",
    },
    {
      id: "005",
      name: "Supplier E",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 16,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "suppliere@email.com",
      address: "654 Vendor St, City, State 12345",
    },
    {
      id: "006",
      name: "Supplier F",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 17,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierf@email.com",
      address: "987 Distribution Dr, City, State 12345",
    },
    {
      id: "007",
      name: "Supplier G",
      contact: "Supplier 1\n+1 234-567-8901",
      category: "Category 1",
      orders: 19,
      lastOrder: "Oct 15, 2025",
      status: "Inactive",
      email: "supplierg@email.com",
      address: "147 Wholesale Way, City, State 12345",
    },
  ];

  // Sample order data for Order List section
  const orderData = [
    {
      id: "ORD-2025-001",
      supplier: "Fresh Farm Produce Co.",
      orderDate: "Oct 28, 2025",
      deliveryDate: "Nov 02, 2025",
      items: [
        { product: "Fresh Tomatoes", unit: "kg", quantity: 12 },
        { product: "Fresh Tomatoes", unit: "box", quantity: 11 },
        { product: "Fresh Tomatoes", unit: "g", quantity: 4 },
      ],
      amount: "$123",
      status: "Delivered",
      notes: "Urgent delivery required",
    },
    {
      id: "ORD02",
      supplier: "Supplier 2",
      orderDate: "06-01-2025",
      deliveryDate: "06-01-2025",
      items: [], // Empty array - sẽ trigger alert
      amount: "$123",
      status: "Pending",
    },
    {
      id: "ORD03",
      supplier: "Supplier 3",
      orderDate: "06-01-2025",
      deliveryDate: "06-01-2025",
      amount: "$123",
      status: "Delivered",
      // Không có items field - sẽ trigger alert
    },
    {
      id: "ORD04",
      supplier: "Supplier 4",
      orderDate: "06-01-2025",
      deliveryDate: "06-01-2025",
      items: 1, // Number thay vì array - sẽ trigger alert
      amount: "$123",
      status: "Cancelled",
    },
    {
      id: "ORD05",
      supplier: "Supplier 5",
      orderDate: "06-01-2025",
      deliveryDate: "06-01-2025",
      items: 1,
      amount: "$123",
      status: "Pending",
    },
  ];

  // Order statistics
  const getOrderStats = () => {
    const totalOrders = orderData.length;
    const pendingOrders = orderData.filter(
      (o) => o.status === "Pending"
    ).length;
    const cancelledOrders = orderData.filter(
      (o) => o.status === "Cancelled"
    ).length;
    const deliveredOrders = orderData.filter(
      (o) => o.status === "Delivered"
    ).length;

    return {
      totalOrders,
      pendingOrders,
      cancelledOrders,
      deliveredOrders,
    };
  };

  const orderStats = getOrderStats();

  // Filter logic
  const filteredSuppliers = supplierData.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || supplier.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      supplier.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalItems = filteredSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSuppliers = filteredSuppliers.slice(startIndex, endIndex);

  // Order filtering and pagination
  const filteredOrders = orderData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(orderSearchTerm.toLowerCase());
    const matchesStatus =
      orderStatusFilter === "All Status" || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOrderItems = filteredOrders.length;
  const totalOrderPages = Math.ceil(totalOrderItems / itemsPerPage);
  const orderStartIndex = (currentPage - 1) * itemsPerPage;
  const orderEndIndex = orderStartIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(orderStartIndex, orderEndIndex);

  // Event handlers
  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleOrderSearchTermChange = (value) => {
    setOrderSearchTerm(value);
    setCurrentPage(1);
  };

  const handleOrderStatusFilterChange = (value) => {
    setOrderStatusFilter(value);
    setCurrentPage(1);
  };
  const handleAddSupplier = () => {
    navigate("/supplier/add");
  };

  const handleEdit = (supplierId) => {
    navigate(`/supplier/edit/${supplierId}`);
  };

  const handleView = (supplierId) => {
    console.log("View button clicked, supplierId:", supplierId);
    const supplier = supplierData.find((s) => s.id === supplierId);
    console.log("Found supplier:", supplier);
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
    console.log("Modal should be open now");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleViewOrder = (orderId) => {
    const order = orderData.find((o) => o.id === orderId);

    // Kiểm tra nếu không có items data hoặc items không phải là array
    if (
      !order ||
      !order.items ||
      !Array.isArray(order.items) ||
      order.items.length === 0
    ) {
      setAlertMessage(
        "No detailed items information available for this order."
      );
      setShowAlert(true);
      return;
    }

    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  const handleDelete = (supplierId) => {
    const supplier = supplierData.find((s) => s.id === supplierId);
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (supplierToDelete) {
      console.log("Confirmed delete supplier:", supplierToDelete.id);
      // Add actual delete logic here
      // For now, just close the modal
      setShowDeleteModal(false);
      setSupplierToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSupplierToDelete(null);
  };

  const handlePlaceOrder = (supplierId) => {
    navigate(`/supplier/place-order/${supplierId}`);
  };

  const getStatusClass = (status) => {
    return status === "Active" ? "active" : "inactive";
  };

  return (
    <div className="supplier-list-container">
      {/* Header */}
      <div className="supplier-header">
        <h1 className="supplier-title">Supplier Management</h1>
      </div>

      {/* Section Toggle */}
      <div className="section-toggle">
        <button
          className={`toggle-btn ${
            activeSection === "suppliers" ? "active" : ""
          }`}
          onClick={() => setActiveSection("suppliers")}
        >
          <FaBuilding className="toggle-icon" />
          Supplier List
        </button>
        <button
          className={`toggle-btn ${activeSection === "orders" ? "active" : ""}`}
          onClick={() => setActiveSection("orders")}
        >
          <FaShoppingCart className="toggle-icon" />
          Order List
        </button>
      </div>

      {activeSection === "suppliers" ? (
        <>
          {/* Filters and Search */}
          <div className="supplier-filters-section">
            <div className="left-filters">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search suppliers"
                  value={searchTerm}
                  onChange={(e) => handleSearchTermChange(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="dropdown">
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusFilterChange(e.target.value)}
                  className="filter-select"
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="dropdown">
                <select
                  value={categoryFilter}
                  onChange={(e) => handleCategoryFilterChange(e.target.value)}
                  className="filter-select"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                </select>
              </div>
            </div>

            <div className="right-actions">
              <button onClick={handleAddSupplier} className="add-supplier-btn">
                <FaPlus />
                Add Supplier
              </button>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="supplier-table-container">
            <table className="supplier-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Supplier Name</th>
                  <th>Contact</th>
                  <th>Category</th>
                  <th>Orders</th>
                  <th>Last order</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSuppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td className="supplier-name">{supplier.name}</td>
                    <td className="supplier-contact">
                      <div className="contact-info">
                        {supplier.contact.split("\n").map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </td>
                    <td>{supplier.category}</td>
                    <td>{supplier.orders}</td>
                    <td>{supplier.lastOrder}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          supplier.status
                        )}`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn order-btn"
                          onClick={() => handlePlaceOrder(supplier.id)}
                          title="Place Order"
                        >
                          <FaShoppingCart />
                        </button>
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleView(supplier.id)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(supplier.id)}
                          title="Edit Supplier"
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(supplier.id)}
                          title="Delete Supplier"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="supplier-pagination-section">
            <div className="supplier-pagination-info">
              Showing {totalItems > 0 ? startIndex + 1 : 0}-
              {Math.min(endIndex, totalItems)} of {totalItems}
            </div>
            <div className="supplier-pagination-controls">
              <button
                className="supplier-pagination-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                title="Previous page"
              >
                ‹
              </button>

              {/* Page numbers */}
              <div className="supplier-page-numbers">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;

                  if (totalPages <= 3) {
                    // If total pages is 3 or less, show all pages
                    pageNum = i + 1;
                  } else if (currentPage === 1) {
                    // If current page is 1, show pages 1, 2, 3
                    pageNum = i + 1;
                  } else if (currentPage === totalPages) {
                    // If current page is the last page, show last-2, last-1, last
                    pageNum = totalPages - 2 + i;
                  } else {
                    // Otherwise, show current-1, current, current+1
                    pageNum = currentPage - 1 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`supplier-page-number ${
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
                className="supplier-pagination-btn"
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
        </>
      ) : (
        // Order List Section
        <div className="order-list-section">
          {/* Order Statistics */}
          <div className="order-stats-grid">
            <div className="stat-card total">
              <div className="stat-content">
                <div className="stat-number">{orderStats.totalOrders}</div>
                <div className="stat-label">Total Orders</div>
                <div className="stat-sublabel">All time</div>
              </div>
            </div>

            <div className="stat-card pending">
              <div className="stat-content">
                <div className="stat-number">{orderStats.pendingOrders}</div>
                <div className="stat-label">Pending</div>
                <div className="stat-sublabel">Await</div>
              </div>
            </div>

            <div className="stat-card cancelled">
              <div className="stat-content">
                <div className="stat-number">{orderStats.cancelledOrders}</div>
                <div className="stat-label">Cancelled</div>
                <div className="stat-sublabel">Rejected</div>
              </div>
            </div>

            <div className="stat-card delivered">
              <div className="stat-content">
                <div className="stat-number">{orderStats.deliveredOrders}</div>
                <div className="stat-label">Delivered</div>
                <div className="stat-sublabel">Completed</div>
              </div>
            </div>
          </div>

          {/* Order Filters */}
          <div className="order-filters-section">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search orders"
                value={orderSearchTerm}
                onChange={(e) => handleOrderSearchTermChange(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="dropdown">
              <select
                value={orderStatusFilter}
                onChange={(e) => handleOrderStatusFilterChange(e.target.value)}
                className="filter-select"
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Supplier</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.supplier}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.deliveryDate}</td>
                    <td>
                      {Array.isArray(order.items)
                        ? order.items.length
                        : order.items}
                    </td>
                    <td>{order.amount}</td>
                    <td>
                      <span
                        className={`status-badge ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleViewOrder(order.id)}
                          title="View Order"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Pagination */}
          <div className="order-pagination-section">
            <div className="order-pagination-info">
              Showing {totalOrderItems > 0 ? orderStartIndex + 1 : 0}-
              {Math.min(orderEndIndex, totalOrderItems)} of {totalOrderItems}
            </div>
            <div className="order-pagination-controls">
              <button
                className="order-pagination-btn"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                title="Previous page"
              >
                ‹
              </button>

              {/* Page numbers */}
              <div className="order-page-numbers">
                {Array.from(
                  { length: Math.min(3, totalOrderPages) },
                  (_, i) => {
                    let pageNum;

                    if (totalOrderPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage === 1) {
                      pageNum = i + 1;
                    } else if (currentPage === totalOrderPages) {
                      pageNum = totalOrderPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`order-page-number ${
                          currentPage === pageNum ? "active" : ""
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                className="order-pagination-btn"
                onClick={() =>
                  setCurrentPage(Math.min(totalOrderPages, currentPage + 1))
                }
                disabled={currentPage === totalOrderPages}
                title="Next page"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && selectedSupplier && (
        <SupplierModal
          supplier={selectedSupplier}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {isOrderModalOpen && selectedOrder && (
        <SupplierOrderModal
          order={selectedOrder}
          isOpen={isOrderModalOpen}
          onClose={handleCloseOrderModal}
        />
      )}

      {/* Alert Modal */}
      {showAlert && (
        <div className="modal-overlay" onClick={handleCloseAlert}>
          <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="alert-header">
              <h3>Information</h3>
              <button className="close-btn" onClick={handleCloseAlert}>
                ×
              </button>
            </div>
            <div className="alert-body">
              <p>{alertMessage}</p>
            </div>
            <div className="alert-footer">
              <button className="alert-ok-btn" onClick={handleCloseAlert}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && supplierToDelete && (
        <SupplierDeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default SupplierListView;
