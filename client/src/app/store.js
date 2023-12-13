import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import fileReducer from "./features/fileSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer,
  },
});

export default store;
