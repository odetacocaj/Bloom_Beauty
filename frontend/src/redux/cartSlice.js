import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: item.quantity || 1 });
      }
      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      saveCartToLocalStorage(state);
    },
    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const selectCartSubtotal = (state) => {
  return state.cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
};

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
