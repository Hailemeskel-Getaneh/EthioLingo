// /EthioLingoFront/components/Common/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

const Button2 = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
    style={[styles.button, globalStyles.secondaryButton, style]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, globalStyles.secondaryButtonText, textStyle]}>
      {title}
    </Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',   
  },
});

export default Button2;