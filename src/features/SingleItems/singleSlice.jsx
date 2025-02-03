import { createSlice } from "@reduxjs/toolkit";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  filteredItems: [], // hold the filtered items like A
  category: "",
};

//slice create
const singleSlice = createSlice({
  name: "singleproducts",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.cartItems = action.payload; //fetches all the items here
    },
    filterByCategory: (state, action) => {
      const selectedCategory = action.payload;
      state.category = selectedCategory;

      if (selectedCategory) {
        state.filteredItems = state.cartItems.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      } else {
        state.filteredItems = state.cartItems;
      }
    },  
  },
});
export const { setItems, filterByCategory } = singleSlice.actions;

export const fetchItems = () => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setItems(data));
  } catch (error) {
    console.error("error fetching data:", error);
  }
};

export default singleSlice.reducer;
