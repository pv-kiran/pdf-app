/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

export const uploadPdf = createAsyncThunk(
  "user/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/pdf/upload", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      const { response } = error;
      console.log(response);
      return rejectWithValue(response.data);
    }
  }
);

const initialState = {
  uploadedFile: null,
  error: null,
  loading: false,
  success: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadPdf.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(uploadPdf.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.uploadedFile = action?.payload?.newPdf;
      state.error = null;
    });

    builder.addCase(uploadPdf.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action?.payload?.message;
    });
  },
});

// export const {} = fileSlice.actions;

export default fileSlice.reducer;
