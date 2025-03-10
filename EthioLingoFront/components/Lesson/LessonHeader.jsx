// /EthioLingoFront/components/Lesson/LessonHeader.jsx
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';
import SampleProfileImage from '../../assets/images/SampleProfileImage.png';
import LessonSearchBar from './LessonSearchBar';
import { DrawerActions } from '@react-navigation/native';

export default function LessonHeader({ navigation }) {
  return (
    <View className="bg-primaryBackground  rounded-b-3xl">
      <View className="flex-row items-center px-4 pt-8 pb-2">
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
          <Image
            source={SampleProfileImage}
            className="w-10 h-10 rounded-full mr-3"
          />
        </TouchableOpacity>
        <Text className="text-primaryText text-xl font-bold ml-16">Lessons</Text>
      </View>

      <View className="flex-row items-center px-4 pb-4">

        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          className="mr-4"
        >
          <Ionicons name="menu" size={28} color={colors.primaryText} />
        </TouchableOpacity>

        <LessonSearchBar />

      </View>


    </View>
  );
}