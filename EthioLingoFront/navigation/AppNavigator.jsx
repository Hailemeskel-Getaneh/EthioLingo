// /EthioLingoFront/navigation/AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../styles/globalStyles';
import LanguageSelectionScreen from '../screens/Profile/LanguageSelectionScreen';
import SetGoalScreen from '../screens/Profile/SetGoalScreen';

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
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
        <Stack.Screen name="SetGoalScreen" component={SetGoalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;