import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  return (
    <div className="card mb-3 shadow-sm">
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
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title text-bloom-primary">{item.name}</h5>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
            <p className="card-text text-bloom-dark fw-bold">${item.price}</p>
            <div className="d-flex align-items-center">
              <div
                className="input-group input-group-sm"
                style={{ width: "150px" }}
              >
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    updateCartItemQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartItemQuantity(
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
                    updateCartItemQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <span className="ms-3">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
