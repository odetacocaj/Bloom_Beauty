// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + item.quantity;
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity = (item.quantity || 1) - 1;
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
