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
export const ResetButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button1} onPress={onPress} >
      <Text style={styles.text1}>Send</Text>
    </TouchableOpacity>
  );
};

export const VerifyButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button1} onPress={onPress} >
      <Text style={styles.text1}>Verify</Text>
    </TouchableOpacity>
  );
};
export const ResetButton2 = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button1} onPress={onPress} >
      <Text style={styles.text1}>Submit</Text>
    </TouchableOpacity>
  );
};
export const Done = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button1} onPress={onPress} >
      <Text style={styles.text1}>Done</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button1: {
    padding: 15,
    backgroundColor: '#313574',
    marginBottom: 20,
    borderRadius: 8,
    
  },
  button2: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#313574',
   
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