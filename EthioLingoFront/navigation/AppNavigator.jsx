import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/globalStyles';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import GetStartedScreen from '../screens/Onboarding/GetStartedScreen';
import LanguageSelectionScreen from '../screens/Profile/LanguageSelectionScreen.jsx';
import SetGoalScreen from '../screens/Profile/SetGoalScreen.jsx';
import LessonScreen from '../screens/LessonScreen/LessonScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

const HomeScreen = () => <></>;
const ProgressScreen = () => <></>;
const SettingsScreen = () => <></>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for main app screens
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primaryBackground, // #313574
        },
        tabBarActiveTintColor: colors.primaryText, // #f0f2f5
        tabBarInactiveTintColor: '#a0a0a0',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lessons" component={LessonScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator for the app
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryBackground, // #313574
          },
          headerTintColor: colors.primaryText, // #f0f2f5
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SetGoalScreen" component={SetGoalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="LessonScreen" component={LessonScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
