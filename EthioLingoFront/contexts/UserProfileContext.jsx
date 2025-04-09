import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getUserProfile, updateUserProfile } from '../utils/requests/api'; 

export const UserProfileContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) {
        Alert.alert('Error', 'User ID not found');
        return;
      }
      const profileData = await getUserProfile();  
      setUserProfile(profileData);  
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'There was an issue fetching your profile.');
    } finally {
      setLoading(false);
    }
  };

  // Function to update the user profile
  const updateUserProfileData = async (updatedProfile) => {
    try {
      const success = await updateUserProfile(updatedProfile); 
      if (success) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          ...updatedProfile, 
        }));
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'There was an issue updating your profile.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        fetchUserProfile,
        updateUserProfileData, 
        loading,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
