import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: {},
};

const planReducer = createSlice({
  name: "plan",
  initialState,
  reducers: {
    getPlan: (state, action) => {
      state.plan = action.payload;
    },
  },
});

export const { getPlan } = planReducer.actions;

export default planReducer.reducer;
