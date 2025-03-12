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
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: "",
    rating: 5,
    productId: null,
    productName: "",
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details
        const response = await axios.get(`/api/products/${id}`);
        const productData = response.data;

        setNewReview((prev) => ({
          ...prev,
          productId: productData.id,
          productName: productData.name,
        }));

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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === "rating" ? parseInt(value) : value,
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      alert("Please provide a comment");
      return;
    }

    setIsSubmittingReview(true);

    try {
      const reviewToSubmit = {
        ...newReview,
        productId: parseInt(id),
      };

      const response = await axios.post(
        `/api/reviews/products/${id}`,
        reviewToSubmit
      );

      setReviews([...reviews, response.data]);

      setNewReview({
        comment: "",
        rating: 5,
        productId: parseInt(id),
        productName: product.name,
      });

      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${
            i <= rating ? "bi-star-fill text-warning" : "bi-star"
          }`}
        ></i>
      );
    }
    return stars;
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

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-12">
          <hr className="mb-4" />
          <h3 className="text-bloom-primary mb-4">Product Reviews</h3>

          {/* Review List */}
          <div className="mb-5">
            {reviews.length === 0 ? (
              <p className="text-muted fst-italic">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">Customer Says</h5>
                      <div>{renderStars(review.rating)}</div>
                    </div>
                    <p className="card-text">{review.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Review Form */}
          <div className="card">
            <div className="card-header bg-light">
              <h4 className="m-0">Write a Review</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <label htmlFor="reviewRating" className="form-label">
                    Rating
                  </label>
                  <select
                    className="form-select"
                    id="reviewRating"
                    name="rating"
                    value={newReview.rating}
                    onChange={handleReviewChange}
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="reviewComment" className="form-label">
                    Your Review
                  </label>
                  <textarea
                    className="form-control"
                    id="reviewComment"
                    name="comment"
                    rows="4"
                    value={newReview.comment}
                    onChange={handleReviewChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-bloom-primary"
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
