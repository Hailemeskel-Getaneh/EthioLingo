import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { Spacing } from '../styles/spacing';

export const CardContainer = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.borderRadius.md,
    padding: Spacing.md,
    marginVertical: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});
