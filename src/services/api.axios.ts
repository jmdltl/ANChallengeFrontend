import axios from 'axios';
import {
  getLocalStorageToken,
  removeLocalStorageToken,
} from '../utils/sessionStorage';

const api = axios.create({
  baseURL: 'http://localhost:3000/v0.1/api',
});

api.interceptors.request.use(
  function (config) {
    const token = getLocalStorageToken();
    if (token)
      config.headers['Authorization'] = `Bearer ${token.replaceAll('"', '')}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data?.statusCode == 401) {
      removeLocalStorageToken();
      location.reload();
    }
    return Promise.reject(error);
  },
);

export default api;
