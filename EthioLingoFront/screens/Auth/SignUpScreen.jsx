import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Image } from 'react-native';

export default function SignUp({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('GreetingScreen')
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
          style={styles.input}
          placeholder="Enter your name and surname"
          value={fullName}
          onChangeText={setFullName}
        />
        
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="example345@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.eyeIcon}>
            {/* Add eye icon here */}
          </TouchableOpacity>
        </View>

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}>
            {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>Agree with </Text>
          <TouchableOpacity>
            <Text style={styles.termsLink}>Terms and Policy</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

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
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    marginTop: 80,
    marginBottom: 0,
    alignItems: 'center',
    marginTop:110,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
    marginTop:40,

  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
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
    borderColor: '#ddd',
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
    color: '#1a237e',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#313574',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
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
    backgroundColor: '#ddd',
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
    borderColor: '#ddd',
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
    color: '#1a237e',
    fontWeight: '600',
  },
});