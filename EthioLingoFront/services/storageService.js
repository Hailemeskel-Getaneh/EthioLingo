import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storageUtils';

const KEYS = {
  USER_TOKEN: '@user_token',
  USER_SETTINGS: '@user_settings',
  DAILY_STREAK: '@daily_streak',
};

export const StorageService = {
  saveToken: (token) => setStorageItem(KEYS.USER_TOKEN, token),
  getToken: () => getStorageItem(KEYS.USER_TOKEN),
  removeToken: () => removeStorageItem(KEYS.USER_TOKEN),

  saveSettings: (settings) => setStorageItem(KEYS.USER_SETTINGS, settings),
  getSettings: () => getStorageItem(KEYS.USER_SETTINGS, { darkMode: false, soundEnabled: true }),

  saveStreak: (streak) => setStorageItem(KEYS.DAILY_STREAK, streak),
  getStreak: () => getStorageItem(KEYS.DAILY_STREAK, 0),
};
