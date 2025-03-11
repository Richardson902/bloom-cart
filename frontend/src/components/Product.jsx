import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Product({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const response = await axios.get(`/api/products/${id}`);
        const productData = response.data;

        // Fetch product image
        try {
          const imageResponse = await axios.get(`/api/products/${id}/image`, {
            responseType: "blob",
          });
          const imageUrl = URL.createObjectURL(imageResponse.data);
          setProduct({ ...productData, imageUrl });
        } catch (error) {
          console.error("Error fetching image:", error);
          setProduct({ ...productData, imageUrl: "/placeholder-image.jpg" });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProduct();

    // Cleanup function
    return () => {
      if (product?.imageUrl && product.imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(product.imageUrl);
      }
    };
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of product ${id} to cart`); // Debug log

    if (product && quantity > 0) {
      // Create a cart item
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
      };

      // Call addToCart with the cart item
      addToCart(cartItem);

      // Show success message and navigate to cart page
      alert("Product added to your cart!");
      navigate("/cart");
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-bloom-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">
          <h2>Product not found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button
            className="btn btn-bloom-primary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
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
    </div>
  );
}

export default Product;
