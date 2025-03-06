import { StyleSheet, Text, View, Image } from 'react-native';
import { GetButton, GetButton2 } from '../../components/Buttons/onbordingButtons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const GetStartedScreen = () => {
    const navigation =useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../../assets/images/e.jpg')} style={styles.image} />
        <Text style={styles.description}>Learn a new language, Dive into the world of possibilities in Ethiopia</Text>
      </View>
      <View style={styles.buttonContainer}>
        <GetButton  onPress={()=> navigation.navigate('LanguageSelectionScreen')}/>
        <GetButton2  onPress={()=> navigation.navigate('LoginScreen')}/>
      </View>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#313574',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 20,
  },
});