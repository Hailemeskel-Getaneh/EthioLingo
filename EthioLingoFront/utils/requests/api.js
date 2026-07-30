import { getStorageItem, setStorageItem } from '../storageUtils';

const BASE_URL = (typeof process !== 'undefined' && process.env.API_URL) || 'http://localhost:5000/api';

async function jsonFetch(endpoint, options = {}) {
  const token = await getStorageItem('@user_token', null);
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let body = null;
  try {
    body = await response.json();
  } catch (e) {
    // response not JSON
  }

  if (!response.ok) {
    const message = (body && (body.message || body.error)) || 'API request failed';
    const err = new Error(message);
    err.status = response.status;
    err.body = body;
    throw err;
  }

  return body;
}

export async function login(email, password) {
  const data = await jsonFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Map snake_case to camelCase to satisfy lint rules
  const accessToken = data && data.access_token ? data.access_token : data && data.accessToken;
  const refreshToken = data && data.refresh_token ? data.refresh_token : data && data.refreshToken;

  if (accessToken) {
    await setStorageItem('@user_token', accessToken);
  }

  return { accessToken, refreshToken };
}

export async function logout() {
  // clear token locally; backend logout can be optional
  await setStorageItem('@user_token', null);
}

export async function fetchWithAuth(endpoint, options = {}) {
  return jsonFetch(endpoint, options);
}
