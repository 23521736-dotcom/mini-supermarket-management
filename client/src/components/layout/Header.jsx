import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import "./Header.css";

const Header = ({
  userName = "Moni Roy",
  userRole = "Admin",
  userAvatar = null,
  onSearch,
  onProfileClick,
  onSignOut,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (action) => {
    if (action === "profile") {
      onProfileClick?.();
    } else if (action === "signout") {
      onSignOut?.();
    }
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-profile")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Generate initials if no avatar provided
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="user-profile" onClick={handleProfileClick}>
          <div className="user-avatar">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">{getInitials(userName)}</div>
            )}
          </div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole}</div>
          </div>
          <FaChevronDown
            className={`dropdown-icon ${isDropdownOpen ? "rotated" : ""}`}
          />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleMenuItemClick("profile")}
              >
                Profile
              </button>
              <button
                className="dropdown-item signout-option"
                onClick={() => handleMenuItemClick("signout")}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
