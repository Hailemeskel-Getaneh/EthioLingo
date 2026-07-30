import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`[Storage] Error setting item ${key}`, e);
  }
};

export const getStorageItem = async (key, defaultValue = null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (e) {
    console.error(`[Storage] Error reading item ${key}`, e);
    return defaultValue;
  }
};

export const removeStorageItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`[Storage] Error removing item ${key}`, e);
  }
};
