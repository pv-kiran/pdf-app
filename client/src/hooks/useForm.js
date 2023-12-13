import { useState } from "react";

import { useAuth } from "./useAuth";
import { useValidate } from "./useValidate";

import { showToast } from "../functions/toastNotification";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const { errors, validate, clearError } = useValidate();

  const { signin, signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    clearError(name);
  };

  const handleSubmit = async (e, formType, user) => {
    e.preventDefault();
    const valid = validate(user, formType);

    if (valid) {
      try {
        formType === "signup" ? await signup(user) : await signin(user);
        resetForm();
        showToast(`${formType?.toUpperCase()} SUCESS`, "success");
      } catch (err) {
        showToast(err?.data?.message, "error");
      }
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, errors };
};
