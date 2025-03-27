<<<<<<< HEAD
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env'; 

// Function to set language and time (Goal)
export const setLanguageandTime = async (selectedLanguage, selectedTime, navigation) => {
  if (!selectedLanguage || !selectedTime) {
    Alert.alert("Select Goal", "Please select both a language and a goal before proceeding.");
    return;
  }

  try {
    // Fetch userId from AsyncStorage
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }

    // API request to create/update profile
    const response = await axios.post(`${API_URL}/api/user-profile/create-profile/${userId}`, {
      language: selectedLanguage.name, 
      goalTime: selectedTime.minutes 
    });

    console.log('Profile created/updated:', response.data);

    // Navigate to HomeScreen after successful profile update
    navigation.navigate('HomeScreen', { 
      selectedLanguage: selectedLanguage.name, 
      selectedTime: selectedTime.minutes 
    });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    Alert.alert('Error', 'There was an error creating your profile. Please try again.');
  }
};

// Function to fetch the user profile
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/userprofile/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user profile:', error);

  
    if (error.response && error.response.status === 404) {
      Alert.alert('Profile not found', 'The user profile does not exist.');
    } else {
      Alert.alert('Error', 'There was an issue fetching your profile.');
    }

    throw error;
  }
};
=======
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function isTokenExpired(token) {
  if (!token) {
    return true; 
  }

  try {
    const decoded = jwtDecode(token);
    if (typeof decoded.exp === 'undefined') {
      return true; 
    }

    const currentTimeInSeconds = Date.now() / 1000;
    return decoded.exp < currentTimeInSeconds; 

  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

async function rotateToken(){
    let access_token = SecureStore.getItemAsync("access_token");
    let refresh_token = await SecureStore.getItemAsync("access_token");
    let userId = await SecureStore.getItemAsync("access_token");

    if (!userId){
        return null
    }

    if (isTokenExpired(access_token)){
        const response = await fetch(`${API_BASE_URL}/auth/refresh_token`, {
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
            throw new Error('refresh token invalid');
            // logout
        }

        const data = await response.json();
        access_token = data.access_token
        await SecureStore.setItemAsync("access_token", data.access_token);
        await SecureStore.setItemAsync("refresh_token", data.refresh_token);
    }
    return access_token;

}

async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const access_token = await rotateToken()
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token || ''}`,
      },
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `request failed with status ${response.status}`);
    }
    
    return response.json();
  }






const login = async (email,passowrd) => {
    try {
        const response = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, passowrd }),
        });
        console.log(response)
        
        if (response.body) {
        const userId = response.body.userId
        const access_token = response.body.access_token
        const refresh_token = response.body.refresh_token
        // save into secure store
        await SecureStore.setItemAsync("userId", userId);
        await SecureStore.setItemAsync("access_token", access_token);
        await SecureStore.setItemAsync("refresh_token", refresh_token);
        }
        
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    
}

const Signup = async(fullName, email, password) => {

    try {
        const response = await fetchAPI('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ fullName, email, password }),
        });
        console.log(response)
        
        if (response.body) {
        const userId = response.body.userId
        const access_token = response.body.access_token
        const refresh_token = response.body.refresh_token
        // save into secure database
        await SecureStore.setItemAsync("userId", userId);
        await SecureStore.setItemAsync("access_token", access_token);
        await SecureStore.setItemAsync("refresh_token", refresh_token);
        }
        
        return response;
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      }
    
}

>>>>>>> c562c8e868b750fdb1e71bf3ec0ba56a26bdb3e9
