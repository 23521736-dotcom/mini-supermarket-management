import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Checkbox from "../../components/ui/Checkbox";
import ErrorMessage from "../../components/Messages/ErrorMessage";
import apiClient from "../../services/apiClient";
import "./SignIn.css";

const DEMO_ACCOUNTS = {
  customer: [
    {
      group: "Customer Accounts",
      icon: "🛒",
      accounts: [
        { username: "customer1", password: "password123", label: "Customer 1", badge: "Gold", badgeColor: "#f59e0b" },
        { username: "customer2", password: "password123", label: "Customer 2", badge: "Silver", badgeColor: "#6b7280" },
        { username: "customer3", password: "password123", label: "Customer 3", badge: "Gold", badgeColor: "#f59e0b" },
        { username: "customer4", password: "password123", label: "Customer 4", badge: "Standard", badgeColor: "#3b82f6" },
      ],
    },
  ],
  staff: [
    {
      group: "Manager",
      icon: "👔",
      accounts: [
        { username: "manager1", password: "password123", label: "Manager 1", badge: "Superuser", badgeColor: "#7c3aed" },
        { username: "manager2", password: "password123", label: "Manager 2", badge: "Manager", badgeColor: "#7c3aed" },
      ],
    },
    {
      group: "Cashier",
      icon: "💰",
      accounts: [
        { username: "cashier1", password: "password123", label: "Nguyễn Văn An" },
        { username: "cashier2", password: "password123", label: "Phạm Thị Dung" },
      ],
    },
    {
      group: "Merchandise Supervisor",
      icon: "📦",
      accounts: [
        { username: "supervisor1", password: "password123", label: "Hoàng Văn Em" },
        { username: "supervisor2", password: "password123", label: "Trần Thị Lan" },
      ],
    },
    {
      group: "Warehouse Staff",
      icon: "📊",
      accounts: [
        { username: "warehouse1", password: "password123", label: "Đinh Văn Phúc" },
        { username: "warehouse2", password: "password123", label: "Bùi Thị Giang" },
      ],
    },
    {
      group: "Delivery Staff",
      icon: "🚚",
      accounts: [
        { username: "delivery1", password: "password123", label: "Lê Văn Cường" },
        { username: "delivery2", password: "password123", label: "Hoàng Minh Tuấn" },
      ],
    },
  ],
};

