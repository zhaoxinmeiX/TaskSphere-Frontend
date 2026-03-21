import api from './api';

export const registerAccount = async ({ username, password }) => {
  const response = await api.post('/accounts/register/', { username, password });
  return response.data;
};

export const loginAccount = async ({ username, password }) => {
  const response = await api.post('/accounts/login/', { username, password });
  return response.data;
};

export const logoutAccount = () => {
  localStorage.removeItem('token');
};

