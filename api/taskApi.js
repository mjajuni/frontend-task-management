import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data.data;
};

export const createTask = async (payload) => {
  const res = await axios.post(`${API_URL}/tasks`, payload);
  return res.data.data;
};

export const updateTask = async ({ id, payload }) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, payload);
  return res.data.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