const SignIn = () => {
  // Load remembered credentials from localStorage
  const getRememberedCredentials = () => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedUsername && rememberedPassword) {
      return {
        username: rememberedUsername,
        password: rememberedPassword,
        rememberMe: true,
      };
    }

    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  };

  const getRememberedTab = () => {
    return localStorage.getItem("rememberedTab") || "customer";
  };

  const [activeTab, setActiveTab] = useState(getRememberedTab);
  const [formData, setFormData] = useState(getRememberedCredentials);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  const fillAccount = (username, password) => {
    setFormData((prev) => ({ ...prev, username, password }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign in attempt:", formData);
    console.log("User type:", activeTab);

    // Simple validation
    if (!formData.username || !formData.password) {
      setErrorMessage("Please enter username and password");
      return;
    }

    try {
      // Call backend API
      const response = await apiClient.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Full response:", response);
      console.log("Success flag:", response.success);

      // apiClient interceptor already unwraps response.data, so response = response.data
      if (response.success) {
        const { token, user } = response.data;

        console.log("Login successful:", user);
        console.log("User role:", user.role, "Active tab:", activeTab);

        // Check if user type matches selected tab
        if (user.role === "customer" && activeTab !== "customer") {
          setErrorMessage(
            "This is a customer account. Please select the Customer tab."
          );
          return;
        }
        if (
          (user.role === "staff" || user.role === "admin") &&
          activeTab !== "staff"
        ) {
          setErrorMessage(
            "This is a staff/admin account. Please select the Staff tab."
          );
          return;
        }

        console.log("Role validation passed, storing data...");

        // Store token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.full_name || user.username);
        localStorage.setItem("userUsername", user.username);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("isLoggedIn", "true");

        // Store additional data based on role
        if (user.role === "customer") {
          localStorage.setItem("customerId", user.customer_id);
          localStorage.setItem(
            "membershipType",
            user.membership_type || "basic"
          );
          localStorage.setItem("pointsBalance", user.points_balance || 0);
        } else if (user.role === "staff" || user.role === "admin") {
          localStorage.setItem("staffId", user.staff_id || "");
          localStorage.setItem("position", user.position || "");
          localStorage.setItem("isManager", user.is_manager || false);

          // Store manager-specific data if exists
          if (user.is_manager) {
            localStorage.setItem("managerId", user.manager_id || "");
            localStorage.setItem("accessLevel", user.access_level || "");
            localStorage.setItem("isSuperuser", user.is_superuser || false);
          }
        }

        // Handle remember me
        if (formData.rememberMe) {
          localStorage.setItem("rememberedUsername", formData.username);
          localStorage.setItem("rememberedPassword", formData.password);
          localStorage.setItem("rememberedTab", activeTab);
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberedTab");
        }

        // Set token to axios default headers for future requests
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Navigate based on user role and position
        let redirectPath = "/dashboard"; // default

        if (user.role === "customer") {
          redirectPath = "/customer-portal";
        } else if (user.role === "admin") {
          // Admin role - check if manager
          if (user.is_manager) {
            redirectPath = "/dashboard"; // Manager dashboard
          } else {
            // Admin nhưng không phải manager - điều hướng về signin
            setErrorMessage(
              "Account configuration error. Please contact administrator."
            );
            return;
          }
        } else if (user.role === "staff") {
          // Staff role - điều hướng theo position
          const position = user.position?.toLowerCase();

          if (position === "delivery" || position === "delivery staff") {
            redirectPath = "/assigned-orders";
          } else if (position === "cashier") {
            redirectPath = "/invoice";
          } else if (
            position === "merchandise supervisor" ||
            position === "supervisor" ||
            position === "merchandise"
          ) {
            redirectPath = "/shelf-product";
          } else if (
            position === "warehouse" ||
            position === "warehouse staff"
          ) {
            redirectPath = "/products";
          } else {
            // Position không xác định - mặc định dashboard
            redirectPath = "/dashboard";
          }
        }

        console.log(
          "Navigating to:",
          redirectPath,
          "| Role:",
          user.role,
          "| Position:",
          user.position,
          "| isManager:",
          user.is_manager
        );
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);

      // apiClient interceptor rejects with error.response.data or custom error object
      let errorMsg = "An error occurred. Please try again.";

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error.message) {
        errorMsg = error.message;
      } else if (error.error) {
        errorMsg = error.error;
      }

      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="signin-container">
      <ErrorMessage
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
      <div className="signin-card">
        <Logo />

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            type="button"
            className={`tab-button ${activeTab === "customer" ? "active" : ""}`}
            onClick={() => setActiveTab("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === "staff" ? "active" : ""}`}
            onClick={() => setActiveTab("staff")}
          >
            Staff
          </button>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              icon="👤"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              icon="🔒"
              required
            />
          </div>

          <div className="form-options">
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleInputChange}
              label="Remember me"
              name="rememberMe"
            />
            <a href="/forget-password" className="forgot-password">
              Forget your password?
            </a>
          </div>

          <Button type="submit" size="large" className="signin-button">
            Sign In
          </Button>
        </form>

        <div className="signin-footer">
          <span className="footer-text">Don't have account? </span>
          {activeTab === `customer` ? (
            <a href="/signup" className="contact-admin">
              Create an account
            </a>
          ) : (
            <a href="#" className="contact-admin disabled">
              Contact admin
            </a>
          )}
        </div>

        {/* Demo Accounts Panel */}
        <div className="demo-accounts">
          <button
            type="button"
            className="demo-toggle"
            onClick={() => setShowDemo((v) => !v)}
          >
            <span className="demo-toggle-icon">🧪</span>
            <span>Demo Accounts</span>
            <span className={`demo-arrow ${showDemo ? "open" : ""}`}>▾</span>
          </button>

          {showDemo && (
            <div className="demo-body">
              <p className="demo-hint">Click một tài khoản để điền tự động</p>
              {DEMO_ACCOUNTS[activeTab].map((group) => (
                <div key={group.group} className="demo-group">
                  <div className="demo-group-title">
                    <span>{group.icon}</span>
                    <span>{group.group}</span>
                  </div>
                  <div className="demo-accounts-list">
                    {group.accounts.map((acc) => (
                      <button
                        key={acc.username}
                        type="button"
                        className="demo-account-btn"
                        onClick={() => fillAccount(acc.username, acc.password)}
                      >
                        <div className="demo-acc-info">
                          <span className="demo-acc-name">{acc.label}</span>
                          <span className="demo-acc-user">@{acc.username}</span>
                        </div>
                        {acc.badge && (
                          <span
                            className="demo-acc-badge"
                            style={{ background: acc.badgeColor }}
                          >
                            {acc.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
