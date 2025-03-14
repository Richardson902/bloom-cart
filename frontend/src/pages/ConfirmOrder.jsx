import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import authService from "../services/authService";
import CheckoutForm from "../components/CheckoutForm";

function ConfirmOrder() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxRate = 0.15;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Check if cart is empty and redirect
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }

    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate("/login");
    }
  }, [cartItems, navigate]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-7">
          <div className="card border-bloom-secondary shadow-sm mb-4">
            <div className="card-header bg-bloom-primary text-white">
              <h2 className="mb-0">Complete Your Order</h2>
            </div>
            <div className="card-body bg-bloom-light">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <CheckoutForm
                cartItems={cartItems}
                subtotal={subtotal.toFixed(2)}
                tax={tax.toFixed(2)}
                total={total.toFixed(2)}
                clearCart={clearCart}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-bloom-secondary shadow-sm mb-4">
            <div className="card-header bg-bloom-primary text-white">
              <h3 className="mb-0">Order Summary</h3>
            </div>
            <div className="card-body bg-bloom-light">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-3"
                >
                  <div
                    className="me-3"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 text-bloom-primary">{item.name}</h6>
                    <small className="text-muted">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </small>
                  </div>
                  <div className="fw-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (15%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span className="text-bloom-primary">${total.toFixed(2)}</span>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <Link to="/cart" className="btn btn-outline-bloom-secondary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
