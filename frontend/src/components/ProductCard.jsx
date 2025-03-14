import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-6 col-lg-4">
      <Link to={`/products/${product.id}`} className="text-decoration-none">
        <div className="card h-100 border-bloom-secondary shadow-sm hover-shadow">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
          )}
          <div className="card-body bg-bloom-light">
            <h5 className="card-title text-bloom-primary">{product.name}</h5>
            <p className="card-text text-muted small">{product.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-bloom-dark">${product.price}</span>
              <button className="btn btn-bloom-primary btn-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
