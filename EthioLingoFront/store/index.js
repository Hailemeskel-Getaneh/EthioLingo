// /EthioLingoFront/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Import redux-thunk
import authReducer from './authSlice';
import lessonReducer from './lessonSlice';
import paymentReducer from './paymentSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonReducer,
    payment: paymentReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
});