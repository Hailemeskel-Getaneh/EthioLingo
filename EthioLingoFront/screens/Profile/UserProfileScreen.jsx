import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, View, Image, TouchableOpacity,} from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/globalStyles';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';
import { UserProfileContext  } from '../../contexts/UserProfileContext';


function UserProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, loading } = useContext(UserProfileContext);

  const user = {
    progress: 60, 
  };

  if (loading || !userProfile) {
    return (
      <View className="flex-1 justify-center items-center bg-primaryText text-homeBackground">
        <Text>Loading profile...</Text>
      </View>
    );
  }

  const {
    username, learningLanguage, profileImage, records, points,
  } = userProfile;

  if (!userProfile) {
    return (
      <View className="flex-1 justify-center items-center bg-primaryText text-homeBackground">
        <Text>Loading profile...</Text>
      </View>
    );
  }


  return (
    <View className="flex-1 bg-primaryText">
      <View className="p-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-primaryBackground text-center">Profile</Text>
          <View className="flex-row space-x-10">
            <Ionicons name="notifications" size={24} color={colors.primaryBackground} />
            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
              <Ionicons name="settings" size={24} color={colors.primaryBackground} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="justify-center items-center w-full p-4 bg-homeBackground rounded-lg mt-5 relative">
          <View className="relative">
            <Image
              source={{ uri: profileImage }}
              className="w-24 h-24 rounded-full border-2 border-primaryBackground"
            />
            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} className="absolute bottom-0 right-0 bg-primaryBackground p-1 rounded-full border border-gray-300">
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-primaryText mt-2 text-center">{username}</Text>
          <Text className="text-primaryText mt-2 text-center">{learningLanguage}</Text>
        </View>

        <View className="mt-6 w-full p-4 border-2 border-primaryBackground rounded-lg">
          <Text className="text-lg font-bold text-primaryBackground">Learning Progress</Text>
          <View className="flex flex-row items-center space-x-8 mt-2">
            <View className="w-80 h-2 bg-gray-300 rounded-md overflow-hidden">
              <View className="h-full bg-primaryBackground" style={{ width: `${user.progress}%` }} />
            </View>
            <Progress.Circle
              size={45}
              progress={user.progress / 100}
              showsText
              progressColor={{ color: '#313574' }}
              unfilledColor="#e0e0e0"
              borderWidth={0}
              thickness={3}
              textStyle={{ fontSize: 14, color: '#313574' }}
              formatText={() => `${user.progress}%`}
            />
          </View>
          <Text className="text-screenText1 mt-2">
            You completed
            {records}
            {' '}
            Lessons.
          </Text>
        </View>

        <Text className="text-lg font-bold mt-5 text-primaryBackground">Achievements</Text>
        <View className="mt-6 bg-homeBackground rounded-lg p-6">
          <View className="mt-2 flex flex-row justify-between">
            <Text className="text-primaryText font-bold">Records</Text>
            <View className="flex flex-row items-center space-x-2">
              <Ionicons name="trophy" size={16} color="gold" />
              <Text className="text-primaryText">{records}</Text>
            </View>
          </View>
          <View className="w-full h-[1px] bg-primaryText my-2" />
          <View className="mt-2 flex flex-row justify-between">
            <Text className="text-primaryText font-bold">Points</Text>
            <View className="flex flex-row items-center space-x-2">
              <Ionicons name="heart" size={16} color="red" />
              <Text className="text-primaryText">{points}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="pt-6 mt-40">
        <LessonNavigationBar navigation={navigation} />
      </View>
    </View>
  );
}

export default UserProfileScreen;
