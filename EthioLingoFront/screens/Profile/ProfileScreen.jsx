import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';
import SampleProfileImage from '../../assets/images/SampleProfileImage.png';
import LessonHeader from '../../components/Lesson/LessonHeader';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-screenBackground">

      <LessonHeader navigation={navigation} />

      <ScrollView className="flex-1 px-4 py-4">

        <View className="items-center mb-6">
          <Image
            source={SampleProfileImage}
            className="w-24 h-24 rounded-full mb-3"
          />
          <Text className="text-primaryText text-xl font-bold">John Doe</Text>
          <Text className="text-listBarText text-base">john.doe@example.com</Text>
        </View>

        {/* Profile Options */}
        <View className="bg-primaryBackground rounded-lg p-4 mb-4">

          <TouchableOpacity
            className="flex-row items-center justify-between py-3 border-b border-gray-600"
            onPress={() => navigation.navigate('LanguageSelectionScreen')}
          >
            <View className="flex-row items-center">
              <Ionicons name="language" size={24} color={colors.primaryText} />
              <Text className="text-primaryText text-base ml-3">Language Selection</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primaryText} />
          </TouchableOpacity>

          {/* Goal Settings */}

          <TouchableOpacity
            className="flex-row items-center justify-between py-3 border-b border-gray-600"
            onPress={() => navigation.navigate('SetGoalScreen')}
          >
            <View className="flex-row items-center">
              <Ionicons name="target" size={24} color={colors.primaryText} />
              <Text className="text-primaryText text-base ml-3">Set Goals</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primaryText} />
          </TouchableOpacity>


          <TouchableOpacity
            className="flex-row items-center justify-between py-3"
            onPress={() => alert('Edit Profile functionality coming soon!')}
          >
            <View className="flex-row items-center">
              <Ionicons name="pencil" size={24} color={colors.primaryText} />
              <Text className="text-primaryText text-base ml-3">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}

        <TouchableOpacity
          className="bg-red-600 rounded-lg p-3 items-center"
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text className="text-white text-base font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}