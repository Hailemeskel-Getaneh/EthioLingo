import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text, View, Image, TouchableOpacity, ScrollView, StatusBar,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { ProgressBar } from '../../components/Progress/ProgressBar';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';
import { colors } from '../../styles/globalStyles';
import { useUserProfile } from '../../contexts/UserProfileContext';

function ProgressCard({ title, percentage, icon }) {
  return (
    <View className="bg-white p-4 rounded-xl" style={styles.cardShadow}>
      <Image
        source={icon}
        style={{ width: 90, height: 80, marginBottom: 8 }}
        resizeMode="contain"
      />
      <Text className="text-gray-800 font-medium mb-1">{title}</Text>
      <View className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
        <ProgressBar percentage={percentage} color="#8257fe" />
      </View>
      <Text className="text-gray-600 text-sm">{percentage}%</Text>
    </View>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const { userProfile, loading } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.centered}>
        <Text>No profile data found.</Text>
      </View>
    );
  }

  const { fullName, profileImage, learningLanguage } = userProfile;

  return (
    <View className="flex-1 bg-f3f4ff">
      <StatusBar backgroundColor={colors.primaryBackground} />

      <View style={{ height: '20%', borderBottomRightRadius: 125 }} className="rounded-br-8xl p-6 pb-12 bg-primaryBackground">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={{ uri: profileImage }}
              className="w-12 h-12 rounded-full bg-white border-2 border-white"
            />
            <View className="ml-3">
              <Text className="text-white text-lg font-bold">Hello!</Text>
              <Text className="text-white">{fullName}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-white mr-2">points</Text>
            <Image
              source={require('../../assets/icons/heart.png')}
              className="w-6 h-6 mr-2"
            />
            <Image
              source={require('../../assets/icons/notification.png')}
              className="w-6 h-6 ml-2"
            />
          </View>
        </View>


        <View style={{ alignSelf: 'center' }} className="bg-white/20 mt-6 p-3 rounded-xl flex-row items-center">
          <Text className="text-primaryText text-base font-semibold">
             {learningLanguage}
          </Text>
        </View>
      </View>

      <View className="mx-4 mt-4 bg-homeBackground p-4 rounded-xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-primaryText text-sm font-sm mb-1">Let's start learning Amharic</Text>
            <Text className="text-primaryText text-lg mb-2 font-normal">Chapter 3</Text>
            <Text className="text-white/70 text-base">More essential phrases</Text>
            <View style={{ width: '90%' }} className="bg-white/70 rounded-full h-1.5 mb-1 mt-3" />
            <Text className="text-white/50 text-xs mt-1">Last practiced 3 days ago</Text>
            <TouchableOpacity className="bg-white/20 mt-3 py-2 px-4 rounded-lg self-start" onPress={() => navigation.navigate('LessonScreen')}>
              <Text className="text-primaryText">Continue</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/icons/reading-book.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="p-4">
          <Text className="text-lg font-bold text-primaryBackground">My Progress</Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <ProgressCard
                title="Reading"
                percentage={60}
                icon={require('../../assets/icons/reading-book.png')}
              />
            </View>
            <View style={styles.gridItem}>
              <ProgressCard
                title="Listening"
                percentage={90}
                icon={require('../../assets/icons/listening.png')}
              />
            </View>
            <View style={styles.gridItem}>
              <ProgressCard
                title="Speaking"
                percentage={20}
                icon={require('../../assets/icons/speaking.png')}
              />
            </View>
            <View style={styles.gridItem}>
              <ProgressCard
                title="Writing"
                percentage={40}
                icon={require('../../assets/icons/writing.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <LessonNavigationBar navigation={navigation} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  gridItem: {
    width: '50%',
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
