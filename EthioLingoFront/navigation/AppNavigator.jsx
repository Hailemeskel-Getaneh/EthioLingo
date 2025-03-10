// /EthioLingoFront/AppNavigator.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../styles/globalStyles';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import GreetingScreen from '../screens/Onboarding/GreetingScreen.jsx'
import LanguageSelectionScreen from '../screens/Profile/LanguageSelectionScreen';
import SetGoalScreen from '../screens/Profile/SetGoalScreen';
import LessonScreen from '../screens/Lesson/LessonScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/Home/HomeScreen'; // Merged Home/HomeScreen.jsx
import TopicScreen from '../screens/Lesson/TopicScreen';
import ListeningScreen from '../screens/Lesson/ListeningScreen';
import DrawerContent from '../components/Lesson/DrawerContent';
import ForgotPassword from '../screens/Auth/ForgotPassword.jsx'
import Verfication from '../screens/Auth/Verfication.jsx'
import ResetPassword from '../screens/Auth/ResetPassword.jsx';
import Complate from '../screens/Auth/Complate.jsx'
import UserProfileScreen from '../screens/Profile/UserProfileScreen.jsx';
import EditProfileScreen from '../screens/Profile/EditProfileScreen.jsx';


// Placeholder screens
const ProgressScreen = () => <View><Text>Progress Screen</Text></View>;
const SettingsScreen = () => <View><Text>Settings Screen</Text></View>;
const ProfileScreen = () => <View><Text>Profile Screen</Text></View>;
const TranslationScreen = () => <View><Text>Translation Screen</Text></View>;
const WordsHistoryScreen = () => <View><Text>Words History Screen</Text></View>;
const FAQScreen = () => <View><Text>FAQ Screen</Text></View>;
const FavoriteWordsScreen = () => <View><Text>Favorite Words Screen</Text></View>;
const ShareScreen = () => <View><Text>Share Screen</Text></View>;
const RateAppScreen = () => <View><Text>Rate App Screen</Text></View>;
const PrivacyPolicyScreen = () => <View><Text>Privacy Policy Screen</Text></View>;
const SendFeedbackScreen = () => <View><Text>Send Feedback Screen</Text></View>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator;

// Drawer Navigator for Lesson-related screens
function LessonDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { 
          width: '60%', 
          backgroundColor: colors.screenBackground 
        },
      }}
    >
      <Drawer.Screen name="LessonScreen" component={LessonScreen} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="TranslationScreen" component={TranslationScreen} />
      <Drawer.Screen name="WordsHistoryScreen" component={WordsHistoryScreen} />
      <Drawer.Screen name="FAQScreen" component={FAQScreen} />
      <Drawer.Screen name="FavoriteWordsScreen" component={FavoriteWordsScreen} />
      <Drawer.Screen name="ShareScreen" component={ShareScreen} />
      <Drawer.Screen name="RateAppScreen" component={RateAppScreen} />
      <Drawer.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="SendFeedbackScreen" component={SendFeedbackScreen} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="SignupScreen" component={SignupScreen} />
    </Drawer.Navigator>
  );
}

// Main Stack Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStartedScreen">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GreetingScreen" component={GreetingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SetGoalScreen" component={SetGoalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LessonScreen" component={LessonDrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Verfication" component={Verfication} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Complate" component={Complate} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;