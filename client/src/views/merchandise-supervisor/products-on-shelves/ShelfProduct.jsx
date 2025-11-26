import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaBox,
  FaDollarSign,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import { TbBoxOff } from "react-icons/tb";
import "./ShelfProduct.css";

const ShelfProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("All suppliers");
  const [shelfLocationFilter, setShelfLocationFilter] =
    useState("All locations");
  const [sectionFilter, setSectionFilter] = useState("All sections");
  const [slotFilter, setSlotFilter] = useState("All slots");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample shelf product data with multiple locations for same product ID
  const shelfProductData = [
    {
      id: "P001",
      name: "Coca Cola 330ml",
      category: "Beverages",
      brand: "Coca-Cola",
      price: "$1.99",
      stock: 45,
      lowStockThreshold: 50,
      supplier: "Beverage Co.",
      status: "Low Stock",
      shelfLocation: "A1",
      section: "A",
      slot: "12",
    },
    {
      id: "P001",
      name: "Coca Cola 330ml",
      category: "Beverages",
      brand: "Coca-Cola",
      price: "$1.99",
      stock: 60,
      lowStockThreshold: 50,
      supplier: "Beverage Co.",
      status: "In Stock",
      shelfLocation: "D2",
      section: "D",
      slot: "08",
    },
    {
      id: "P002",
      name: "White Bread",
      category: "Bakery",
      brand: "Wonder Bread",
      price: "$2.49",
      stock: 25,
      lowStockThreshold: 30,
      supplier: "Bakery Supply",
      status: "Low Stock",
      shelfLocation: "C1",
      section: "C",
      slot: "15",
    },
    {
      id: "P003",
      name: "Milk 1L",
      category: "Dairy",
      brand: "Fresh Farms",
      price: "$3.99",
      stock: 0,
      lowStockThreshold: 20,
      supplier: "Dairy Products Inc",
      status: "Out of Stock",
      shelfLocation: "A2",
      section: "A",
      slot: "20",
    },
    {
      id: "P003",
      name: "Milk 1L",
      category: "Dairy",
      brand: "Fresh Farms",
      price: "$3.99",
      stock: 35,
      lowStockThreshold: 20,
      supplier: "Dairy Products Inc",
      status: "In Stock",
      shelfLocation: "F1",
      section: "F",
      slot: "03",
    },
    {
      id: "P004",
      name: "Banana (per kg)",
      category: "Fruits",
      brand: "Fresh Produce",
      price: "$2.99",
      stock: 80,
      lowStockThreshold: 25,
      supplier: "Fruit Distributors",
      status: "In Stock",
      shelfLocation: "B3",
      section: "B",
      slot: "14",
    },
    {
      id: "P004",
      name: "Banana (per kg)",
      category: "Fruits",
      brand: "Fresh Produce",
      price: "$2.99",
      stock: 40,
      lowStockThreshold: 25,
      supplier: "Fruit Distributors",
      status: "In Stock",
      shelfLocation: "B1",
      section: "B",
      slot: "07",
    },
    {
      id: "P005",
      name: "Chicken Breast (per kg)",
      category: "Meat",
      brand: "Premium Meat",
      price: "$12.99",
      stock: 35,
      lowStockThreshold: 15,
      supplier: "Meat Suppliers Ltd",
      status: "In Stock",
      shelfLocation: "E1",
      section: "E",
      slot: "22",
    },
    {
      id: "P006",
      name: "Shampoo 400ml",
      category: "Personal Care",
      brand: "Head & Shoulders",
      price: "$6.99",
      stock: 12,
      lowStockThreshold: 20,
      supplier: "Beauty Supplies",
      status: "Low Stock",
      shelfLocation: "G1",
      section: "G",
      slot: "09",
    },
    {
      id: "P007",
      name: "Rice 5kg",
      category: "Grains",
      brand: "Golden Grain",
      price: "$8.99",
      stock: 22,
      lowStockThreshold: 10,
      supplier: "Grain Wholesale",
      status: "In Stock",
      shelfLocation: "C2",
      section: "C",
      slot: "18",
    },
    {
      id: "P007",
      name: "Rice 5kg",
      category: "Grains",
      brand: "Golden Grain",
      price: "$8.99",
      stock: 18,
      lowStockThreshold: 10,
      supplier: "Grain Wholesale",
      status: "In Stock",
      shelfLocation: "E2",
      section: "E",
      slot: "11",
    },
    {
      id: "P008",
      name: "Dish Soap 500ml",
      category: "Household",
      brand: "Clean & Fresh",
      price: "$3.49",
      stock: 55,
      lowStockThreshold: 20,
      supplier: "Cleaning Supplies Co",
      status: "In Stock",
      shelfLocation: "G2",
      section: "G",
      slot: "16",
    },
  ];

  const itemsPerPage = 10;

  // Filter data
  const filteredData = shelfProductData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier =
      supplierFilter === "All suppliers" || product.supplier === supplierFilter;
    const matchesLocation =
      shelfLocationFilter === "All locations" ||
      product.shelfLocation === shelfLocationFilter;
    const matchesSection =
      sectionFilter === "All sections" || product.section === sectionFilter;
    const matchesSlot =
      slotFilter === "All slots" || product.slot === slotFilter;
    const matchesCategory =
      categoryFilter === "All categories" ||
      product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All status" || product.status === statusFilter;

    return (
      matchesSearch &&
      matchesSupplier &&
      matchesLocation &&
      matchesSection &&
      matchesSlot &&
      matchesCategory &&
      matchesStatus
    );
  });

  // Sort by productID, shelf, section, slot
  const sortedData = filteredData.sort((a, b) => {
    if (a.id !== b.id) {
      return a.id.localeCompare(b.id);
    }
    if (a.shelfLocation !== b.shelfLocation) {
      return a.shelfLocation.localeCompare(b.shelfLocation);
    }
    if (a.section !== b.section) {
      return a.section.localeCompare(b.section);
    }
    return a.slot.localeCompare(b.slot);
  });

  // Calculate pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Calculate stats
  const totalProducts = sortedData.length;
  const totalValue = sortedData.reduce((sum, product) => {
    const price = parseFloat(product.price.replace("$", ""));
    return sum + price * product.stock;
  }, 0);
  const lowStockProducts = sortedData.filter(
    (p) => p.status === "Low Stock"
  ).length;
  const outOfStockProducts = sortedData.filter(
    (p) => p.status === "Out of Stock"
  ).length;

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    supplierFilter,
    shelfLocationFilter,
    sectionFilter,
    slotFilter,
    categoryFilter,
    statusFilter,
  ]);

  const handleView = (productId, shelfLocation) => {
    console.log("View product:", productId, "at location:", shelfLocation);
  };

  const handleEdit = (productId, shelfLocation) => {
    console.log("Edit product:", productId, "at location:", shelfLocation);
  };

  const handleDelete = (productId, shelfLocation) => {
    console.log("Delete product:", productId, "at location:", shelfLocation);
  };

  const handleAddProduct = () => {
    console.log("Add new product");
    // Add navigation or modal logic here
  };

  const getStockBadgeClass = (status) => {
    switch (status) {
      case "In Stock":
        return "shelf-status-approved";
      case "Low Stock":
        return "shelf-status-pending";
      case "Out of Stock":
        return "shelf-status-declined";
      default:
        return "shelf-status-default";
    }
  };

  // Get unique values for filters
  const uniqueSuppliers = [...new Set(shelfProductData.map((p) => p.supplier))];
  const uniqueLocations = [
    ...new Set(shelfProductData.map((p) => p.shelfLocation)),
  ].sort();
  const uniqueSections = [
    ...new Set(shelfProductData.map((p) => p.section)),
  ].sort();
  const uniqueSlots = [...new Set(shelfProductData.map((p) => p.slot))].sort();
  const uniqueCategories = [
    ...new Set(shelfProductData.map((p) => p.category)),
  ].sort();
  const uniqueStatus = [
    ...new Set(shelfProductData.map((p) => p.status)),
  ].sort();

  return (
    <div className="shelf-product-view">
      {/* Header */}
      <div className="shelf-page-header">
        <h1 className="shelf-page-title">Shelf Product Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="shelf-stats-section">
        <div className="shelf-stats-grid">
          <div className="shelf-stat-card">
            <div className="shelf-stat-icon shelf-total">
              <FaBox />
            </div>
            <div className="shelf-stat-content">
              <div className="shelf-stat-number">{totalProducts}</div>
              <div className="shelf-stat-label">Total Items</div>
            </div>
          </div>

          <div className="shelf-stat-card">
            <div className="shelf-stat-icon shelf-value">
              <FaDollarSign />
            </div>
            <div className="shelf-stat-content">
              <div className="shelf-stat-number">
                ${totalValue.toLocaleString()}
              </div>
              <div className="shelf-stat-label">Total Value</div>
            </div>
          </div>

          <div className="shelf-stat-card">
            <div className="shelf-stat-icon shelf-warning">
              <FaExclamationTriangle />
            </div>
            <div className="shelf-stat-content">
              <div className="shelf-stat-number">{lowStockProducts}</div>
              <div className="shelf-stat-label">Low Stock</div>
            </div>
          </div>

          <div className="shelf-stat-card">
            <div className="shelf-stat-icon shelf-danger">
              <TbBoxOff />
            </div>
            <div className="shelf-stat-content">
              <div className="shelf-stat-number">{outOfStockProducts}</div>
              <div className="shelf-stat-label">Out of Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="shelf-filters-section">
        <div className="shelf-search-container">
          <FaSearch className="shelf-search-icon" />
          <input
            type="text"
            placeholder="Search product by name, id, supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="shelf-search-input"
          />
        </div>

        <div className="shelf-filter-grid">
          {/* First row: Supplier, Categories, Status */}
          <div className="shelf-filter-row">
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All suppliers">All suppliers</option>
              {uniqueSuppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All categories">All categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All status">All status</option>
              {uniqueStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Second row: Shelf, Section, Slot */}
          <div className="shelf-filter-row">
            <select
              value={shelfLocationFilter}
              onChange={(e) => setShelfLocationFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All locations">All locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <select
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All sections">All sections</option>
              {uniqueSections.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <select
              value={slotFilter}
              onChange={(e) => setSlotFilter(e.target.value)}
              className="shelf-filter-select"
            >
              <option value="All slots">All slots</option>
              {uniqueSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="shelf-action-buttons">
          <button onClick={handleAddProduct} className="shelf-add-btn">
            <FaPlus className="shelf-add-icon" />
            Add Product
          </button>

          <button
            onClick={() => {
              setSearchTerm("");
              setSupplierFilter("All suppliers");
              setShelfLocationFilter("All locations");
              setSectionFilter("All sections");
              setSlotFilter("All slots");
              setCategoryFilter("All categories");
              setStatusFilter("All status");
            }}
            className="shelf-clear-btn"
          >
            Clear all filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="shelf-table-container">
        <table className="shelf-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Category & Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((product, index) => (
              <tr key={`${product.id}-${product.shelfLocation}-${index}`}>
                <td className="shelf-product-id-cell">{product.id}</td>
                <td className="shelf-product-name-cell">
                  <div className="shelf-product-name">{product.name}</div>
                  <div className="shelf-location-info">
                    {product.shelfLocation} - Section {product.section} - Slot{" "}
                    {product.slot}
                  </div>
                </td>
                <td>
                  <div className="shelf-product-category">
                    <div className="shelf-category">{product.category}</div>
                    <div className="shelf-brand">{product.brand}</div>
                  </div>
                </td>
                <td className="shelf-product-price">{product.price}</td>
                <td>
                  <div className="shelf-stock-info">
                    <div className="shelf-stock-number">
                      {product.stock} units
                    </div>
                    <div className="shelf-stock-threshold">
                      Min: {product.lowStockThreshold}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`shelf-status-badge ${getStockBadgeClass(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="shelf-action-buttons">
                    <button
                      className="shelf-action-btn shelf-view-btn"
                      onClick={() =>
                        handleView(product.id, product.shelfLocation)
                      }
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="shelf-action-btn shelf-edit-btn"
                      onClick={() =>
                        handleEdit(product.id, product.shelfLocation)
                      }
                      title="Edit Product"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="shelf-action-btn shelf-delete-btn"
                      onClick={() =>
                        handleDelete(product.id, product.shelfLocation)
                      }
                      title="Delete Product"
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
      <div className="shelf-pagination-section">
        <div className="shelf-pagination-info">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>
        <div className="shelf-pagination-controls">
          <button
            className="shelf-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="shelf-page-numbers">
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
                  className={`shelf-page-number ${
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
            className="shelf-pagination-btn"
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

export default ShelfProduct;
