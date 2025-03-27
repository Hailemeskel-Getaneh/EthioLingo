import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/globalStyles';

export default function LessonNavigationBar({ navigation }) {
  return (
    <View className="flex-row justify-around py-2 bg-primaryBackground">
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} className="items-center">
        <Ionicons name="home" size={24} color={colors.primaryText} />
        <Text className="text-primaryText text-xs">Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LessonScreen')} className="items-center">
        <Ionicons name="book" size={24} color={colors.primaryText} />
        <Text className="text-primaryText text-xs">Lesson</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ProgressScreen')} className="items-center">
        <Ionicons name="trending-up" size={24} color={colors.primaryText} />
        <Text className="text-primaryText text-xs">Progress</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')} className="items-center">
        <Ionicons name="person" size={24} color={colors.primaryText} />
        <Text className="text-primaryText text-xs">Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
