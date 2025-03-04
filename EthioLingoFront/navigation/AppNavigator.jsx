
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/globalStyles';

// Placeholder screens (we'll replace these with real screens later)

const WelcomeScreen = () => <></>;
const HomeScreen = () => <></>;
const LessonScreen = () => <></>;
const ProgressScreen = () => <></>;
const SettingsScreen = () => <></>;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.primaryBackground,
        },
        tabBarActiveTintColor: colors.primaryText,
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
            backgroundColor: colors.primaryBackground,
          },
          headerTintColor: colors.primaryText,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
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