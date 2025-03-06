import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const GetButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button1} onPress={onPress} >
      <Text style={styles.text1}>Get Started</Text>
    </TouchableOpacity>
  );
};

export const GetButton2 = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button2} onPress={onPress} >
      <Text style={styles.text}>I already have an account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button1: {
    padding: 15,
    backgroundColor: '#313574',
    marginBottom: 20,
    borderRadius: 20,
    width: 350,
    alignItems: 'center',
  },
  button2: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#313574',
    width: 350,
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#313574',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default { GetButton, GetButton2 };