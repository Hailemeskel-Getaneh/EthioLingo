
// /EthioLingoFront/store/paymentSlice.js

import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    subscriptionStatus: 'inactive', 
    transactions: [],
    error: null,
  },
  reducers: {
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload; // update subscription status
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload); // adding new transaction
    },
    setPaymentError: (state, action) => {
      state.error = action.payload; // set the error message on payment failure
    },
  },
});

export const { setSubscriptionStatus, addTransaction, setPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer;