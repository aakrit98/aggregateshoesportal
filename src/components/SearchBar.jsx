import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
  return (
    <div className="flex items-center border border-gray-900 rounded-full px-4 py-2 w-full max-w-xs shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search here" 
        className="flex-grow outline-none text-gray-900 placeholder-gray-400 py-1 pl-2 pr-4 rounded-l-full focus:ring-2 focus:ring-gray-500 transition-all"
      />

      {/* Search Button with Custom Color */}
      <Button
        type="primary"
        icon={<SearchOutlined />}
        className="ml-2 rounded-full px-3 py-1 focus:outline-none bg-gray-600 text-white border-gray-600 hover:bg-gray-700"
      />
    </div>
  );
};

export default SearchBar;
