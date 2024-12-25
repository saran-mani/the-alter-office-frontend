import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user-info"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand text-primary fw-bold" to="/dashboard">
          The Alter office
        </Link>

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active text-dark" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/analytics">
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/topic-analytics">
               Topic Analytics
              </Link>
            </li>
          </ul>
          <div className="navbar-user d-flex align-items-center">
            {user ? (
              <>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span className="user-name me-3 text-dark fw-semibold">
                  {user.name}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-primary btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
