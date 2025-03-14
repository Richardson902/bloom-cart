import ProductReview from "./ProductReview";

function ReviewList({ reviews }) {
  if (reviews.length === 0) {
    return (
      <p className="text-muted fst-italic">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="mb-5">
      {reviews.map((review, index) => (
        <ProductReview key={index} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;
