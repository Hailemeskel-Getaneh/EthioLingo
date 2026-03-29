import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const InputContainer = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.box}>
      <TextInput
        style={styles.text}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: { borderBottomWidth: 1, paddingVertical: 8 },
  text: { fontSize: 16 }
});
// Input layout style variation 1
// Input layout style variation 2
