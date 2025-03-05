
// /EthioLingoFront/store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, 
    isAuthenticated: false,
    token: null, 
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update user data (e.g., progress)
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;