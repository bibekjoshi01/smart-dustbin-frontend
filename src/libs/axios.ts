import axios from 'axios';
import Cookies from 'js-cookie';
import { showErrorToast } from '../utils/notifier';

export const baseURL = `${import.meta.env.VITE_PUBLIC_APP_HTTP_SCHEME}${import.meta.env.VITE_PUBLIC_APP_BASE_URL}`;

export const axiosInstance = axios.create({ baseURL });

// Add token and content-type
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('access');
  config.headers = config.headers || {};

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (config.data) {
    config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json';
  } else {
    delete config.headers['Content-Type'];
  }


  return config;
});

// Handle common errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      showErrorToast('Session expired. Please log in again.');
      Cookies.remove('access');
      window.location.href = '/';
    } else if (status === 403) {
      showErrorToast('Permission denied.');
    } else if (status === 404) {
      showErrorToast('Not found.');
    } else if (status >= 500) {
      showErrorToast('Server error. Try again later.');
    } else {
      showErrorToast(err?.message || 'Something went wrong.');
    }

    return Promise.reject(err);
  }
);
