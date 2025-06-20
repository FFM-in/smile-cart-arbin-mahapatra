import axios from "axios";
import { keysToCamelCase } from "neetocist";

const transformKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformKeysToCamelCase(response);

    return response.data;
  });
};

const initializeAxios = () => {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
};

export default initializeAxios;
