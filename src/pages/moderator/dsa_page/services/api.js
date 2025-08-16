import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://your-api-base-url.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Request interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem('refreshToken')
        });
        
        localStorage.setItem('token', response.data.accessToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        return API(originalRequest);
      } catch (err) {
        // Redirect to login or handle refresh token failure
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;