import React from "react";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
const CartButton = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  const handleCartClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/shopcart");
    }
  };

  return (
    <div>
      <Button
        icon={<ShoppingCartOutlined />}
        shape="circle"
        size="large"
        className="relative"
        onClick={handleCartClick} //when it clicks it checks the function
      />
    </div>
  );
};

export default CartButton;
