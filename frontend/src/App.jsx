import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./components/Cart";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      // Check if already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // If the product exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // If does not exist, add to cart
        return [...prevItems, newItem];
      }
    });
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <BrowserRouter>
      <Navbar
        setSelectedCategory={setSelectedCategory}
        cartItemCount={cartItemCount}
      />
      <Routes>
        <Route
          path="/"
          element={<Home selectedCategory={selectedCategory} />}
        />
        <Route
          path="/products/:id"
          element={<Product addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateCartItemQuantity}
              removeItem={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="/add_product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
