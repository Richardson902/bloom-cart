import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <BrowserRouter>
      <Navbar setSelectedCategory={setSelectedCategory} />
      <Routes>
        <Route
          path="/"
          element={<Home selectedCategory={selectedCategory} />}
        />
        <Route path="/add_product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
