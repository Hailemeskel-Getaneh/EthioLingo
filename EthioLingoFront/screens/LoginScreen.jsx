import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { InputContainer } from '../components/InputContainer';
import { CustomButton } from '../components/CustomButton';
import { AuthService } from '../services/authService';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await AuthService.login(email, password);
  };

  return (
    <View style={styles.box}>
      <InputContainer placeholder="Email" value={email} onChangeText={setEmail} />
      <InputContainer placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({ box: { flex: 1, padding: 20 } });
// Login screen enhancement update 1
// Login screen enhancement update 2
// Login screen enhancement update 3
// Login screen enhancement update 4
// Login screen enhancement update 5
// Login screen enhancement update 6
// Login screen enhancement update 7
