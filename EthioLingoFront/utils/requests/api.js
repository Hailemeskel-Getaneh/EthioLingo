import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'http://192.168.12.100:5000';

function isTokenExpired(token) {
  console.log("Validating token...",token);
  try {
    const decoded = jwtDecode(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    let expirationTime;
    
    const expiresInValue = parseInt(decoded.expiresIn);
    const expiresInUnit = decoded.expiresIn.replace(/\d+/g, '');
    
    // convert to seconds
    let expiresInSeconds = 0;
    if (expiresInUnit === 'h') {
      expiresInSeconds = expiresInValue * 60 * 60;
    } else if (expiresInUnit === 'd') {
      expiresInSeconds = expiresInValue * 24 * 60 * 60;
    } else if (expiresInUnit === 'm') {
      expiresInSeconds = expiresInValue * 60;
    } else {
      expiresInSeconds = expiresInValue;
    }
    
    expirationTime = decoded.iat + expiresInSeconds;
    console.log(`Current time: ${currentTimeInSeconds}, Token expires: ${expirationTime}`);
    const isExpired = expirationTime < currentTimeInSeconds;
    console.log(`Token is ${isExpired ? 'expired' : 'valid'}`);
    
    return isExpired;

  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

async function rotateToken(){
    let access_token = await SecureStore.getItemAsync("access_token");
    let refresh_token = await SecureStore.getItemAsync("refresh_token");
    let userId = await SecureStore.getItemAsync("userId");

    if (!userId) {
        return null;
    }
    
    if (!access_token || !refresh_token) {
        return null;
    }

    if (isTokenExpired(access_token)) {
        const response = await fetch(`${API_BASE_URL}/api/auth/refresh_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                access_token,
                refresh_token
            })
        });

        if (!response.ok) {
            await Logout();
            return null;
        }

        const data = await response.json();
        await SecureStore.setItemAsync("access_token", data.access_token);
        await SecureStore.setItemAsync("refresh_token", data.refresh_token);
    }
    return access_token;
}

async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const access_token = await rotateToken();
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (access_token) {
        defaultOptions.headers['Authorization'] = `Bearer ${access_token}`;
    }
    
    try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: `HTTP error! status: ${response.status}`
            }));
            throw new Error(error.message || `request failed with status ${response.status}`);
        }
        
        return response.json();
        
    } catch (error) {
        console.error('Fetch Error Details:', {
            message: error.message,
        });
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        
        const response = await fetchAPI('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        
        if (response) {
            
            const userId = String(response.userId || '');
            const access_token = String(response.accessToken || '');
            const refresh_token = String(response.refreshToken || '');
            
            
            if (userId && access_token && refresh_token) {
                await SecureStore.setItemAsync("userId", userId);
                await SecureStore.setItemAsync("access_token", access_token);
                await SecureStore.setItemAsync("refresh_token", refresh_token);
                
            } else {
                console.error('missing creds');
            }
        }
        return response;
    } catch (error) {
        console.error('login failed with error:', {
            message: error.message,
            type: error.constructor.name
        });
        throw error;
    }
}

export const Signup = async(fullName, email, password) => {
    try {
        
        const response = await fetchAPI('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ fullName, email, password }),
        });
        
        if (response.body) {
            const userId = response.body.userId;
            const access_token = response.body.access_token;
            const refresh_token = response.body.refresh_token;
            
            await SecureStore.setItemAsync("userId", userId);
            await SecureStore.setItemAsync("access_token", access_token);
            await SecureStore.setItemAsync("refresh_token", refresh_token);
        }
        
        return response;
    } catch (error) {
        console.error('signup failed with error:', {
            message: error.message,
            type: error.constructor.name
        });
        throw error;
    }
}

export const Logout = async () => {
    try {
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("refresh_token");
        return true;
    } catch (error) {
        console.error('logout failed with error:', {
            message: error.message,
            type: error.constructor.name
        });
        throw error;
    }
}
