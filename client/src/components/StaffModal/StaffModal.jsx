import React from "react";
import { useNavigate } from "react-router-dom";
import "./StaffModal.css";

const StaffModal = ({ staff, isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen || !staff) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditClick = () => {
    onClose();
    navigate(`/staff/edit/${staff.id}`);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="staff-info">
            <h2 className="staff-name">{staff.name}</h2>
            <p className="staff-position">{staff.position}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="info-grid">
            {/* Basic Information */}
            <div className="info-row">
              <div className="info-item">
                <label>Staff ID</label>
                <p>{staff.id}</p>
              </div>
              <div className="info-item">
                <label>Position</label>
                <p>{staff.position}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Email</label>
                <p>{staff.email}</p>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <p>{staff.phone}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item full-width">
                <label>Address</label>
                <p>{staff.address || "123 Manager St, City, CA 94001"}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Employment type</label>
                <p>{staff.employmentType || "Full-time"}</p>
              </div>
              <div className="info-item">
                <label>Salary</label>
                <p>{staff.salary || "$65,000/year"}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Status</label>
                <span className={`status-badge ${staff.status.toLowerCase()}`}>
                  {staff.status}
                </span>
              </div>
              <div className="info-item">
                <label>Hire date</label>
                <p>{staff.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="edit-staff-btn" onClick={handleEditClick}>
            <span>✏️</span>
            Edit Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
