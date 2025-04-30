import React from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/airbnblogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 👇 If on login or register page, show only the Outlet
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return <Outlet />; // Just render the login or register component
  }

  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="logo-container">
          <img className="logo" src={logo} alt="AirBnb Logo" />
        </div>
        <div className="sidebar-tasks">
          <Link to="/create">Create</Link>
          <Link to="/create">Create</Link>
        </div>
      </div>
      <div className="content-container">
        <nav>
          <div className="dashboard">
            <Link to="/">Dashboard</Link>
          </div>
          <div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
