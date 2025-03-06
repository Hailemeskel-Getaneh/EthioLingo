// /EthioLingoFront/navigation/AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/globalStyles';

// Placeholder screens (replace with real imports as you build them)

const WelcomeScreen = () => <></>;
const HomeScreen = () => <></>;
const LessonScreen = () => <></>;
const ProgressScreen = () => <></>;
const SettingsScreen = () => <></>;

const Stack = createStackNavigator();

// Stack Navigator for the app
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LanguageSelectionScreen"
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;