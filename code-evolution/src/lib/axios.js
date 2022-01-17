import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:4000'
});

axios.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json';
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(message);
  }
);
