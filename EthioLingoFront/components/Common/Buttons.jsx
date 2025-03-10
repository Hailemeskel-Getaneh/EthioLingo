// /EthioLingoFront/components/Common/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

const Button = ({ title, onPress, style, textStyle }) => {
  return (
    <View>
    <TouchableOpacity
      style={[styles.button, globalStyles.primaryButton, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, globalStyles.primaryButtonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  </View>
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

export default Button;