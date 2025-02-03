import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";  // Import useDispatch
import { filterByCategory } from "../features/SingleItems/singleSlice";

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();  // Get the dispatch function

  const handleMouseEnterButton = () => {
    setIsOpen(true);
  };

  const handleMouseLeaveButton = () => {
    setIsOpen(false);
  };

  const handleMouseEnterDropdown = () => {
    setIsOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    setIsOpen(false);
  };

  const handleCategoryClick = (category) => {
    dispatch(filterByCategory(category)); // Dispatch the action to filter items by category
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="px-4 py-2 text-gray-700 cursor-pointer hover:underline text-2xl"
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      >
        Categories
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <li
            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick("nike")}
          >
            Nike
          </li>

          <li
            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick("adidas")}
          >
            Adidas
          </li>

          <li
            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick("vans")}
          >
            Vans
          </li>

          <li
            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            onClick={() => handleCategoryClick("secondhand")}
          >
            SecondHand
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;