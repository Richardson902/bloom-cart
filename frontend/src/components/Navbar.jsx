import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../services/authService";

function Navbar({ setSelectedCategory, cartItemCount = 0 }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Checks authentication status and updates component state
  const checkAuth = () => {
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      setCurrentUser(authService.getCurrentUser());
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    // Check auth status on initial render
    checkAuth();

    // Listen for auth-change events
    const handleAuthChange = () => {
      console.log("Auth change detected");
      checkAuth();
    };

    // Listen for both storage and custom auth-change events
    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    // Clear authentication data
    authService.logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  const isAdmin =
    (currentUser && authService.hasRole("ROLE_ADMIN")) ||
    authService.hasRole("AGENT");

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom shadow-sm">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          onClick={() => handleCategoryClick("")}
        >
          <i className="bi bi-flower1 text-bloom-primary me-2 fs-4"></i>
          <span className="fw-bold text-bloom-primary">Bloom Cart</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                onClick={() => handleCategoryClick("")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => handleCategoryClick("")}
                  >
                    All
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => handleCategoryClick("bouquets")}
                  >
                    Bouquets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => handleCategoryClick("arrangements")}
                  >
                    Arrangements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => handleCategoryClick("single-flowers")}
                  >
                    Single Flowers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="dropdown-item"
                    onClick={() => handleCategoryClick("gifts")}
                  >
                    Gift Baskets
                  </Link>
                </li>
              </ul>
            </li>

            {/* Show Admin Dashboard link for admin/agent users */}
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                Cart
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-bloom-primary">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Account link for authenticated users */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/todo" className="nav-link">
                  Account
                </Link>
              </li>
            )}

            {/* Login/Register or Account dropdown with logout */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-link"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
