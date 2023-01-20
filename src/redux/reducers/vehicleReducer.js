import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleData: [],
  showroomData: [],
  filterCategory: {},
};

const vehicleReducer = createSlice({
  name: "allVehicle",
  initialState,
  reducers: {
    storeAllVehicle: (state, action) => {
      const data = action.payload.reverse();
      const uniqueYear = [
        ...new Map(
          action.payload.map((item) => [item["year"], item.year])
        ).values(),
      ];
      const uniqueMake = [
        ...new Map(
          action.payload.map((item) => [item["make"], item.make])
        ).values(),
      ];
      const uniqueModal = [
        ...new Map(
          action.payload.map((item) => [item["model"], item.model])
        ).values(),
      ];
      const uniqueState = [
        ...new Map(
          action.payload.map((item) => [item["state"], item.state])
        ).values(),
      ];
      const uniqueCity = [
        ...new Map(
          action.payload.map((item) => [item["city"], item.city])
        ).values(),
      ];

      state.vehicleData = data;
      state.showroomData = data;
      state.filterCategory = {
        year: uniqueYear,
        make: uniqueMake,
        model: uniqueModal,
        state: uniqueState,
        city: uniqueCity,
      };
    },
    filterShowroomData: (state, action) => {
      const { year, make, model, state: states, city } = action.payload;
      const newData = state.vehicleData.filter(
        (item) =>
          (item.year && item.year === year) ||
          (item.make && item.make === make) ||
          (item.model && item.model === model) ||
          (item.state && item.state === states) ||
          (item.city && item.city === city)
      );
      console.log("showroom", newData);
      state.showroomData = newData;
    },
    clearShowroomFilter: (state, action) => {
      state.showroomData = state.vehicleData;
    },
    clearData: (state, action) => {
      state.vehicleData = [];
      state.showroomData = [];
      state.filterCategory = {};
    },
  },
});

export const {
  storeAllVehicle,
  filterShowroomData,
  clearShowroomFilter,
  clearData,
} = vehicleReducer.actions;

export default vehicleReducer.reducer;
