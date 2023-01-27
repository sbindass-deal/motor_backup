import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: true,
  searchData: { searchResult: "", searchKey: "" },
};

export const dayAndNightMode = createSlice({
  name: "day_night_mode",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = !state.mode;
    },
    showResult: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { changeMode, showResult } = dayAndNightMode.actions;

export default dayAndNightMode.reducer;
