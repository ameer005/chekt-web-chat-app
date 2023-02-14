import axios from "axios";
import useStore from "../store/useStore";

let URL = "https://chekt-backend.vercel.app/api/v1";

if (process.env.NODE_ENV !== "production") {
  URL = "http://127.0.0.1:5000/api/v1";
}

const useAxios = () => {
  const removeUser = useStore((state) => state.removeUser);
  const token = useStore((state) => state.token);

  const api = axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeUser();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useAxios;
