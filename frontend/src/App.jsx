import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add_product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
