import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ cartItems, subtotal, tax, total, clearCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({
    recipientName: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    phoneNumber: "",
    deliveryDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order payload with mapped order items
      const orderPayload = {
        ...order,
        deliveryDate: `${order.deliveryDate}T00:00:00`,
        totalPrice: total.toString(),
        status: "PENDING",
        orderItems: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price.toString(),
        })),
      };

      const response = await axios.post("/api/orders", orderPayload);
      console.log("Order placed successfully", response.data);

      // Success handling
      alert("Thank you for your order!");
      clearCart();
      navigate("/order-invoice", {
        state: {
          orderNumber: response.data.id,
          recipientName: order.recipientName,
        },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was a problem processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="recipientName" className="form-label">
          Recipient's Name
        </label>
        <input
          type="text"
          className="form-control"
          id="recipientName"
          name="recipientName"
          value={order.recipientName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="street" className="form-label">
          Street Address
        </label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          value={order.street}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={order.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="province" className="form-label">
            Province
          </label>
          <input
            type="text"
            className="form-control"
            id="province"
            name="province"
            value={order.province}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="postalCode" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            name="postalCode"
            value={order.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={order.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="deliveryDate" className="form-label">
          Delivery Date
        </label>
        <input
          type="date"
          className="form-control"
          id="deliveryDate"
          name="deliveryDate"
          value={order.deliveryDate}
          onChange={handleInputChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div className="d-flex justify-content-between mt-4 mb-2">
        <span className="fw-bold">Subtotal:</span>
        <span>${subtotal}</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-bold">Tax:</span>
        <span>${tax}</span>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <span className="fw-bold fs-5">Total:</span>
        <span className="fw-bold fs-5">${total}</span>
      </div>

      <button
        type="submit"
        className="btn btn-bloom-primary w-100"
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </>
        ) : (
          "Complete Order"
        )}
      </button>
    </form>
  );
}

export default CheckoutForm;
