import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Mini Supermarket Management System</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Total Sales</h3>
              <p className="card-value">$12,345</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <div className="card-content">
              <h3>Total Staff</h3>
              <p className="card-value">25</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📦</div>
            <div className="card-content">
              <h3>Products</h3>
              <p className="card-value">1,234</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🏪</div>
            <div className="card-content">
              <h3>Suppliers</h3>
              <p className="card-value">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
