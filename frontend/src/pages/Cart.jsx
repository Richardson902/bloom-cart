import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import authService from "../services/authService";

function Cart() {
  const { cartItems, cartItemCount, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (authService.isAuthenticated()) {
      navigate("order/confirmation");
    } else {
      navigate("/login");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <h2 className="mb-4">Your Cart is Empty</h2>
          <p className="mb-4">
            Looks like you haven't added any products to your cart yet.
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
      <h2 className="mb-4 text-bloom-primary">Your Shopping Cart</h2>

      <div className="row">
        <div className="col-lg-8">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-bloom-primary" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/" className="btn btn-bloom-primary">
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-bloom-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Items ({cartItemCount}):</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 fw-bold">
                <span>Total:</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/order-confirmation"
                className="btn btn-bloom-primary w-100"
                onClick={handleCheckout}
              >
                <i className="bi bi-credit-card me-1"></i> Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
