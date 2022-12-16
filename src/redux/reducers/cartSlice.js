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
    decreaseCart(state, action) {
      const itemIndex = state.products.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
      } else if (state.products[itemIndex].quantity === 1) {
        const nextCartItems = state.products.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.products = nextCartItems;
      }
    },
    increaseCart(state, action) {
      const itemIndex = state.products.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      if (state.products[itemIndex].quantity >= 1) {
        state.products[itemIndex].quantity =
          parseInt(state.products[itemIndex].quantity, 10) + 1;
      }
    },

    clearCart(state, action) {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addProduct, clearCart, decreaseCart, increaseCart } =
  cartSlice.actions;
export default cartSlice.reducer;
