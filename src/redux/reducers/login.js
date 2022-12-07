import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: {},
  user: {},
  login: false,
  reg: false,
  show: false,
};

export const login = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      state.token = action.payload;
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
    showModal: (state, action) => {
      state.show = true;
    },
    showModalClose: (state, action) => {
      state.show = false;
    },
  },
});

export const {
  authToken,
  auth,
  logoutUser,
  regBtn,
  showModal,
  showModalClose,
} = login.actions;

export default login.reducer;
