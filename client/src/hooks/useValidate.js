import { useState } from "react";
import {
  emailRegex,
  mobileRegex,
  pswrdRegex,
  pswrdRule,
} from "../constants/regexConstants";

export const useValidate = () => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const validate = (user, formType) => {
    let newErrors = { email: "", password: "", name: "", mobile: "" };
    let isValid = true;

    const validateEmail = (email) => {
      return emailRegex.test(email);
    };

    const validateMobile = (mobile) => {
      return mobileRegex.test(mobile);
    };

    if (formType === "signup") {
      if (user.name.length < 5) {
        newErrors.name = "Name must be at least 5 characters";
        isValid = false;
      }

      if (/\d/.test(user.name)) {
        newErrors.name = "Name must not include numbers";
        isValid = false;
      }

      if (!validateMobile(user.mobile)) {
        newErrors.mobile = "Invalid mobile number";
        isValid = false;
      }
    }

    if (!validateEmail(user.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!pswrdRegex.test(user.password) || !pswrdRule.test(user.password)) {
      newErrors.password =
        "Password must include a character and a special character";
      isValid = false;
    }

    if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearError = (error) => {
    setErrors((prev) => {
      return {
        ...prev,
        [error]: "",
      };
    });
  };

  return { errors, validate, clearError };
};
