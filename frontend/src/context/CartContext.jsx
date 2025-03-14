import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
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

  // Update item quantity
  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Value to be provided by the context
  const value = {
    cartItems,
    cartItemCount,
    cartSubtotal,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
