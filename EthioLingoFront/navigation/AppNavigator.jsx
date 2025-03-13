// /EthioLingoFront/AppNavigator.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/globalStyles';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import GreetingScreen from '../screens/Onboarding/GreetingScreen';
import LanguageSelectionScreen from '../screens/Profile/LanguageSelectionScreen';
import SetGoalScreen from '../screens/Profile/SetGoalScreen';
import LessonScreen from '../screens/Lesson/LessonScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import TopicScreen from '../screens/Lesson/TopicScreen';
import DrawerContent from '../components/Lesson/DrawerContent';
import ListeningScreen from '../screens/Lesson/ListeningScreen';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import Verfication from '../screens/Auth/Verfication';
import ResetPassword from '../screens/Auth/ResetPassword';
import Complate from '../screens/Auth/Complate';
import UserProfileScreen from '../screens/Profile/UserProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ExcellentScreen from '../screens/Success/ExcellentScreen.jsx';
import TryAgainScreen from '../screens/Success/TryAgainScreen.jsx'
import LevelCompletScreen from '../screens/Success/LevelCompletScreen.jsx';
import SettingsScreen from '../screens/Profile/SettingsScreen.jsx';

// Placeholder screens
const ProgressScreen = () => <View><Text>Progress Screen</Text></View>;
const TranslationScreen = () => <View><Text>Translation Screen</Text></View>;
const WordsHistoryScreen = () => <View><Text>Words History Screen</Text></View>;
const FAQScreen = () => <View><Text>FAQ Screen</Text></View>;
const FavoriteWordsScreen = () => <View><Text>Favorite Words Screen</Text></View>;
const ShareScreen = () => <View><Text>Share Screen</Text></View>;
const RateAppScreen = () => <View><Text>Rate App Screen</Text></View>;
const PrivacyPolicyScreen = () => <View><Text>PrivacyPolicy Screen</Text></View>;
const SendFeedbackScreen = () => <View><Text>Send Feedback Screen</Text></View>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LessonDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: '60%', backgroundColor: colors.screenBackground },
      }}
    >
      <Drawer.Screen name="LessonScreen" component={LessonScreen} />
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

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SettingsScreen">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GreetingScreen" component={GreetingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SetGoalScreen" component={SetGoalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LessonScreen" component={LessonDrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Verfication" component={Verfication} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Complate" component={Complate} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListeningScreen" component={ListeningScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TopicScreen" component={TopicScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExcellentScreen" component={ExcellentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TryAgainScreen" component={TryAgainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelCompletScreen" component={LevelCompletScreen} options={{ headerShown: false }} />      
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;