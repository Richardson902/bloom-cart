import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../services/authService";
import OrderDetails from "../components/OrderDetails";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    authService.initializeAuth();
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
              <OrderDetails
                key={order.id}
                order={order}
                formatDate={formatDate}
                isExpanded={expandedOrders[order.id]}
                toggleDetails={toggleOrderDetails}
                updating={updating}
                updateOrderStatus={updateOrderStatus}
              />
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/admin/dashboard" className="btn btn-bloom-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Orders;
