// /EthioLingoFront/components/Common/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, globalStyles.primaryButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, globalStyles.primaryButtonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Button;