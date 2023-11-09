import { useDispatch } from "react-redux";
import { logoutSuccess, logoutFailure } from "../app/features/authSlice";
import instance from "../api/axiosInstance";
import { removeUserFromLocalStorage } from "../functions/localStorageOperations";

export const useLogout = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      await instance.delete("/auth/signout");
      removeUserFromLocalStorage();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
};
