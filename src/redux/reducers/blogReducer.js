import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogData: [],
};

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    storeBlogData: (state, action) => {
      state.blogData = action.payload;
    },
  },
});

export const { storeBlogData } = blogReducer.actions;

export default blogReducer.reducer;
