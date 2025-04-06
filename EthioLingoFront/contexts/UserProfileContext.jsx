import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getUserProfile } from '../utils/requests/api';

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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, fetchUserProfile, loading }}>
      {children}
    </UserProfileContext.Provider>
  );
}
