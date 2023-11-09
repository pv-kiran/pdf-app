/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpSuccess: (state, action) => {
      state.error = null;
      state.success = true;
    },
    signUpFailure: (state, action) => {
      state.success = null;
      state.error = action.payload;
      state.success = false;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.success = true;
    },
    signInFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.success = false;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      state.error = null;
      state.success = true;
    },
    logoutFailure: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;

export default authSlice.reducer;
