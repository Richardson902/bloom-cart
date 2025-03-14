import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";

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
import Footer from "./components/Footer";
import ConfirmOrder from "./pages/ConfirmOrder";
import AdminDashboard from "./pages/AdminDashboard";
import NotImplemented from "./pages/NotImplemented";
import AdminUsers from "./pages/AdminUsers";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

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
      {/* This wrapper div ensures the footer stays at bottom of viewport */}
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          setSelectedCategory={setSelectedCategory}
          cartItemCount={cartItemCount}
        />

        {/* Main content area that will expand to push footer down */}
        <main className="flex-grow-1">
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
            <Route path="/todo" element={<NotImplemented />} />

            {/* Protected admin routes */}
            <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/users" element={<AdminUsers />} />
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
            </Route>
          </Routes>
        </main>

        {/* Footer will always be at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
