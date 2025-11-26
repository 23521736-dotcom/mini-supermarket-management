import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaBox,
  FaDollarSign,
  FaExclamationTriangle,
} from "react-icons/fa";
import { TbBoxOff } from "react-icons/tb";
import ProductModal from "../../../components/ProductModal/ProductModal";
import DeleteProductConfirmationModal from "../../../components/ProductModal/DeleteProductConfirmationModal";
import "./ProductListView.css";

const ProductListView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [stockFilter, setStockFilter] = useState("All stock");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample product data
  const productData = [
    {
      id: "P001",
      name: "Coca Cola 330ml",
      category: "Beverages",
      brand: "Coca-Cola",
      price: "$1.99",
      stock: 150,
      lowStockThreshold: 50,
      supplier: "Beverage Co.",
      status: "In Stock",
      dateAdded: "Jan 10, 2024",
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
      dateAdded: "Jan 12, 2024",
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
      dateAdded: "Jan 15, 2024",
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
      dateAdded: "Jan 18, 2024",
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
      dateAdded: "Jan 20, 2024",
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
      dateAdded: "Jan 22, 2024",
    },
    {
      id: "P007",
      name: "Rice 5kg",
      category: "Grains",
      brand: "Golden Rice",
      price: "$8.99",
      stock: 60,
      lowStockThreshold: 30,
      supplier: "Grain Wholesalers",
      status: "In Stock",
      dateAdded: "Jan 25, 2024",
    },
    {
      id: "P008",
      name: "Orange Juice 1L",
      category: "Beverages",
      brand: "Tropicana",
      price: "$4.49",
      stock: 5,
      lowStockThreshold: 25,
      supplier: "Beverage Co.",
      status: "Low Stock",
      dateAdded: "Feb 01, 2024",
    },
    {
      id: "P009",
      name: "Toilet Paper 12-pack",
      category: "Household",
      brand: "Charmin",
      price: "$9.99",
      stock: 45,
      lowStockThreshold: 20,
      supplier: "Household Goods",
      status: "In Stock",
      dateAdded: "Feb 03, 2024",
    },
    {
      id: "P010",
      name: "Tomatoes (per kg)",
      category: "Vegetables",
      brand: "Farm Fresh",
      price: "$3.49",
      stock: 0,
      lowStockThreshold: 15,
      supplier: "Vegetable Market",
      status: "Out of Stock",
      dateAdded: "Feb 05, 2024",
    },
  ];

  // Calculate stats
  const totalProducts = productData.length;
  const lowStockProducts = productData.filter(
    (product) => product.stock > 0 && product.stock <= product.lowStockThreshold
  ).length;
  const outOfStockProducts = productData.filter(
    (product) => product.stock === 0
  ).length;
  const totalValue = productData.reduce(
    (sum, product) =>
      sum + parseFloat(product.price.replace("$", "")) * product.stock,
    0
  );

  // Pagination logic
  const itemsPerPage = 10;
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter and search logic
  const filteredProducts = productData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All categories" ||
      product.category === categoryFilter;

    const matchesStock =
      stockFilter === "All stock" ||
      (stockFilter === "In Stock" && product.status === "In Stock") ||
      (stockFilter === "Low Stock" && product.status === "Low Stock") ||
      (stockFilter === "Out of Stock" && product.status === "Out of Stock");

    return matchesSearch && matchesCategory && matchesStock;
  });

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Event handlers
  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const handleEdit = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleView = (productId) => {
    const product = productData.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (productId) => {
    const product = productData.find((p) => p.id === productId);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      // Here you would typically call an API to delete the product
      console.log("Deleting product:", productToDelete.id);
      // For now, we'll just log it since this is a demo
      // In a real app, you'd update the productData state or refetch from API
    }
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStockBadgeClass = (status) => {
    switch (status) {
      case "In Stock":
        return "status-approved";
      case "Low Stock":
        return "status-pending";
      case "Out of Stock":
        return "status-declined";
      default:
        return "status-default";
    }
  };

  return (
    <div className="product-list-view">
      {/* Header */}
      <div className="product-page-header">
        <h1 className="page-title">Product Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaBox />
            </div>
            <div className="stat-content">
              <div className="stat-number">{totalProducts}</div>
              <div className="stat-label">Total Products</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon value">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-number">${totalValue.toLocaleString()}</div>
              <div className="stat-label">Total Value</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              <FaExclamationTriangle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{lowStockProducts}</div>
              <div className="stat-label">Low Stock</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon danger">
              <TbBoxOff />
            </div>
            <div className="stat-content">
              <div className="stat-number">{outOfStockProducts}</div>
              <div className="stat-label">Out of Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="product-filters-section">
        <div className="left-filters">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="dropdown">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All categories">All categories</option>
              <option value="Beverages">Beverages</option>
              <option value="Bakery">Bakery</option>
              <option value="Dairy">Dairy</option>
              <option value="Fruits">Fruits</option>
              <option value="Meat">Meat</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Grains">Grains</option>
              <option value="Household">Household</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>

          <div className="dropdown">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All stock">All stock</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="right-actions">
          <button onClick={handleAddProduct} className="add-product-btn">
            <FaPlus />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="product-table-container">
        <table className="product-table">
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
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="product-id-cell">{product.id}</td>
                <td className="product-name-cell">{product.name}</td>
                <td>
                  <div className="product-category">
                    <div className="category">{product.category}</div>
                    <div className="brand">{product.brand}</div>
                  </div>
                </td>
                <td className="product-price">{product.price}</td>
                <td>
                  <div className="stock-info">
                    <div className="stock-number">{product.stock} units</div>
                    <div className="stock-threshold">
                      Min: {product.lowStockThreshold}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`status-badge ${getStockBadgeClass(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(product.id)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(product.id)}
                      title="Edit Product"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(product.id)}
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
      <div className="product-pagination-section">
        <div className="product-pagination-info">
          Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </div>
        <div className="product-pagination-controls">
          <button
            className="product-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="product-page-numbers">
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
                  className={`product-page-number ${
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
            className="product-pagination-btn"
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteProductConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductListView;
