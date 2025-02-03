import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/SingleItems/singleSlice";

const ShoeList = () => {
  const dispatch = useDispatch();
  const { cartItems, filteredItems, category } = useSelector(state => state.singleproducts);

  useEffect(() => {
    dispatch(fetchItems());  // Fetch items when component mounts
  }, [dispatch]);

  const itemsToDisplay = category ? filteredItems : cartItems; // Show filtered items if category is selected, otherwise show all items

  return (
    <div>
      <h2>{category ? `${category} Shoes` : "All Shoes"}</h2>
      <div className="grid grid-cols-3 gap-4">
        {itemsToDisplay.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;
