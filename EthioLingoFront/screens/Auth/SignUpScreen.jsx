import React, { useState } from 'react';
import {
  TextInput, TouchableOpacity, View, Text, StyleSheet, Image,
} from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Common/Buttons';
import { Signup } from '../../utils/requests/api';

export default function SignUp({ navigation }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const handleSignUp = async () => {
    let valid = true;
  
    // Validate inputs before submitting
    if (!fullName) {
      setFullNameError('Full name is required');
      valid = false;
    } else {
      setFullNameError('');
    }
  
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }
  
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }
  
    if (!valid) return; 
  
    try {
      const response = await Signup(fullName, email, password);
      if (response && response.success) {
        navigation.navigate('LoginScreen');
      }
    }catch (error) {
      console.log("Error response:", error.response);  // Log the full error response
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
    
        // Check if the error is 'Email address already in use'
        if (errorMessage === 'Email address already in use.') {
          setEmailError('This email is already in use. Please choose another one.');
        } else {
          setEmailError('This email is already in use. Please choose another one.');
        }
      } else {
        setEmailError('This email is already in use. Please choose another one.');
      }
    }
  }

  const handleChangeEmail = (text) => {
    setEmail(text);
    setEmailError(''); 
  };

  const handleChangeFullName = (text) => {
    setFullName(text);
    setFullNameError(''); 
  };

  const handleChangePassword = (text) => {
    setPassword(text);
    setPasswordError(''); 
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your own account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Full name</Text>
        <TextInput
          style={[styles.input, fullNameError ? styles.errorInput : null]}
          placeholder="Enter your name and surname"
          value={fullName}
          onChangeText={handleChangeFullName}
        />
        {fullNameError && <Text style={styles.errorText}>{fullNameError}</Text>}

        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="example345@gmail.com"
          value={email}
          onChangeText={handleChangeEmail}
          keyboardType="email-address"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, passwordError ? styles.errorInput : null]}
            placeholder="Password"
            value={password}
            onChangeText={handleChangePassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -12 }],
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#313574"
            />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>Agree with </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('privacyPolicyScreen')}
          >
            <Text style={styles.termsLink}>Terms and Policy</Text>
          </TouchableOpacity>
        </View>
        <Button title="SignUp" onPress={handleSignUp} />

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign up with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/twitter.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 0,
    alignItems: 'center',
    marginTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primaryBackground,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    color: colors.screenText1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    color: colors.screenText1,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#1a237e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    color: '#666',
  },
  termsLink: {
    color: colors.primaryBackground,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    color: colors.screenText1,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    color: colors.screenText1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  socialIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
  },
  loginText: {
    color: colors.primaryBackground,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
