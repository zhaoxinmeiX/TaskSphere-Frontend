import api from './api';

export const getTasks = async () => {
  try {
    const response = await api.get('/tasks/');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
