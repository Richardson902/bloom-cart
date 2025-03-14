import { renderStars } from "../utils/renderStars";

function ProductReview({ review }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">Customer Says</h5>
          <div>{renderStars(review.rating)}</div>
        </div>
        <p className="card-text">{review.comment}</p>
      </div>
    </div>
  );
}

export default ProductReview;
