import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    tax: 0,
    payableAmount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity++;
      } else {
        const tempProduct = { ...action.payload };
        state.products.unshift(tempProduct);
      }
    },
    clearCart(state, action) {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
