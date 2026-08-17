import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fullstackproject-8b1d.onrender.com', 
});

// Automatically attach JWT token to headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;