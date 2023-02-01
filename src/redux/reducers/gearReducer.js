import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gearData: [],
};

const gearReducer = createSlice({
  name: "gearProduct",
  initialState,
  reducers: {
    storeGearData: (state, action) => {
      state.gearData = action.payload;
    },
  },
});

export const { storeGearData } = gearReducer.actions;

export default gearReducer.reducer;
