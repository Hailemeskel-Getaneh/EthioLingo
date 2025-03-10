// /EthioLingoFront/components/Lesson/LessonNavigationBar.jsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles'; 

export default function LessonNavigationBar({ navigation }) {
  return (
    <View className="flex-row justify-around py-3 bg-primaryBackground">
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Ionicons name="home" size={24} color={colors.primaryText} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LessonScreen')}>
        <Ionicons name="book" size={24} color={colors.primaryText} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProgressScreen')}>
        <Ionicons name="trending-up" size={24} color={colors.primaryText} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
        <Ionicons name="settings" size={24} color={colors.primaryText} />
      </TouchableOpacity>
    </View>
  );
}