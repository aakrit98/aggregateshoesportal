// import { ChevronDown, ChevronUp } from "../icons";
// import { removeItem, increase, decrease } from "../features/cart/cartSlice";
// import { useDispatch } from "react-redux";

// const CartItem = ({ id, img, title, price, amount }) => {
//   const dispatch = useDispatch();
//   return (
//     <article className="cart-item">
//       <img src={img} alt={title} />
//       <div>
//         <h4>{title}</h4>
//         <h4 className="item-price">${price}</h4>
//         <button
//           className="remove-btn"
//           onClick={() => {
//             dispatch(removeItem(id));
//           }}
//         >
//           remove
//         </button>
//       </div>
//       <div>
//         <button
//           className="amount-btn"
//           onClick={() => {
//             dispatch(increase({ id }));
//           }}
//         >
//           <ChevronUp />
//         </button>

//         <p className="amount">{amount}</p>
//         <button
//           className="amount-btn"
//           onClick={() => {
//             if (amount === 1) {
//               dispatch(removeItem(id));
//             } 
//             dispatch(decrease({ id }));
//           }}
//         >
//           <ChevronDown />
//         </button>
//       </div>
//     </article>
//   );
// };

// export default CartItem;



//---------------------- 




// CartItem.js
import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id,name, img, title, price, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-4">
        <img src={img} alt={title} className="w-10 h-10 object-cover rounded-md" />
        <div>
          <h4 className="font-semibold">{title}</h4> 
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600">Price: Rs{price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => dispatch(increase({ id }))}>
          <ChevronUp />
        </button>
        <input
          type="text"
          className="w-10 text-center border rounded"
          value={amount}
          readOnly
        />
        <button onClick={() => {
          if (amount === 1) {
            dispatch(removeItem(id));
          } else {
            dispatch(decrease({ id }));
          }
        }}>
          <ChevronDown />
        </button>
      </div>
      <button className="text-red-500 hover:text-red-700" onClick={() => dispatch(removeItem(id))}>
        Remove
      </button>
    </article>
  );
};

export default CartItem;
