import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getUserDataFromSQLite } from '../database/actions';

const UserProfileContext = createContext();

export function UserProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userId');
        if (userId) {
          const profileData = await getUserDataFromSQLite(userId);
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}