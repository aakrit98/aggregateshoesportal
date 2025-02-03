import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Shoes",
      price: 50,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "T-shirt",
      price: 20,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Your Shopping Cart
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-6 border-b pb-6"
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 text-center p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary Section */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cart Summary
          </h2>
          <div className="flex justify-between mb-4">
            <span className="text-lg text-gray-700">Subtotal:</span>
            <span className="text-xl font-semibold text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg text-gray-700">Shipping:</span>
            <span className="text-xl font-semibold text-gray-900">$10.00</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-lg text-gray-700">Tax:</span>
            <span className="text-xl font-semibold text-gray-900">
              ${(calculateTotal() * 0.1).toFixed(2)}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between mb-8">
            <span className="text-2xl font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-semibold text-gray-900">
              ${(calculateTotal() + 10 + calculateTotal() * 0.1).toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
