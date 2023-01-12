import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicleData: [],
  showroomData: [],
  filterCategory: [],
};

const vehicleReducer = createSlice({
  name: "allVehicle",
  initialState,
  reducers: {
    storeAllVehicle: (state, action) => {
      const data = action.payload.reverse();
      const uniqueObjArrayYear = [
        ...new Map(
          action.payload.map((item) => [item["year"], item.year])
        ).values(),
      ];
      const uniqueObjArrayMake = [
        ...new Map(
          action.payload.map((item) => [item["make"], item.make])
        ).values(),
      ];

      state.vehicleData = data;
      state.showroomData = data;
      state.filterCategory = [uniqueObjArrayYear, uniqueObjArrayMake];
    },
    filterShowroomData: (state, action) => {
      const { year, make } = action.payload;
      const newData = state.vehicleData.filter(
        (item) => item.year === year || item.make === make
      );
      state.showroomData = newData;
    },
  },
});

export const { storeAllVehicle, filterShowroomData } = vehicleReducer.actions;

export default vehicleReducer.reducer;
