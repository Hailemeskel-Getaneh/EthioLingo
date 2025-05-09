import React from 'react';
import {
  Text, View, Switch, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { useTheme } from '../../contexts/ThemeContext';
import FontSize from '../../components/Common/FontSize';
import DeleteAccount from '../Auth/DeleteAccount';

function SettingScreen() {
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <View
      className={`flex-1 p-6 ${
        isDarkMode ? 'dark:bg-dark-screenBackground' : 'bg-screenBackground'
      }`}
    >
      <View
        className={`flex-row items-center justify-between mt-4 ${
          isDarkMode ? 'dark:text-dark-primaryText' : 'text-primaryText'
        }`}
      >
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
          <View className="flex-row items-center">
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
            <Text className="text-xl font-bold ml-2">Back</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-xl font-bold">Settings</Text>
      </View>

      <View
        className={`flex-row justify-between items-center py-3 border-b ${
          isDarkMode ? 'dark:border-dark-primaryText' : 'border-primaryText'
        }`}
      >
        <Text className={`text-xl font-bold ${isDarkMode ? 'dark:text-dark-primaryText' : 'text-primaryText'}`}>
          Dark Mode
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <FontSize className={`text-xl ${isDarkMode ? 'dark:text-dark-primaryText' : 'text-primaryText'}`} />
      <DeleteAccount className={`text-xl ${isDarkMode ? 'dark:text-dark-primaryText' : 'text-primaryText'}`} />

      <View>
        <TouchableOpacity
          className="flex-row items-center justify-between mt-4"
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text className={`font-bold text-xl ${isDarkMode ? 'dark:text-dark-error' : 'text-error'}`}>
            Logout
          </Text>
          <Ionicons
            name="log-out"
            size={24}
            color={isDarkMode ? '#ff4f4f' : 'red'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SettingScreen;
