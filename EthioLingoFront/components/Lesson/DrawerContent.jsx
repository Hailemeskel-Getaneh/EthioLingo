// /EthioLingoFront/components/DrawerContent.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  return (
    <View className="flex-1 bg-primaryBackground">
      <DrawerContentScrollView>
        <View className="p-4 border-b border-gray-200">
          <Text className="text-primaryText text-lg font-bold">Menu</Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('TranslationScreen');
          }}
        >
          <Ionicons name="translate" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Translation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('WordsHistoryScreen');
          }}
        >
          <Ionicons name="time" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Words History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('FAQScreen');
          }}
        >
          <Ionicons name="help-circle" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('FavoriteWordsScreen');
          }}
        >
          <Ionicons name="heart" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Favorite Words</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('ShareScreen');
          }}
        >
          <Ionicons name="share-social" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Share App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('RateAppScreen');
          }}
        >
          <Ionicons name="star" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('PrivacyPolicyScreen');
          }}
        >
          <Ionicons name="lock-closed" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('SendFeedbackScreen');
          }}
        >
          <Ionicons name="chatbox" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Send Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}
        >
          <Ionicons name="log-out" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-3">Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}