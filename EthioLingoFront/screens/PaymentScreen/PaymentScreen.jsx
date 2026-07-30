// PaymentScreen.tsx or .jsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native';
import { Linking } from 'react-native';
import { useState } from 'react';

const PaymentScreen = () => {
  const [email, setEmail] = useState('');
  const price = 150; // for example
  const product = "1-Month Language Pro Access";

  const handleCheckout = async () => {
    const txRef = `tx-${Date.now()}`;

    try {
      const res = await fetch('http://your-backend-url/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: price,
          currency: 'ETB',
          email: email,
          first_name: 'User',
          last_name: 'Name',
          tx_ref: txRef,
          return_url: 'https://yourapp.com/payment-success',
        }),
      });

      const data = await res.json();

      if (data.status === 'success') {
        Linking.openURL(data.data.checkout_url); // opens chapa page
      } else {
        Alert.alert('Error', 'Payment init failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold text-center text-primaryBackground">Buy Access</Text>

      <Text className="text-lg text-gray-700 mb-2">{product}</Text>
      <Text className="text-xl font-semibold text-homebackground mb-4">ETB {price}</Text>

      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        onPress={handleCheckout}
        className="bg-blue-600 py-4 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">Checkout with Chapa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
