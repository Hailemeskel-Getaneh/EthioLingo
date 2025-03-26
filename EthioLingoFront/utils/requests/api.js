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
