import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      id: "12312fasdfasf",
      name: "ball",
      imgUrl: "",
      price: 1000,
      quantity: 2,
      rating: 5,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, imgUrl, price, quantity = 1, rating } = action.payload;

      if (!id) {
        console.warn("❌ Tried to add item without ID:", action.payload);
        return;
      }

      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ id, name, imgUrl, price, quantity, rating });
      }
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    updateItem: (state, action) => {
      const { id, quantity } = action.payload;
      if (!id) return;
      state.cart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    },
  },
});

export const { addItem, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart;

export const selectTotalQuantity = (state) =>
  state.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

export const selectCartTotal = (state) =>
  state.cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );
