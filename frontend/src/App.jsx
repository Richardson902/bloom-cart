import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Home />} />
        <Route path="/add_product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
