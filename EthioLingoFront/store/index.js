// /EthioLingoFront/store/index.js
import { configureStore } from '@reduxjs/toolkit';
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
});