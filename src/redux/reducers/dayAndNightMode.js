import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: true,
};

export const dayAndNightMode = createSlice({
  name: "day_night_mode",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = !state.mode;
    },
  },
});

export const { changeMode } = dayAndNightMode.actions;

export default dayAndNightMode.reducer;
