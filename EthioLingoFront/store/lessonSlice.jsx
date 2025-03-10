// /EthioLingoFront/store/lessonSlice.js

import { createSlice } from '@reduxjs/toolkit';

const lessonSlice = createSlice({
  name: 'lessons',
  initialState: {
    lessons: [],
    currentLesson: null, 
    progress: {},
  },
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload; // Load lessons from API or static data
    },
    selectLesson: (state, action) => {
      state.currentLesson = action.payload; // Set current lesson by ID or object
    },
    updateProgress: (state, action) => {
      const { lessonId, completed, score } = action.payload;
      state.progress[lessonId] = { completed, score };
    },
  },
});

export const { setLessons, selectLesson, updateProgress } = lessonSlice.actions;
export default lessonSlice.reducer;