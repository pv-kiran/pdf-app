import { useState } from "react";
import instance from "../api/axiosInstance";
import { showToast } from "../functions/toastNotification";

export const useExtract = () => {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [downloadLink, setDownLoadLink] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleSelect = (page) => {
    if (selectedPages.length > 0 && selectedPages.includes(page)) {
      setSelectedPages((prev) => prev.filter((item) => item != page));
    } else {
      setSelectedPages((prev) => [...prev, page]);
    }
  };

  const handleExtract = async (id) => {
    const extractFrom = {
      id,
      selectedPages,
    };
    try {
      const { data } = await instance.post(`/pdf/extract`, extractFrom);
      console.log(data);
      setDownLoadLink(data);
    } catch (err) {
      console.log(err);
      showToast("Please try again", "error");
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await instance.get(`/pdf/${id}/download`, {
        responseType: "blob", // Set the response type to 'blob'
      });

      if (!response) {
        throw new Error("Failed to download file.");
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_file.pdf";

      // Append the link to the document and trigger a click
      document.body.appendChild(a);
      a.click();

      // Remove the link from the document
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading file:", err.message);
      showToast("Please try again", "error");
    }
  };

  return {
    numPages,
    onDocumentLoadSuccess,
    handleSelect,
    handleExtract,
    downloadLink,
    handleDownload,
  };
};
