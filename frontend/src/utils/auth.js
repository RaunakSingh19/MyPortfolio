import api from './axios';

// Register user
export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};

// Login user
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// Logout user
export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

// Get current user profile
export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};