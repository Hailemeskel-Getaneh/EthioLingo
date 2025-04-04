import { Alert } from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';



function isTokenExpired(token) {
  console.log('Validating token...', token);
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
    console.error('Error decoding token:', error);
    return true;
  }
}

async function rotateToken() {
  const access_token = await SecureStore.getItemAsync('access_token');
  const refresh_token = await SecureStore.getItemAsync('refresh_token');
  const userId = await SecureStore.getItemAsync('userId');

  if (!userId) {
    return null;
  }

  if (!access_token || !refresh_token) {
    return null;
  }

  if (isTokenExpired(access_token)) {
    const response = await fetch(`${API_URL}/api/auth/refresh_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        access_token,
        refresh_token,
      }),
    });

    if (!response.ok) {
      await Logout();
      return null;
    }

    const data = await response.json();
    await SecureStore.setItemAsync('access_token', data.access_token);
    await SecureStore.setItemAsync('refresh_token', data.refresh_token);
  }
  return access_token;
}

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const access_token = await rotateToken();
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (access_token) {
    defaultOptions.headers.Authorization = `Bearer ${access_token}`;
  }

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
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




export const login = async (email, password, navigation) => {
  try {
    const response = await fetchAPI('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response) {
      const { userId, accessToken, refreshToken, redirectTo } = response;

      if (userId && accessToken && refreshToken) {
        await SecureStore.setItemAsync('userId', userId);
        await SecureStore.setItemAsync('access_token', accessToken);
        await SecureStore.setItemAsync('refresh_token', refreshToken);

        
        if (redirectTo === 'language-selection') {
          navigation.navigate('LanguageSelectionScreen'); 
        } else if (redirectTo === 'home') {
          navigation.navigate('HomeScreen'); 
        } else {
          console.error('Unknown redirect target');
        }
      } else {
        console.error('Missing credentials during login');
      }
    }
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};




export const Signup = async (fullName, email, password) => {
  try {
    const response = await fetchAPI('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password }),
    });

    if (response.body) {
      const { userId } = response.body;
      const { access_token } = response.body;
      const { refresh_token } = response.body;

      await SecureStore.setItemAsync('userId', userId);
      await SecureStore.setItemAsync('access_token', access_token);
      await SecureStore.setItemAsync('refresh_token', refresh_token);
    }

    return response;
  } catch (error) {
    console.error('signup failed with error:', {
      message: error.message,
      type: error.constructor.name,
    });
    throw error;
  }
};

export const Logout = async () => {
  try {
    await SecureStore.deleteItemAsync('userId');
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    return true;
  } catch (error) {
    console.error('logout failed with error:', {
      message: error.message,
      type: error.constructor.name,
    });
    throw error;
  }
};



export const setLanguageandTime = async (selectedLanguage, selectedTime) => {
  if (!selectedLanguage || !selectedTime) {
    Alert.alert("Select Goal", "Please select both a language and a goal before proceeding.");
    return false;
  }

  try {
    const userId = await SecureStore.getItemAsync("userId");
    console.log("Retrieved userId:", userId);
    if (!userId) {
      Alert.alert("Error", "User ID not found. Please log in again.");
      return false;
    }

    console.log("Making request to:", `${API_URL}/api/profile/create-profile`);
    console.log("With data:", {
      userId, 
      language: selectedLanguage,
      goalTime: selectedTime.minutes,
    });

    const response = await axios.post(`${API_URL}/api/profile/create-profile`, {
      userId, 
      language: selectedLanguage,
      goalTime: selectedTime.minutes,
    });

    console.log("Response:", response);

    if (response.status === 200 || response.status === 201) {
      console.log("Profile Created Successfully:", response.data);
      return true; 
    } else {
      Alert.alert("Error", "Failed to create profile. Please try again.");
      return false;
    }
  } catch (error) {
    console.error("Full error object:", error);
    
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      Alert.alert("Error", error.response.data.message || "Failed to create profile. Please try again.");
    } else if (error.request) {
      console.error("Request was made but no response received:", error.request);
      Alert.alert("Network Error", "Server didn't respond. Please check your connection.");
    } else {
      console.error("Error setting up request:", error.message);
      Alert.alert("Error", "Failed to setup request. Please try again.");
    }
    
    return false;
  }
};


export const getUserProfile = async () => {
  try {
   
    let access_token = await rotateToken();  
    if (!access_token) {
      Alert.alert('Error', 'No valid access token found');
      throw new Error('No valid token found');
    }
    const userId = await SecureStore.getItemAsync('userId');
    console.log("Stored User ID:", userId);

    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.get(`${API_URL}/api/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);

    if (error.response && error.response.status === 404) {
      Alert.alert('Profile not found', 'The user profile does not exist.');
    } else if (error.message === 'No valid token found') {
      Alert.alert('Error', 'Please login again');
    } else {
      Alert.alert('Error', 'There was an issue fetching your profile.');
    }

    throw error;
  }
};
