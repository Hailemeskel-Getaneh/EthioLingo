import React, { createContext, useContext, useEffect, useState } from 'react';
import {getUserDataFromSQLite} from '../database/actions'

const UserProfileContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserDataFromSQLite(); 
        setUserProfile(data); 
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
      setLoading(false); 
    };

    fetchUserProfile(); 
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, loading }}>
      {children} 
    </UserProfileContext.Provider>
  );
};


export const useUserProfile = () => useContext(UserProfileContext);