import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  login: false,
  reg: false,
};

export const login = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.user = action.payload;
      if (
        action.payload.name &&
        action.payload.email &&
        action.payload.username
      ) {
        state.login = true;
      } else {
        state.login = false;
      }
    },
    logoutUser: (state, action) => {
      state.user = {};
      state.login = false;
    },
    regBtn: (state, action) => {
      state.reg = true;
    },
  },
});

export const { auth, logoutUser, regBtn } = login.actions;

export default login.reducer;
