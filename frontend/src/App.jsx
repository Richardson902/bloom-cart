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
import { CartProvider, useCart } from "./context/CartContext";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import ConfirmOrder from "./pages/ConfirmOrder";
import AdminDashboard from "./pages/AdminDashboard";
import NotImplemented from "./pages/NotImplemented";

//TODO: Clean up components, refactor into a more clean approach when not on time crunch

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    authService.initializeAuth();
  }, []);

  return (
    <CartProvider>
      <AppContent
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </CartProvider>
  );
}

function AppContent({ selectedCategory, setSelectedCategory }) {
  const { cartItemCount } = useCart();

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
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
          <Route path="/admin/products/add" element={<AddProduct />} />
        </Route>

        {/* Customer routes */}
        <Route element={<ProtectedRoute requiredRole="ROLE_CUSTOMER" />}>
          <Route path="/order-confirmation" element={<ConfirmOrder />} />
          <Route path="/order-invoice" element={<OrderConfirmation />} />
        </Route>

        {/* Admin/Agent routes */}
        <Route
          element={
            <ProtectedRoute requiredRole={["ROLE_ADMIN", "ROLE_AGENT"]} />
          }
        >
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/todo" element={<NotImplemented />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
