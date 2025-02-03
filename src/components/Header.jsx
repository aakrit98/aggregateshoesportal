import { Link } from "react-router-dom";
import DropdownButton from "./categories";
import SearchBar from "../components/SearchBar";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartButton from "./CartButton";

const Header = () => {
  return (
    <div className="mx-2 mt-2 flex justify-between items-center relative bg-white">
      {" "}
      {/* Add bg-white here */}
      <div className="flex space-x-4">
        {" "}
        {/* Left side elements */}
        <Link
          to="/"
          className="px-4 py-2 text-black cursor-pointer hover:underline text-2xl"
        >
          Home
        </Link>
        <DropdownButton />
        <Link
          to="/postproduct"
          className="px-4 py-2 text-gray-700 cursor-pointer hover:underline text-2xl"
        >
          PostHere
        </Link>
      </div>
      {/* Middle section for SearchBar and Cart button */}
      <div className="flex items-center space-x-4">
        <SearchBar /> {/* Keep SearchBar */}
        {/* Cart Button placed beside SearchBar */}
        <Link to="/shopcart">
          <Button
            icon={<ShoppingCartOutlined />}
            size="large"
            shape="circle"
            className="relative"
          />
        </Link>
        {/* <CartButton /> */}
      </div>
      {/* Right section for Login and Signup buttons */}
      <div className="flex items-center space-x-4">
        {/* Login Button */}
        <Link
          to="/login"
          className="px-6 py-2 text-white text-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-teal-500 hover:to-blue-500 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
