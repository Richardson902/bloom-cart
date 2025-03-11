import { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    console.log("submitting prod data:", product);
    console.log("image file:", image);

    const formData = new FormData();
    formData.append("imageFile", image);

    console.log("FormData imageFile:", image.name, image.type, image.size);

    formData.append(
      "productDto",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-=lg-6">
          <div className="card border-bloom-secondary shadow">
            <div className="card-header bg-bloom-primary text-white">
              <h2 className="mb-0 text-center">Add New Product</h2>
            </div>
            <div className="card-body bg-bloom-light">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="form-label text-bloom-dark fw-bold"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Rose Bouquet"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label text-bloom-dark fw-bold"
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Describe your floral arrangement..."
                    required
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="price"
                      className="form-label text-bloom-dark fw-bold"
                    >
                      Price ($)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={product.price}
                      onChange={handleInputChange}
                      placeholder="54.99"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="stockQuantity"
                      className="form-label text-bloom-dark fw-bold"
                    >
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="stockQuantity"
                      name="stockQuantity"
                      min="0"
                      value={product.stockQuantity}
                      onChange={handleInputChange}
                      placeholder="10"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="category"
                    className="form-label text=bloom-dark fw-bold"
                  >
                    Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="bouquets">Bouquets</option>
                    <option value="arrangements">Arrangements</option>
                    <option value="single-flowers">Single Flowers</option>
                    <option value="plants">Plants</option>
                    <option value="gifts">Gift Baskets</option>
                    <option value="seasonal">Seasonal</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="imageFile"
                    className="form-label text-bloom-dark fw-bold"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    required
                  />
                </div>

                <div className="d-grid">
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
                        Adding Product...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
