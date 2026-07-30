import { getStorageItem, setStorageItem, removeStorageItem } from '../storageUtils';

export const setStorage = async (key, value) => {
  return setStorageItem(key, value);
};

export const getStorage = async (key, defaultValue = null) => {
  return getStorageItem(key, defaultValue);
};

export const removeStorage = async (key) => {
  return removeStorageItem(key);
};
