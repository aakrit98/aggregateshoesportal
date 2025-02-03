import React, { useState } from "react";
import ProductPage from "./ProductPage";

const ShowProduct = () => {
  // Initialize cart state as an empty array
  const [cart, setCart] = useState([]);

  // Function to handle adding product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} added to cart!`); // Show an alert for confirmation
  };

  return (
    <div>
      {/* Pass cart and addToCart function as props to ProductPage */}
      <ProductPage cart={cart} addToCart={addToCart} />
    </div>
  );
};

export default ShowProduct;
