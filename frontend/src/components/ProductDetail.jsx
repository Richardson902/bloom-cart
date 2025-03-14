import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail({ product, onStockWarning }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Check if the product is out of stock
  const isOutOfStock = product.stockQuantityQuantity === 0;

  // Determine stock status for display
  const getStockStatus = (stock) => {
    if (stock === 0) return { label: "Out of Stock", class: "danger" };
    if (stock <= 5) return { label: "Low Stock", class: "warning" };
    return { label: "In Stock", class: "success" };
  };

  const stockStatus = getStockStatus(product.stockQuantity);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > product.stockQuantity) {
      onStockWarning(`Sorry, only ${product.stockQuantity} items available.`);
      setQuantity(product.stockQuantity);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      onStockWarning("This item is out of stock.");
      return;
    }

    if (quantity > product.stockQuantity) {
      onStockWarning(`Sorry, only ${product.stockQuantity} items available.`);
      return;
    }

    addToCart(product, quantity);
    onStockWarning(`Added ${quantity} item(s) to your cart.`);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    } else {
      onStockWarning(`Sorry, only ${product.stockQuantity} items available.`);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="row">
      {/* Product Image Column */}
      <div className="col-md-6 mb-4">
        <div className="product-image-container rounded overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid product-detail-image"
          />
        </div>
      </div>

      {/* Product Info Column */}
      <div className="col-md-6">
        <h1 className="mb-3">{product.name}</h1>

        {/* Stock Status Badge */}
        <div className="mb-3">
          <span className={`badge bg-${stockStatus.class} me-2`}>
            {stockStatus.label}
          </span>

          {stockStatus.class === "warning" && (
            <small className="text-warning">
              Only {product.stockQuantity} left
            </small>
          )}
        </div>

        <p className="text-muted mb-3">{product.description}</p>

        <h3 className="text-bloom-primary mb-4">${product.price.toFixed(2)}</h3>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <div className="input-group" style={{ width: "150px" }}>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1 || isOutOfStock}
            >
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="form-control text-center"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stockQuantity}
              disabled={isOutOfStock}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleIncreaseQuantity}
              disabled={quantity >= product.stockQuantity || isOutOfStock}
            >
              <i className="bi bi-plus"></i>
            </button>
          </div>

          {!isOutOfStock && (
            <small className="form-text text-muted">
              Maximum: {product.stockQuantity} items
            </small>
          )}
        </div>

        {/* Add to Cart and Back buttons */}
        <div className="d-grid gap-2 d-md-flex">
          <button
            onClick={handleAddToCart}
            className={`btn ${
              isOutOfStock ? "btn-secondary" : "btn-bloom-primary"
            } btn-lg me-md-2`}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? (
              <>
                <i className="bi bi-x-circle me-2"></i>
                Out of Stock
              </>
            ) : (
              <>
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </>
            )}
          </button>
          <Link to="/" className="btn btn-outline-secondary btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
