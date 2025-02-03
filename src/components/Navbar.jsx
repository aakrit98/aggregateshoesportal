import { CartIcon } from "../icons";
import { useSelector } from "react-redux"; 
import { ShoppingCartOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { amount } = useSelector((store) => store.cart);

  return (
    <nav className="fixed top-19 right-0 p-4">
      <div className="flex items-center justify-end">
        <h3 className="text-lg font-semibold mr-4">redux toolkit</h3>
        <div className="relative">
          <CartIcon className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {amount}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;