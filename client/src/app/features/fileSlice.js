/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  error: null,
  loading: false,
  success: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    fileUpload: (state, action) => {
      state.loading = true;
    },
    fileUploadSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.file = action.payload;
    },
    fileUploadFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { fileUpload, fileUploadSuccess, fileUploadFailure } =
  fileSlice.actions;

export default fileSlice.reducer;
