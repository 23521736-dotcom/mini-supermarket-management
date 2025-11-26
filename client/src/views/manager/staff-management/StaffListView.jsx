import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import StaffModal from "../../../components/StaffModal/StaffModal";
import DeleteConfirmationModal from "../../../components/StaffModal/DeleteConfirmationModal";
import "./StaffListView.css";

const StaffListView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All positions");
  const [monthFilter, setMonthFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  // Sample staff data - matching the design structure
  const staffData = [
    {
      id: "001",
      name: "Alice Johnson",
      email: "alice@gmail.com",
      phone: "+1234567890",
      position: "Store Manager",
      joinDate: "Jan 10, 2023",
      status: "Active",
      address: "123 Manager St, City, CA 94001",
      employmentType: "Full-time",
      salary: "$65,000/year",
    },
    {
      id: "002",
      name: "John Smith",
      email: "staff@gmail.com",
      phone: "+1 234 567-8901",
      position: "Store manager",
      joinDate: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: "003",
      name: "John Smith",
      email: "staff@gmail.com",
      phone: "+1 234 567-8901",
      position: "Store manager",
      joinDate: "Jan 15, 2024",
      status: "Inactive",
    },
    {
      id: "004",
      name: "John Smith",
      email: "staff@gmail.com",
      phone: "+1 234 567-8901",
      position: "Store manager",
      joinDate: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: "005",
      name: "Emma Wilson",
      email: "emma@gmail.com",
      phone: "+1 234 567-8902",
      position: "Cashier",
      joinDate: "Feb 20, 2024",
      status: "Active",
    },
    {
      id: "006",
      name: "Michael Brown",
      email: "michael@gmail.com",
      phone: "+1 234 567-8903",
      position: "Stock Manager",
      joinDate: "Mar 10, 2024",
      status: "Active",
    },
    {
      id: "007",
      name: "Sarah Davis",
      email: "sarah@gmail.com",
      phone: "+1 234 567-8904",
      position: "Security",
      joinDate: "Apr 05, 2024",
      status: "Inactive",
    },
    {
      id: "008",
      name: "James Johnson",
      email: "james@gmail.com",
      phone: "+1 234 567-8905",
      position: "Cleaner",
      joinDate: "May 15, 2024",
      status: "Active",
    },
    {
      id: "009",
      name: "Lisa Anderson",
      email: "lisa@gmail.com",
      phone: "+1 234 567-8906",
      position: "Cashier",
      joinDate: "Jun 01, 2024",
      status: "Active",
    },
    {
      id: "010",
      name: "Robert Taylor",
      email: "robert@gmail.com",
      phone: "+1 234 567-8907",
      position: "Stock Manager",
      joinDate: "Jul 20, 2024",
      status: "Inactive",
    },
    {
      id: "011",
      name: "Jennifer White",
      email: "jennifer@gmail.com",
      phone: "+1 234 567-8908",
      position: "Cashier",
      joinDate: "Aug 10, 2024",
      status: "Active",
    },
    {
      id: "012",
      name: "David Miller",
      email: "david@gmail.com",
      phone: "+1 234 567-8909",
      position: "Security",
      joinDate: "Sep 05, 2024",
      status: "Active",
    },
    {
      id: "013",
      name: "Jessica Garcia",
      email: "jessica@gmail.com",
      phone: "+1 234 567-8910",
      position: "Store manager",
      joinDate: "Oct 12, 2024",
      status: "Inactive",
    },
    {
      id: "014",
      name: "Matthew Wilson",
      email: "matthew@gmail.com",
      phone: "+1 234 567-8911",
      position: "Cleaner",
      joinDate: "Nov 01, 2024",
      status: "Active",
    },
    {
      id: "015",
      name: "Amanda Rodriguez",
      email: "amanda@gmail.com",
      phone: "+1 234 567-8912",
      position: "Cashier",
      joinDate: "Nov 15, 2024",
      status: "Active",
    },
    {
      id: "016",
      name: "Christopher Lee",
      email: "christopher@gmail.com",
      phone: "+1 234 567-8913",
      position: "Stock Manager",
      joinDate: "Dec 01, 2024",
      status: "Inactive",
    },
    {
      id: "017",
      name: "Ashley Martinez",
      email: "ashley@gmail.com",
      phone: "+1 234 567-8914",
      position: "Security",
      joinDate: "Dec 10, 2024",
      status: "Active",
    },
    {
      id: "018",
      name: "Joshua Thompson",
      email: "joshua@gmail.com",
      phone: "+1 234 567-8915",
      position: "Cashier",
      joinDate: "Jan 05, 2025",
      status: "Active",
    },
    {
      id: "019",
      name: "Nicole Clark",
      email: "nicole@gmail.com",
      phone: "+1 234 567-8916",
      position: "Cleaner",
      joinDate: "Jan 20, 2025",
      status: "Inactive",
    },
    {
      id: "020",
      name: "Ryan Hall",
      email: "ryan@gmail.com",
      phone: "+1 234 567-8917",
      position: "Store manager",
      joinDate: "Feb 01, 2025",
      status: "Active",
    },
    {
      id: "021",
      name: "Stephanie Adams",
      email: "stephanie@gmail.com",
      phone: "+1 234 567-8918",
      position: "Cashier",
      joinDate: "Feb 15, 2025",
      status: "Inactive",
    },
    {
      id: "022",
      name: "Kevin Wright",
      email: "kevin@gmail.com",
      phone: "+1 234 567-8919",
      position: "Security",
      joinDate: "Mar 01, 2025",
      status: "Active",
    },
    {
      id: "023",
      name: "Rachel Green",
      email: "rachel@gmail.com",
      phone: "+1 234 567-8920",
      position: "Cleaner",
      joinDate: "Mar 10, 2025",
      status: "Active",
    },
    {
      id: "024",
      name: "Brandon Scott",
      email: "brandon@gmail.com",
      phone: "+1 234 567-8921",
      position: "Stock Manager",
      joinDate: "Mar 20, 2025",
      status: "Inactive",
    },
    {
      id: "025",
      name: "Melissa Turner",
      email: "melissa@gmail.com",
      phone: "+1 234 567-8922",
      position: "Store manager",
      joinDate: "Apr 01, 2025",
      status: "Active",
    },
  ];

  const itemsPerPage = 10;

  // Filter data first
  const filteredData = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.includes(searchTerm);
    const matchesPosition =
      statusFilter === "All positions" || staff.position === statusFilter;
    const matchesStatus =
      monthFilter === "All Status" || staff.status === monthFilter;
    return matchesSearch && matchesPosition && matchesStatus;
  });

  // Calculate pagination based on filtered data
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Debug pagination
  console.log(
    `Current Page: ${currentPage}, Start Index: ${startIndex}, End Index: ${endIndex}`
  );
  console.log("Paginated Data:", paginatedData);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, monthFilter]);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const handleMonthFilterChange = (month) => {
    setMonthFilter(month);
  };

  const handleAddStaff = () => {
    navigate("/staff/add");
  };

  const handleEdit = (staffId) => {
    navigate(`/staff/edit/${staffId}`);
  };

  const handleDelete = (staffId) => {
    const staff = staffData.find((s) => s.id === staffId);
    if (staff) {
      setStaffToDelete(staff);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      console.log("Deleting staff:", staffToDelete.id);
      // Add your actual delete logic here
      // Example: Remove from staffData or call API

      // Reset state
      setStaffToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setStaffToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleView = (staffId) => {
    const staff = staffData.find((s) => s.id === staffId);
    if (staff) {
      setSelectedStaff(staff);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Active":
        return "status-approved";
      case "Inactive":
        return "status-declined";
      default:
        return "status-default";
    }
  };

  return (
    <div className="staff-report-view">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Staffs</h1>
      </div>

      {/* Filters and Actions */}
      <div className="filters-section">
        <div className="left-filters">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search staff"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="dropdown">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="filter-select"
            >
              <option value="All positions">All positions</option>
              <option value="Store manager">Store manager</option>
              <option value="Cashier">Cashier</option>
              <option value="Stock Manager">Stock Manager</option>
              <option value="Security">Security</option>
              <option value="Cleaner">Cleaner</option>
            </select>
          </div>

          <div className="dropdown">
            <select
              value={monthFilter}
              onChange={(e) => handleMonthFilterChange(e.target.value)}
              className="filter-select"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button className="add-staff-btn" onClick={handleAddStaff}>
          <FaPlus className="add-icon" />
          Add Staff
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Staff Name</th>
              <th>Contact</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((staff, index) => (
              <tr key={`page-${currentPage}-${staff.id}-${index}`}>
                <td className="staff-id">{staff.id}</td>
                <td className="staff-info">
                  <div className="staff-name">{staff.name}</div>
                  <div className="staff-join-date">Joined {staff.joinDate}</div>
                </td>
                <td className="staff-contact">
                  <div className="staff-email">{staff.email}</div>
                  <div className="staff-phone">{staff.phone}</div>
                </td>
                <td className="staff-position">{staff.position}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      staff.status
                    )}`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleView(staff.id)}
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(staff.id)}
                    title="Edit Staff"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(staff.id)}
                    title="Delete Staff"
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
      <div className="staff-pagination-section">
        <div className="staff-pagination-info">
          Showing {totalItems > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, totalItems)} of {totalItems}
        </div>
        <div className="staff-pagination-controls">
          <button
            className="staff-pagination-btn"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>

          {/* Page numbers */}
          <div className="staff-page-numbers">
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
                  className={`staff-page-number ${
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
            className="staff-pagination-btn"
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

      {/* Staff Details Modal */}
      <StaffModal
        staff={selectedStaff}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        staffName={staffToDelete?.name}
      />
    </div>
  );
};

export default StaffListView;
