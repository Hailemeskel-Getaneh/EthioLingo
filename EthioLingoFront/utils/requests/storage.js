import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


export const saveLanguageandTime = async (language, time) => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    
    if (!userId) {
      console.error('User ID not found in SecureStore.');
      return;
    }
    const goalData = JSON.stringify({ language, time });
    await AsyncStorage.setItem(`userGoal_${userId}`, goalData);  
    console.log('Stored data in AsyncStorage successfully');
  } catch (error) {
    console.error('Error saving goal to local storage:', error);
  }
};


export const getStoredProfile = async () => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    
    if (!userId) {
      console.error('User ID not found in SecureStore.');
      return null;
    }
    const storedData = await AsyncStorage.getItem(`userGoal_${userId}`);  
    return storedData ? JSON.parse(storedData) : null;  
  } catch (error) {
    console.error('Error retrieving goal from local storage:', error);
    return null; 
  }
};


export const clearStoredProfile = async () => {
  try {
    
    const userId = await SecureStore.getItemAsync('userId');
    
    if (!userId) {
      console.error('User ID not found in SecureStore.');
      return;
    }
    await AsyncStorage.removeItem(`userGoal_${userId}`);  
    console.log('Goal cleared from AsyncStorage');
  } catch (error) {
    console.error('Error clearing goal from local storage:', error);
  }
};
