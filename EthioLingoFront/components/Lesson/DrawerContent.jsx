// /EthioLingoFront/components/DrawerContent.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';
import { DrawerContentScrollView } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  return (
    <View className="flex-1" style={{ backgroundColor: colors.screenBackground }}>
      <DrawerContentScrollView>
        {/* Header Section */}
        <View className="p-4 border-b" style={{ borderBottomColor: '#e0e0e0' }}>
          <Text className="font-bold" style={{ color: colors.screenText, fontSize: 18 }}>Menu</Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('WordsHistoryScreen');
          }}
        >
          <Ionicons name="time" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Words History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('FAQScreen');
          }}
        >
          <Ionicons name="help-circle" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('FavoriteWordsScreen');
          }}
        >
          <Ionicons name="heart" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Favorite Words</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('ShareScreen');
          }}
        >
          <Ionicons name="share-social" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Share App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('RateAppScreen');
          }}
        >
          <Ionicons name="star" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Rate App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('PrivacyPolicyScreen');
          }}
        >
          <Ionicons name="lock-closed" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('SendFeedbackScreen');
          }}
        >
          <Ionicons name="chatbox" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Send Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4"
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}
        >
          <Ionicons name="log-out" size={24} color={colors.lightBlue} />
          <Text className="ml-3" style={{ color: colors.screenText, fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}