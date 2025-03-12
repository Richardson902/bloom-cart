import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-success shadow-sm">
            <div className="card-body text-center py-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success display-1"></i>
              </div>
              <h1 className="text-bloom-primary mb-3">
                Thank You For Your Order!
              </h1>
              <p className="lead mb-1">Your order has been received.</p>
              <p className="mb-4">
                Order #{orderNumber} is being processed and will be delivered on
                your selected date.
              </p>
              <hr className="my-4" />
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <Link to="/" className="btn btn-bloom-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header bg-bloom-light">
              <h5 className="mb-0">What happens next?</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex">
                  <div className="me-3">
                    <i className="bi bi-envelope text-bloom-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Order Confirmation Email</h6>
                    <p className="mb-0 text-muted">
                      You'll receive an email with your order details.
                    </p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="me-3">
                    <i className="bi bi-box-seam text-bloom-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Order Processing</h6>
                    <p className="mb-0 text-muted">
                      Our florists will carefully prepare your flowers.
                    </p>
                  </div>
                </li>
                <li className="list-group-item d-flex">
                  <div className="me-3">
                    <i className="bi bi-truck text-bloom-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 className="mb-1">Delivery</h6>
                    <p className="mb-0 text-muted">
                      Your flowers will be delivered to your door on the
                      selected date.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
