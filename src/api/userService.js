import axios from 'axios';
import { API_BASE_URL, USERS_ENDPOINT } from '../utils/constants';
import { mapDashboardUserToApiUser } from '../utils/helpers';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getUsers() {
  const response = await apiClient.get(USERS_ENDPOINT);
  return response.data;
}

export async function createUser(user) {
  const response = await apiClient.post(USERS_ENDPOINT, mapDashboardUserToApiUser(user));
  return response.data;
}

export async function updateUser(id, user) {
  const response = await apiClient.put(`${USERS_ENDPOINT}/${id}`, mapDashboardUserToApiUser(user));
  return response.data;
}

export async function deleteUser(id) {
  const response = await apiClient.delete(`${USERS_ENDPOINT}/${id}`);
  return response.data;
}
