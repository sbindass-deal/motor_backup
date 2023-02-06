import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: "",
};

export const lotteryReducer = createSlice({
  name: "lottery",
  initialState,
  reducers: {
    lotteryExpDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { lotteryExpDate } = lotteryReducer.actions;

export default lotteryReducer.reducer;
