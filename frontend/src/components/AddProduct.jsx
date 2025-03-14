import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ProductForm from "./ProductForm";

function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!authService.hasRole("ROLE_ADMIN")) {
      setError("You don't have permission to access this page");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate]);

  const handleSubmit = ({ product, image }) => {
    setIsSubmitting(true);

    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);

    formData.append(
      "productDto",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully", response.data);
        alert("Product added successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        setError("You don't have permission to add products");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-bloom-secondary shadow">
            <div className="card-header bg-bloom-primary text-white">
              <h2 className="mb-0 text-center">Add New Product</h2>
            </div>
            <div className="card-body bg-bloom-light">
              {error && <div className="alert alert-danger">{error}</div>}
              <ProductForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
