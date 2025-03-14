import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bloom-primary text-white py-4 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-md-4">
            <h5 className="mb-3">Bloom Cart</h5>
            <p className="mb-3">
              Delivering fresh flowers and beautiful arrangements to brighten
              your day and special occasions.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="Twitter">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="Pinterest">
                <i className="bi bi-pinterest fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  <i className="bi bi-house-door me-2"></i>Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-white text-decoration-none"
                >
                  <i className="bi bi-shop me-2"></i>Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-white text-decoration-none">
                  <i className="bi bi-cart me-2"></i>Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/todo" className="text-white text-decoration-none">
                  <i className="bi bi-person me-2"></i>My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>123 Flower St, Garden City
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>(555) 123-4567
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>hello@bloomcart.com
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>Mon-Fri: 9AM - 6PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {currentYear} Bloom Cart. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/todo" className="text-white text-decoration-none">
                  Terms of Service
                </Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/todo" className="text-white text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
