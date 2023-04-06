import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: {},
  planSelectByDealer: "",
  planSubscribe: false,
  garage: true,
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
    purchagedPlan: (state, action) => {
      state.planSubscribe = action.payload;
    },
    handleGarage: (state, action) => {
      state.garage = action.payload;
    },
  },
});

export const { getPlan, getPlanByDealerSelect, purchagedPlan, handleGarage } =
  planReducer.actions;

export default planReducer.reducer;
