import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step_one: false,
  step_two: false,
  step_three: false,
  step_four: false,
  contactinfo: [],
  submitPlan: "",
};

export const submitdetails = createSlice({
  name: "vechilesDetails",
  initialState,
  reducers: {
    step_one: (state, action) => {
      state.step_one = action.payload;
    },
    step_two: (state, action) => {
      state.step_two = action.payload;
    },
    step_three: (state, action) => {
      state.step_three = action.payload;
    },
    contactinfosave: (state, action) => {
      state.contactinfo.push(action.payload);
    },
    selectPlan: (state, action) => {
      state.submitPlan = action.payload;
    },
  },
});

export const { step_one, step_two, step_three, contactinfosave, selectPlan } =
  submitdetails.actions;

export default submitdetails.reducer;
