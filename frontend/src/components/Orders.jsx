import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await axios.put(`/api/admin/orders/${orderId}/status`, newStatus, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/orders");
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-bloom-primary">Orders</h1>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-bloom-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-box display-1 text-muted mb-4"></i>
          <h3>You haven't placed any orders yet</h3>
          <p className="mb-4">When you place an order, it will appear here.</p>
          <Link to="/" className="btn btn-bloom-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-bloom-light">
            <div className="row fw-bold">
              <div className="col-md-2">Order #</div>
              <div className="col-md-2">Delivery Date</div>
              <div className="col-md-3">Delivery Address</div>
              <div className="col-md-2">Total</div>
              <div className="col-md-2">Status</div>
              <div className="col-md-1"></div>
            </div>
          </div>
          <div className="list-group list-group-flush">
            {orders.map((order) => (
              <div key={order.id} className="list-group-item p-0">
                {/* Order Summary Row */}
                <div
                  className="row align-items-center p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="col-md-2">
                    <span className="fw-bold d-block d-md-none">Order #:</span>
                    {order.id}
                  </div>
                  <div className="col-md-2">
                    <span className="fw-bold d-block d-md-none">Date:</span>
                    {formatDate(order.deliveryDate)}
                  </div>
                  <div className="col-md-3">
                    <span className="fw-bold d-block d-md-none">Address:</span>
                    <div>{order.recipientName}</div>
                    <div className="text-muted small">
                      {order.city}, {order.province}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <span className="fw-bold d-block d-md-none">Total:</span>$
                    {Number(order.totalPrice).toFixed(2)}
                  </div>
                  <div className="col-md-2">
                    <span className="fw-bold d-block d-md-none">Status:</span>
                    {updating ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Updating...</span>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        <span
                          className={`badge bg-${getStatusColor(
                            order.status
                          )} me-2`}
                        >
                          {order.status}
                        </span>
                        <select
                          className="form-select form-select-sm"
                          style={{ maxWidth: "130px" }}
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
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
                      className="btn btn-sm btn-outline-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOrderDetails(order.id);
                      }}
                    >
                      {expandedOrders[order.id] ? (
                        <i className="bi bi-chevron-up"></i>
                      ) : (
                        <i className="bi bi-chevron-down"></i>
                      )}
                    </button>
                  </div>
                </div>

                {/* Order Details Panel */}
                {expandedOrders[order.id] && (
                  <div className="border-top p-3 bg-light">
                    <div className="row">
                      {/* Order Items Column */}
                      <div className="col-lg-8">
                        <h6 className="fw-bold mb-3">Order Items</h6>
                        <div className="card mb-3">
                          <div className="list-group list-group-flush">
                            {order.orderItems &&
                              order.orderItems.map((item, index) => (
                                <div
                                  key={item.id || index}
                                  className="list-group-item"
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <h6 className="mb-0">
                                        {item.productName}
                                      </h6>
                                      <div className="text-muted small">
                                        Quantity: {item.quantity}
                                      </div>
                                    </div>
                                    <div className="text-end">
                                      <span className="fw-bold">
                                        $
                                        {Number(
                                          item.price * item.quantity
                                        ).toFixed(2)}
                                      </span>
                                      <div className="text-muted small">
                                        ${Number(item.price).toFixed(2)} each
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="card-footer">
                            <div className="d-flex justify-content-between">
                              <span className="fw-bold">Total:</span>
                              <span className="fw-bold">
                                ${Number(order.totalPrice).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Information Column */}
                      <div className="col-lg-4">
                        <h6 className="fw-bold mb-3">Delivery Information</h6>
                        <div className="card">
                          <div className="card-body">
                            <h6 className="fw-bold">{order.recipientName}</h6>
                            <address className="mb-3">
                              {order.street}
                              <br />
                              {order.city}, {order.province} {order.postalCode}
                              <br />
                              Phone: {order.phoneNumber}
                            </address>
                            <div>
                              <span className="fw-bold">Delivery Date:</span>
                              <br />
                              {formatDate(order.deliveryDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Continue Shopping
        </Link>
      </div>
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

export default Orders;
