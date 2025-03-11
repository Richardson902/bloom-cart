import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // First, fetch all products
        const response = await axios.get("/api/products");
        const productsData = response.data;

        // Then, fetch images for each product
        const updatedProducts = await Promise.all(
          productsData.map(async (product) => {
            try {
              const imageResponse = await axios.get(
                `/api/products/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "/placeholder-image.jpg" };
            }
          })
        );

        setProducts(updatedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Cleanup function to revoke object URLs to avoid memory leaks
    return () => {
      products.forEach((product) => {
        if (product.imageUrl && product.imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(product.imageUrl);
        }
      });
    };
  }, []); // No dependency on data anymore

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const getCategoryHeading = () => {
    switch (selectedCategory) {
      case "bouquets":
        return "collection of stunning bouquets";
      case "arrangements":
        return "collection of elegant arrangements";
      case "single-flowers":
        return "collection of beautiful single flowers";
      case "gifts":
        return "collection of delightful gift baskets";
      default:
        return "handpicked selection of beautiful blooms";
    }
  };

  if (isError) {
    return (
      <div className="container text-center my-5">
        <div className="alert alert-danger p-5">
          <h2>Something went wrong...</h2>
          <p>
            We couldn't load our beautiful flower collection. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-bloom-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 text-bloom-primary text-center mb-4">
            Bloom Cart Flower Shop
          </h1>
          <p className="lead text-center mb-5">
            Discover our {getCategoryHeading(selectedCategory)}
          </p>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">
              No flowers available at the moment. Please check back soon!
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <Link
                to={`/products/${product.id}`}
                className="text-decoration-none"
              >
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
                    <h5 className="card-title text-bloom-primary">
                      {product.name}
                    </h5>
                    <p className="card-text text-muted small">
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-bloom-dark">
                        ${product.price}
                      </span>
                      <button className="btn btn-bloom-primary btn-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
