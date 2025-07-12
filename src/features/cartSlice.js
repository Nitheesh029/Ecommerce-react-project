import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cart: [{ id: 1, imgUrl: "", price: 1000, quantity: 2 }],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { imgUrl, price, quantity } = action.payload;
      const newItem = {
        id: nanoid(),
        imgUrl,
        price,
        quantity,
      };

      state.cart.push(newItem);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
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
