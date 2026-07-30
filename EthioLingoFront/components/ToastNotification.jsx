import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ToastNotification = ({ message, type = 'info' }) => {
  if (!message) return null;
  return (
    <View style={[styles.toast, type === 'error' ? styles.error : styles.info]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 8,
    zIndex: 999,
    alignItems: 'center',
  },
  info: { backgroundColor: '#3B82F6' },
  error: { backgroundColor: '#EF4444' },
  text: { color: '#FFF', fontWeight: 'bold' },
});
