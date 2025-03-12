import { useState } from "react";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

function Cart({ cartItems, updateQuantity, removeItem, clearCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate cart totals
  const subtotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const tax = (subtotal * 0.15).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <div className="py-5">
          <i className="bi bi-cart3 display-1 text-muted mb-4"></i>
          <h2>Your cart is empty</h2>
          <p className="mb-4">
            Looks like you haven't added any flowers to your cart yet.
          </p>
          <Link to="/" className="btn btn-bloom-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-bloom-primary">Your Cart</h1>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{item.name}</h5>
                      <button
                        className="btn btn-sm text-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-x-circle"></i>
                      </button>
                    </div>
                    <div className="row align-items-center mt-3">
                      <div className="col-md-4">
                        <div className="input-group input-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control text-center"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            min="1"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-8 text-md-end">
                        <p className="fw-bold mb-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <small className="text-muted">${item.price} each</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Link>
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card shadow-sm">
            <div className="card-header bg-bloom-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {!isCheckingOut ? (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <button
                    className="btn btn-bloom-primary w-100 mt-3"
                    onClick={() => setIsCheckingOut(true)}
                  >
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <CheckoutForm
                  cartItems={cartItems}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  clearCart={clearCart}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
