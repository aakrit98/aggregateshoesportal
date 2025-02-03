import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../products.json";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { CheckIcon } from "../icons";
// import {Button} from antd
// import {CheckOutlined} from "@antd-design/"
// <CheckOutlined />

function ProductPage() {
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const dispatch = useDispatch();

  // Get the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the add to cart action
    setOpenModal(true); // Show the modal
    setTimeout(() => {
      setOpenModal(false); // Hide the modal after 3 seconds
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-black">
          Aggregate Shoes Portal
        </h1>
        <p className="text-lg text-yellow-600 mt-2">
          Find your perfect pair of shoes from Nike, Adidas, and Vans
        </p>
      </div>

      {/* Modal for success message */}
      {openModal && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-smokeWhite text-black p-4 rounded-lg shadow-lg text-center flex items-center justify-center">
          <CheckIcon className="mr-2" />{" "}
          {/* Add some margin to the right of the icon */}
          <p className="text-xl font-semibold">Item added to cart!</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] flex flex-col justify-between"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain rounded-lg mb-4"
            />

            {/* Product Details */}
            <h2 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            <span className="text-sm text-gray-500 mt-1">{product.brand}</span>

            {/* Price */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-900">
                ${product.price}
              </span>
            </div>

            {/* Buttons (View Details and Add to Cart) */}
            <div className="mt-4 flex justify-between space-x-4">
              <Link
                to={`/product/${product.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Details
              </Link>
              <button
                onClick={() => handleAddtoCart(product)} // Pass to add to cart
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-red-500 transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg text-gray-600">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
