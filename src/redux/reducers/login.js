import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {},
  admin: null,
  login: false,
  reg: false,
  show: false,
};

const login = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      state.token = action.payload.access_token;
      state.user = action.payload
    },
    auth: (state, action) => {
      state.user = action.payload;
      state.login = true;
    },
    logoutUser: (state, action) => {
      state.user = {};
      state.login = false;
    },
    regBtn: (state, action) => {
      state.reg = true;
    },
    showModalLogin: (state, action) => {
      state.show = true;
    },
    showModalClose: (state, action) => {
      state.show = false;
    },
    isAdmin: (state, action) => {
      state.admin = action.payload.access_token;
      state.user = action.payload
    },
    reset: (state, action) => {
      state.token = null;
      state.user = {};
      state.admin = null;
      state.login = false;
      state.reg = false;
      state.show = false;
    },
  },
});

export const {
  authToken,
  auth,
  logoutUser,
  regBtn,
  showModalLogin,
  showModalClose,
  isAdmin,
  reset,
} = login.actions;

export default login.reducer;
