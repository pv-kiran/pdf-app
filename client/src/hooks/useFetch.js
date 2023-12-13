import { useEffect, useState } from "react";
import instance from "../api/axiosInstance";
import { showToast } from "./../functions/toastNotification";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await instance.get(url);
      setData(data);
    } catch (err) {
      const { response } = err;
      setError(response?.data);
      showToast(response?.data?.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error };
};
