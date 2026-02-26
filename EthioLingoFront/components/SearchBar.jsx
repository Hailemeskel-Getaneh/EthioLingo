import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const SearchBar = ({ value, onChangeText, placeholder = 'Search lessons or words...' }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: { fontSize: 14, color: Colors.textPrimary },
});
