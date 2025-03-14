import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductDetail from "../components/ProductDetail";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [stockWarning, setStockWarning] = useState("");

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

        // Fetch reviews for product
        try {
          const reviewsResponse = await axios.get(
            `/api/reviews/products/${id}`
          );
          console.log(reviewsResponse.data);
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
          setReviews([]);
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

  const handleReviewAdded = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  // Create stock warning handler
  const handleStockWarning = (message) => {
    setStockWarning(message);
    // Auto-clear message after 3 seconds
    setTimeout(() => setStockWarning(""), 3000);
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
      {/* Display stock warning message */}
      {stockWarning && (
        <div
          className={`alert ${
            stockWarning.includes("Added") ? "alert-success" : "alert-warning"
          } mb-4`}
        >
          {stockWarning}
        </div>
      )}

      {/* Pass the onStockWarning function to ProductDetail */}
      <ProductDetail product={product} onStockWarning={handleStockWarning} />

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-12">
          <hr className="mb-4" />
          <h3 className="text-bloom-primary mb-4">Product Reviews</h3>

          {/* Review List */}
          <ReviewList reviews={reviews} />

          {/* Review Form */}
          <ReviewForm
            productId={product.id}
            productName={product.name}
            onReviewAdded={handleReviewAdded}
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
