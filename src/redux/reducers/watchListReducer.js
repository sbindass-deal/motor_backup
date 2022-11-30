import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watch: 0,
};

export const watchListReducer = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setWatch: (state, action) => {
      state.watch = 1;
    },
    setUnWatch: (state, action) => {
      state.watch = 0;
    },
  },
});

export const { setWatch, setUnWatch } = watchListReducer.actions;

export default watchListReducer.reducer;
