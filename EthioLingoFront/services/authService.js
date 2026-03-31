import { apiClient } from './apiClient';

export const AuthService = {
  login: async (email, password) => apiClient('/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: async (name, email, password) => apiClient('/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
};
// AuthService helper variant 1
// AuthService helper variant 2
// AuthService helper variant 3
