import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ setSelectedCategory, cartItemCount = 0 }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from local storage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.location.reload();
  };

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
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  My Orders
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/admin/products/add" className="nav-link">
                Add Product
              </Link>
            </li>
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

            {/* Authentication buttons - show login/register or logout based on auth state */}
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
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
