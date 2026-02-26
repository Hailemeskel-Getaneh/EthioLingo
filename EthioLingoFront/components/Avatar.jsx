import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const Avatar = ({ name = 'H', size = 40 }) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.45 }]}>{initial}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
