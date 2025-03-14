import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import authService from "./services/authService";
import ProtectedRoute from "./routes/ProtectedRoute";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import axios from "axios";

//TODO: Clean up components, refactor into a more clean approach when not on time crunch

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log(
      "Before initializeAuth, axios headers:",
      axios.defaults.headers.common
    );
    const authResult = authService.initializeAuth();
    console.log("After initializeAuth, result:", authResult);
    console.log(
      "After initializeAuth, axios headers:",
      axios.defaults.headers.common
    );
  }, []);

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
        {/* Public routes */}
        <Route
          path="/"
          element={<Home selectedCategory={selectedCategory} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
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
        {/* Protected admin routes */}
        <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
          <Route path="/admin/products/add" element={<AddProduct />} />
        </Route>

        {/* Customer routes */}
        <Route element={<ProtectedRoute requiredRole="ROLE_CUSTOMER" />}>
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Route>

        {/* Admin/Agent routes */}
        <Route
          element={
            <ProtectedRoute requiredRole={["ROLE_ADMIN", "ROLE_AGENT"]} />
          }
        >
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
