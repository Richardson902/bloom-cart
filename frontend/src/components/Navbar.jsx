import { Link } from "react-router-dom";

function Navbar({ setSelectedCategory }) {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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
            <li className="nav-item">
              <Link to="/add_product" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-bloom-primary">
                  0
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
