import React from "react";

function OrderDetails({
  order,
  formatDate,
  isExpanded,
  toggleDetails,
  updating,
  updateOrderStatus,
}) {
  return (
    <div className="card mb-3 border">
      {/* Order Summary Row */}
      <div
        className={`card-header ${isExpanded ? "bg-bloom-light" : "bg-white"}`}
        style={{ cursor: "pointer" }}
        onClick={() => toggleDetails(order.id)}
      >
        <div className="row align-items-center">
          <div className="col-md-2">
            <span className="fw-bold d-block d-md-none">Order #:</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-box-seam text-bloom-primary me-2"></i>
              <span className="fw-bold">{order.id}</span>
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold d-block d-md-none">Date:</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar text-bloom-secondary me-2"></i>
              <span>{formatDate(order.deliveryDate)}</span>
            </div>
          </div>
          <div className="col-md-3">
            <span className="fw-bold d-block d-md-none">Address:</span>
            <div className="d-flex align-items-start">
              <i className="bi bi-geo-alt text-bloom-primary me-2 mt-1"></i>
              <div>
                <div className="fw-bold">{order.recipientName}</div>
                <div className="text-muted small">
                  {order.city}, {order.province}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold d-block d-md-none">Total:</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-tag text-bloom-secondary me-2"></i>
              <span className="fw-bold">
                ${Number(order.totalPrice).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="col-md-2">
            <span className="fw-bold d-block d-md-none">Status:</span>
            {updating ? (
              <div className="d-flex align-items-center">
                <div
                  className="spinner-border spinner-border-sm text-bloom-primary me-2"
                  role="status"
                >
                  <span className="visually-hidden">Updating...</span>
                </div>
                <span>Updating...</span>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <span
                  className={`badge bg-${getStatusColor(order.status)} me-2`}
                >
                  {order.status}
                </span>
                <select
                  className="form-select form-select-sm"
                  style={{ maxWidth: "130px" }}
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent row toggle when clicking select
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            )}
          </div>
          <div className="col-md-1 text-end">
            <button
              className={`btn btn-sm ${
                isExpanded ? "btn-bloom-primary" : "btn-outline-secondary"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleDetails(order.id);
              }}
            >
              {isExpanded ? (
                <i className="bi bi-chevron-up"></i>
              ) : (
                <i className="bi bi-chevron-down"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Panel */}
      {isExpanded && (
        <div className="card-body bg-light">
          <div className="row g-4">
            {/* Order Items Column */}
            <div className="col-lg-8">
              <div className="card h-100 border-bloom-secondary">
                <div className="card-header bg-bloom-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-cart-check me-2"></i>
                    Order Items
                  </h5>
                </div>
                <div className="list-group list-group-flush">
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <div key={item.id || index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 text-bloom-primary">
                              {item.productName}
                            </h6>
                            <div className="text-muted small">
                              <i className="bi bi-box me-1"></i>
                              Quantity: {item.quantity}
                            </div>
                          </div>
                          <div className="text-end">
                            <span className="fw-bold text-bloom-dark">
                              ${Number(item.price * item.quantity).toFixed(2)}
                            </span>
                            <div className="text-muted small">
                              ${Number(item.price).toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="card-footer bg-bloom-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold fs-5 text-bloom-primary">
                      ${Number(order.totalPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information Column */}
            <div className="col-lg-4">
              <div className="card h-100 border-bloom-secondary">
                <div className="card-header bg-bloom-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-truck me-2"></i>
                    Delivery Information
                  </h5>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-bloom-primary">
                    <i className="bi bi-person me-2"></i>
                    {order.recipientName}
                  </h5>
                  <address className="mb-4">
                    <div className="d-flex">
                      <i className="bi bi-house-door me-2 mt-1"></i>
                      <div>
                        {order.street}
                        <br />
                        {order.city}, {order.province} {order.postalCode}
                      </div>
                    </div>
                  </address>
                  <div className="d-flex mb-3">
                    <i className="bi bi-telephone me-2 mt-1"></i>
                    <div>{order.phoneNumber}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar-event me-2"></i>
                    <div>
                      <span className="fw-bold">Delivery Date:</span>
                      <div>{formatDate(order.deliveryDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get color for status badge
function getStatusColor(status) {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "warning";
    case "PROCESSING":
      return "info";
    case "SHIPPED":
      return "primary";
    case "DELIVERED":
      return "success";
    case "CANCELLED":
      return "danger";
    default:
      return "secondary";
  }
}

export default OrderDetails;
