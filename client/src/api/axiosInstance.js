import axios from "axios";
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  removeUserFromLocalStorage,
  setTokenInLocalStorage,
} from "../functions/localStorageOperations";
import { logoutSuccess, signInSuccess } from "../app/features/authSlice";

let store;
export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use(
  async (config) => {
    try {
      let token = getTokenFromLocalStorage();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    } catch (err) {
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshTokenFromLocalStorage();
      return instance
        .post("/auth/refresh-token", { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            setTokenInLocalStorage(res.data.accessToken);
            store.dispatch(signInSuccess());
            return instance(originalRequest);
          }
        });
    } else if (error.response.status === 403) {
      removeUserFromLocalStorage();
      store.dispatch(logoutSuccess());
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default instance;
