import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleData: [],
  step_one: false,
  step_two: false,
  step_three: false,
  step_four: false,
  contactinfo: [],
  submitPlan: "",
  postTab: false,
  repliesTab: false
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
    storeVehicleData: (state, action) => {
      state.vehicleData = action.payload;
    },
    postTab: (state, action) => {
      state.postTab = action.payload;
    },
    repliesTab: (state, action) => {
      state.repliesTab = action.payload;
    },
  },
});

export const {
  step_one,
  step_two,
  step_three,
  contactinfosave,
  selectPlan,
  storeVehicleData,
  postTab,
  repliesTab
} = submitdetails.actions;

export default submitdetails.reducer;
