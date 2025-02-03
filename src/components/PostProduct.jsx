import { useState } from "react";

// <Icon Type="vertical-align-top" Theme="Outline"/>

const PostProduct = () => {
  const [item, setItem] = useState("");
  const [shoes, setShoes] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null); // State to store image
  const [showModal, setShowModal] = useState(false); // State to show/hide error modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to show/hide success modal

  function handleSubmit(e) {
    e.preventDefault();

    // Check if all fields are filled out and an image is selected
    if (!item || !shoes || !desc || !image) {
      setShowModal(true); // Show the modal if validation fails
      return;
    }

    // Handle form submission (e.g., uploading the item details and image)
    const productData = {
      item,
      shoes,
      desc,
      image,
    };

    // You can now handle the uploaded image here, like sending the data to a server
    console.log("Product Data Submitted:", productData);

    // Show success modal after successful submission
    setShowSuccessModal(true);

    // Reset form after submission
    setItem("");
    setShoes("");
    setDesc("");
    setImage(null);

    // Close the success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "item") setItem(value);
    if (name === "shoes") setShoes(value);
    if (name === "desc") setDesc(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the error modal
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false); // Close the success modal manually
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-smokeWhite rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Post a Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="item"
            className="block text-gray-700 font-medium mb-2"
          >
            Item
          </label>
          <input
            type="text"
            id="item"
            name="item"
            placeholder="Enter item"
            value={item}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="shoes"
            className="block text-gray-700 font-medium mb-2"
          >
            Shoes Brand
          </label>
          <input
            type="text"
            id="shoes"
            name="shoes"
            placeholder="Shoes brand"
            value={shoes}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            name="desc"
            placeholder="Description"
            value={desc}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-4">
            <h4 className="text-gray-700">Image Preview:</h4>
            <img
              src={image}
              alt="Product Preview"
              className="w-full h-auto mt-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>

      {/* Modal for Error Message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl text-red-500 font-semibold">Error</h3>
            <p className="mt-2 text-gray-700">
              Please fill out all fields and choose an image.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Success Message */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl text-green-500 font-semibold">Success</h3>
            <p className="mt-2 text-gray-700">
              Your product has been successfully posted!
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeSuccessModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostProduct;
