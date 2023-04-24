import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: true,
  searchData: { searchResult: "", searchKey: "" },
  showAuction: false,
  showGarage: false,
  searchBail: false,
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
    handleShowAuction: (state, action) => {
      state.showAuction = action.payload;
    },
    handleShowGarage: (state, action) => {
      state.showGarage = action.payload;
    },
    handleBail: (state, action) => {
      state.searchBail = action.payload;
    },
  },
});

export const {
  changeMode,
  showResult,
  handleShowAuction,
  handleShowGarage,
  handleBail,
} = dayAndNightMode.actions;

export default dayAndNightMode.reducer;
