
// /EthioLingoFront/store/settingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    offlineMode: false, 
    notificationsEnabled: true, // Toggle notifications
    selectedLanguage: null, 
  },
  reducers: {
    toggleOfflineMode: (state) => {
      state.offlineMode = !state.offlineMode;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload; // Set target language
    },
  },
});

export const { toggleOfflineMode, toggleNotifications, setSelectedLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;