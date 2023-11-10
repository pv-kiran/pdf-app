import { useState } from "react";
import { useUploadAPI } from "./useUploadAPI";

export const useUpload = () => {
  const [pdf, setPdf] = useState("");
  const pdfUpload = useUploadAPI();

  const handleChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("pdf", pdf);
    pdfUpload(formData);
  };
  const handleClear = () => {
    setPdf("");
  };

  return { pdf, handleChange, handleSubmit, handleClear };
};
