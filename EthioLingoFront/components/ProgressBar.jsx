import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const ProgressBar = ({ progress = 0 }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 10,
    backgroundColor: Colors.border,
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
});
