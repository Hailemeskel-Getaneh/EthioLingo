import { StorageService } from './storageService';

const BASE_URL = 'http://localhost:5000/api';

export const apiClient = async (endpoint, options = {}) => {
  const token = await StorageService.getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (error) {
    console.error(`[API Client Error] ${endpoint}`, error);
    throw error;
  }
};
