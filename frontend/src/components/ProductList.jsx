import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="col-12 text-center">
        <p className="text-muted">
          No flowers available at the moment. Please check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
