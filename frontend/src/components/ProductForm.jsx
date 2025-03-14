import { useState } from "react";

import React from "react";

function ProductForm({ onSubmit, isSubmitting }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit({ product, image });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label text-bloom-dark fw-bold">
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
          <label htmlFor="price" className="form-label text-bloom-dark fw-bold">
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
          className="form-label text-bloom-dark fw-bold"
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
          <option value="gifts">Gift Baskets</option>
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

      <button
        type="submit"
        className="btn btn-bloom-primary w-100"
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
    </form>
  );
}

export default ProductForm;
