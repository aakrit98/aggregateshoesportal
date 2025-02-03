// import React, { useEffect } from "react";
// import CartItem from "./CartItem";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../features/cart/cartSlice";
// import { openModal } from "../features/modal/modalSlice";
// const CartContainer = () => {
//   const dispatch = useDispatch();

//   const { cartItems, total, amount } = useSelector((store) => store.cart);

//   useEffect(() => {
//     console.log("Cart Items:", cartItems);
//     console.log("Total:", total);
//     console.log("Amount:", amount);
//   }, [cartItems, total, amount]);

//   if (amount < 1) {
//     return (
//       <section>
//         <header>
//           <h2>your bag</h2>
//           <h4 className="empty-cart">Is currently empty</h4>
//         </header>
//       </section>
//     );
//   }

//   return (
//     <section className="cart">
//       <header>
//         <h2>your bag</h2>
//       </header>
//       <div>
//         {cartItems.map((item) => {
//           return <CartItem key={item.id} {...item} />;
//         })}
//       </div>
//       <footer>
//         <hr />
//         <h4>
//           total <span>${total.toFixed(2)}</span>
//         </h4>
//         <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
//           clear cart
//         </button>
//       </footer>
//     </section>
//   );
// };

// export default CartContainer;

//-------------------

import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((store) => store.cart);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Total:", total);
  }, [cartItems, total]);

  if (cartItems.length < 1) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <header className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <h4 className="text-gray-600">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <div className="flex justify-center gap-8 p-8">
      {/* Cart Items List */}
      <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <div className="mb-4">
          <p className="flex justify-between text-gray-600">
            Subtotal: <span>Rs{total.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            Shipping: <span>Rs10.00</span>
          </p>
          <p className="flex justify-between text-gray-600">
            Tax: <span>Rs9.00</span>
          </p>
        </div>
        <hr className="my-2" />
        <h4 className="flex justify-between text-xl font-bold">
          Total: <span>Rs{(total + 10 + 9).toFixed(2)}</span>
        </h4>
        <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartContainer;
