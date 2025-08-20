import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export const auth = {
  checkAuth: async () => {
    const response = await api.get('/auth/check-auth');
    return response.data.user;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data.user;
  },

  logout: async () => await api.post('/auth/logout'),

  signup: async (data) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  verifyEmail: async (data) => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  }
};
