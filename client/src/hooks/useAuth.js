import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from "../app/features/authSlice";
import { useAuthAPI } from "./useAuthAPI";

export const useAuth = () => {
  const signup = useAuthAPI("/auth/signup", signUpSuccess, signUpFailure);
  const signin = useAuthAPI("/auth/signin", signInSuccess, signInFailure);

  return { signup, signin };
};
