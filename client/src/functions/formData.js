export const getFormData = (formType) => {
  if (formType === "signup") {
    return {
      name: "",
      email: "",
      mobile: "",
      password: "",
    };
  } else {
    return {
      email: "",
      password: "",
    };
  }
};
