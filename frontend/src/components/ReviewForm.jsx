import { useState } from "react";
import axios from "axios";

function ReviewForm({ productId, productName, onReviewAdded }) {
  const [newReview, setNewReview] = useState({
    comment: "",
    rating: 5,
    productId: productId,
    productName: productName,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    try {
      const reviewToSubmit = {
        ...newReview,
        productId: parseInt(productId),
      };

      const response = await axios.post(
        `/api/reviews/products/${productId}`,
        reviewToSubmit
      );

      onReviewAdded(response.data);

      setNewReview({
        comment: "",
        rating: 5,
        productId: parseInt(productId),
        productName: productName,
      });

      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
  );
}

export default ReviewForm;
