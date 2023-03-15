import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
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
    removeFromCart(state, action) {
      const nextCartItems = state.products.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      state.products = nextCartItems;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    clearCart(state, action) {
      state.products = [];
      state.quantity = 0;
    },
    getTotals(state, action) {
      let { total, quantity, payableAmount } = state.products.reduce(
        (cartTotal, products) => {
          const { price, quantity } = products;
          const itemTotal = price * quantity;
          const totalAmount = itemTotal;
          cartTotal.total += itemTotal;
          cartTotal.quantity =
            parseInt(cartTotal.quantity, 10) + parseInt(quantity, 10);
          cartTotal.payableAmount += totalAmount;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          payableAmount: 0,
        }
      );
      state.quantity = quantity;
      state.total = total;
      state.payableAmount = payableAmount.toFixed(2);
    },
  },
});

export const {
  addProduct,
  clearCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
  getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
