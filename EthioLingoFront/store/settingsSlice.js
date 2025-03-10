// /EthioLingoFront/store/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    offlineMode: false, // Toggle offline mode
    notificationsEnabled: true, // Toggle notifications
    selectedLanguage: null, // Language to learn (e.g., { name: 'Oromo', flag: '🇪🇹', id: '2' })
  },
  reducers: {
    toggleOfflineMode: (state) => {
      state.offlineMode = !state.offlineMode;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload; // Set target language (e.g., { name: 'Oromo', flag: '🇪🇹', id: '2' })
    },
  },
});

export const { toggleOfflineMode, toggleNotifications, setSelectedLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;