import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../products.json";

function ProductDetailPage() {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-yellow-400">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-black">{product.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{product.description}</p>
      </div>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain rounded-lg mb-4" // Keep the image responsive
        />
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <span className="text-sm text-gray-500 mt-1">{product.brand}</span>
        <p>{product.brief}</p>

        {/* Price and Back Button */}
        <div className="mt-4">
          <span className="text-xl font-semibold text-gray-900 block mb-4">
            ${product.price}
          </span>
          <div className="flex justify-between space-x-4">
            <Link
              to="/products"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
