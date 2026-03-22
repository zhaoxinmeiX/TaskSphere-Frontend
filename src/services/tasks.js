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

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks/create/', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/update/`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await api.delete(`/tasks/${taskId}/delete/`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
