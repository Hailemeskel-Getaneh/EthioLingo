import AsyncStorage from '@react-native-async-storage/async-storage';

const LESSONS_KEY = 'lessons';

export const saveLessons = async (lessons) => {
  try {
    await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
    console.log('Lessons saved to local storage:', lessons);
  } catch (error) {
    console.error('Error saving lessons to local storage:', error.message);
  }
};

export const getLessonsFromStorage = async () => {
  try {
    const lessons = await AsyncStorage.getItem(LESSONS_KEY);
    return lessons ? JSON.parse(lessons) : [];
  } catch (error) {
    console.error('Error retrieving lessons from local storage:', error.message);
    return [];
  }
};

export const clearLessons = async () => {
  try {
    await AsyncStorage.removeItem(LESSONS_KEY);
    console.log('Lessons cleared from local storage');
  } catch (error) {
    console.error('Error clearing lessons from local storage:', error.message);
  }
};