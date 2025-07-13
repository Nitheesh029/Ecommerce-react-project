import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cart: [{ id: 1, imgUrl: "", price: 1000, quantity: 2, rating: 5 }],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, imgUrl, price, quantity, rating } = action.payload;

      const existingItem = state.cart.find(
        (item) => item.imgUrl === imgUrl && item.price === price
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = {
          id,
          imgUrl,
          price,
          quantity,
          rating,
        };
        state.cart.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    },
  },
});

export const { addItem, removeItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
