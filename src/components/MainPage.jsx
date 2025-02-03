import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Change Switch to Routes
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import products from "../products.json";

const MainPage = () => {
  // State to manage the cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if product is already in the cart
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Update the quantity if product is already in the cart
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new product to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <Routes>
        {" "}
        {/* Change Switch to Routes */}
        {/* Route for the ProductPage, passing products and addToCart function */}
        <Route
          path="/"
          element={<ProductPage products={products} addToCart={addToCart} />}
        />
        {/* Route for the CartPage, passing cartItems */}
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
};

export default MainPage;
