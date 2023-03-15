import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: {},
  planSelectByDealer: "",
};

const planReducer = createSlice({
  name: "plan",
  initialState,
  reducers: {
    getPlan: (state, action) => {
      state.plan = action.payload;
    },
    getPlanByDealerSelect: (state, action) => {
      state.planSelectByDealer = action.payload;
    },
  },
});

export const { getPlan, getPlanByDealerSelect } = planReducer.actions;

export default planReducer.reducer;
