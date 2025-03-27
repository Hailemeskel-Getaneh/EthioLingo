import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Image } from 'react-native';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { login } from '../../utils/requests/api';
import Button from '../../components/Common/Buttons';
import { colors } from '../../styles/globalStyles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // const GoogleLogin = async () => {
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn();
  //   return userInfo;
  // };

  // const handleGoogleLogin = async () => {
  //   console.log("handling google signin")
  //   try {
	// 		const response = await GoogleLogin();
	// 		const { idToken, user } = response;

	// 		if (idToken) {
	// 			const resp = await authAPI.validateToken({
	// 				token: idToken,
	// 				email: user.email,
	// 			});
	// 			await handlePostLoginData(resp.data);
	// 		}
	// 	} catch (apiError) {
  //     console.log(statusCodes)
  //     console.log(apiError.code)
	// 		setError(
	// 			apiError?.response?.data?.error?.message || 'Something went wrong'
	// 		);
	// 	} finally {
	// 		//setLoading(false);
	// 	}
  // }
  const handleLogin = async () => {

    try{
      const response = await login(email,password)
      await navigation.navigate('HomeScreen')
    } catch{
      console.log("login failed")
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
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

        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember me</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button
             onPress={handleLogin}
            title="Signin"
        />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or login with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={require('../../assets/icons/twitter.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleGoogleLogin}
            style={styles.socialButton}>
            <Image
              source={require('../../assets/icons/google.png')}
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../assets/icons/facebook.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>Sign up</Text>
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
    marginTop:90,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color:colors.primaryBackground
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    flex: 1,
    marginTop:60,

  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    color:colors.screenText1,
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
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    color:colors.screenText1,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color:colors.primaryBackground,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rememberText: {
    flex: 1,
    color: '#666',
  },
  forgotPassword: {
    color:colors.primaryBackground,
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
    color:colors.screenText1,
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
  signUpText: {
    color: '#1a237e',
    fontWeight: '600',
  },
});
