import React, { useState } from 'react';
import {
  TextInput, TouchableOpacity, View, Text, StyleSheet, Image,
} from 'react-native';
import { colors } from '../../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Common/Buttons';
import { Signup } from '../../utils/requests/api';
import {validateSignUp} from '../../utils/validators'


export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');


const handleSignUp = async () => {
  const validationErrors = validateSignUp({ fullName, email, password,agreeToTerms });

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setBackendError('');

  try {
    const response = await Signup(fullName, email, password );

    if (response.status === 409) {
      // email already exists
      setBackendError('Email address already in use.');
      setErrors({ email: 'Email address already in use.' });
      return;
    }

    await navigation.navigate('LoginScreen');
  } catch (error) {
    setBackendError(error.message || 'Signup failed');
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create your own account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Full name</Text>
        <TextInput
          style={[
            styles.input,
            errors.fullName && { borderColor: 'red' },
          ]}
          placeholder="Enter your name and surname"
          value={fullName}
           onChangeText={(text) => {
            setFullName(text);
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: null }));
          }}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={[
            styles.input,
            errors.email && { borderColor: 'red' },
          ]}
          placeholder="example345@gmail.com"
          value={email}
           onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
          }}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
  <TextInput
    style={[
      styles.input,
      errors.password && { borderColor: 'red' },
    ]}
    placeholder="Password"
    value={password}
     onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
          }}
    secureTextEntry={!isPasswordVisible}
  />
  <TouchableOpacity
    style={styles.eyeIcon}
    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
  >
    <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#313574" />
  </TouchableOpacity>
</View>
{errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
{backendError ? <Text style={styles.errorText}>{backendError}</Text> : null}

        <View style={styles.termsWrapper}>
  <View style={styles.termsContainer}>
    <TouchableOpacity
      style={[
        styles.checkbox,
        errors.agreeToTerms && styles.inputError,
      ]}
      onPress={() => {
        setAgreeToTerms(!agreeToTerms);
        if (errors.agreeToTerms) {
          setErrors((prev) => ({ ...prev, agreeToTerms: null }));
        }
      }}
    >
      {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
    <Text style={styles.termsText}>Agree with </Text>
    <TouchableOpacity onPress={() => navigation.navigate('privacyPolicyScreen')}>
      <Text style={styles.termsLink}>Terms and Policy</Text>
    </TouchableOpacity>
  </View>
  {errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}
</View>

        <Button
          title="SignUp"
          onPress={handleSignUp}
        />

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
    paddingLeft:20,
    paddingRight:20

  },
  header: {
    marginBottom: 0,
    alignItems: 'center',
    marginTop: 70,

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
    padding: 10,
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
  color: colors.error,
  marginBottom: 10,
  fontSize: 14,
},
termsWrapper: {
  marginBottom: 20,
},

inputError: {
  borderColor: 'red',
},


});
