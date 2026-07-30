import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/globalStyles';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { NotificationContext } from '../../contexts/NotificationContext';

function UserProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, loading } = useUserProfile(); 
  const { unreadNotifications } = useContext(NotificationContext);
  const hasUnread = unreadNotifications.length > 0;
 
  if (loading) {
    return <Text>Loading...</Text>; // Display loading message while data is fetched
  }

  if (!userProfile) {
    return <Text>No user profile data found</Text>; // Handle no data case
  }
  const user = {
    progress: 60,
    records:0,
    points:0
  };



  const {   fullName, learningLanguage, profileImage, notifications = [] } = userProfile;


  return (
    <View className="flex-1 bg-primaryText ">
      <View className="p-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-primaryBackground text-center">Profile</Text>
          <View className="flex-row space-x-10">
            <TouchableOpacity onPress={() => navigation.navigate('NotficationScreen')}>
              <View className="relative">
                <Ionicons name="notifications" size={24} color={colors.primaryBackground} />
                {hasUnread && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {unreadNotifications.length}
                  </Text>
                </View>
              )}

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
              <Ionicons name="settings" size={24} color={colors.primaryBackground} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="justify-center items-center w-full p-4 bg-homeBackground rounded-lg mt-5 relative">
          <View className="relative">
          <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/SampleProfileImage.png')}
          className="w-24 h-24 rounded-full border-2 border-primaryBackground"
        />

            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')} className="absolute bottom-0 right-0 bg-primaryBackground p-1 rounded-full border border-gray-300">
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-primaryText mt-2 text-center">{fullName}</Text>
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
            You completed {user.records} Lessons.
          </Text>
        </View>

        <Text className="text-lg font-bold mt-5 text-primaryBackground">Achievements</Text>
        <View className="mt-6 bg-homeBackground rounded-lg p-6">
          <View className="mt-2 flex flex-row justify-between">
            <Text className="text-primaryText font-bold">Records</Text>
            <View className="flex flex-row items-center space-x-2">
              <Ionicons name="trophy" size={16} color="gold" />
              <Text className="text-primaryText">{user.records}</Text>
            </View>
          </View>
          <View className="w-full h-[1px] bg-primaryText my-2" />
          <View className="mt-2 flex flex-row justify-between">
            <Text className="text-primaryText font-bold">Points</Text>
            <View className="flex flex-row items-center space-x-2">
              <Ionicons name="heart" size={16} color="red" />
              <Text className="text-primaryText">{user.points}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="pt-1 mt-60">
        <LessonNavigationBar navigation={navigation} />
      </View>
    </View>
  );
}

export default UserProfileScreen;
