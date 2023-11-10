import instance from "../api/axiosInstance";

export const useUploadAPI = () => {
  return async (data) => {
    try {
      const response = await instance.post("/pdf/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};
