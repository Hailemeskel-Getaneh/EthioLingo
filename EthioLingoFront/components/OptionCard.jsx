import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const OptionCard = ({ text, isSelected, isCorrect, isWrong, onPress }) => {
  const getBackgroundColor = () => {
    if (isCorrect) return '#D1FAE5';
    if (isWrong) return '#FEE2E2';
    if (isSelected) return '#E0E7FF';
    return Colors.surface;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginVertical: 6,
  },
  text: { fontSize: 16, color: Colors.textPrimary },
});
