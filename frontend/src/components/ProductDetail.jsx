import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductDetail({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
      };

      addToCart(cartItem);
      alert("Product added to your cart!");
      navigate("/cart");
    }
  };

  return (
    <div className="row mb-5">
      <div className="col-md-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="img-fluid rounded shadow"
        />
      </div>
      <div className="col-md-6">
        <h1 className="text-bloom-primary mb-3">{product.name}</h1>
        <p className="lead mb-4">{product.description}</p>

        <div className="mb-4">
          <h2 className="text-bloom-dark">${product.price}</h2>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <div className="input-group" style={{ maxWidth: "200px" }}>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="btn btn-bloom-primary btn-lg w-100 mb-3"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
