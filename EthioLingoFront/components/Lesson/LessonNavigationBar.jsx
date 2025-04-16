// /EthioLingoFront/components/Lesson/LessonNavigationBar.jsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';

export default function LessonNavigationBar({ navigation }) {
  return (
    <View className="flex-row justify-around items-center py-4 bg-primaryBackground w-11/12 mx-auto rounded-2xl shadow-lg shadow-gray-700 mb-4">
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Ionicons name="home" size={26} color={colors.primaryText} /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LessonScreen')}>
        <Ionicons name="book" size={26} color={colors.primaryText} /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProgressScreen')}>
        <Ionicons name="trending-up" size={26} color={colors.primaryText} /> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
        <Ionicons name="settings" size={26} color={colors.primaryText} /> 
      </TouchableOpacity>
    </View>
  );
}
