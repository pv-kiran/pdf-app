import { useState } from "react";

import { uploadPdf } from "../app/features/fileSlice";
import { useDispatch } from "react-redux";

export const useUpload = () => {
  const [pdf, setPdf] = useState("");

  const dipatch = useDispatch();

  const handleChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("pdf", pdf);
    try {
      dipatch(uploadPdf(formData));
      handleClear();
    } catch (err) {
      // showToast("File upload failed", "error");
    }
  };
  const handleClear = () => {
    setPdf("");
  };

  return { pdf, handleChange, handleSubmit, handleClear };
};
