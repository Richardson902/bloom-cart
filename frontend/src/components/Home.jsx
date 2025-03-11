import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products`);
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <span className="visibility-hidden">Loading...</span>
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
            Discover our handpicked selection of beautiful blooms
          </p>
        </div>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-bloom-secondary shadow-sm">
              <p>Image here</p>
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
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
