import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView ,TouchableOpacity} from 'react-native';

import {colors } from '../../styles/globalStyles'

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <View className="flex-row justify-between items-center mt-6 text-primaryBackground">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color={colors.primaryBackground} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-primaryBackground">PrivacyPolicy</Text>
                <View style={{ width: 28 }} />
            </View>
      <Text className="text-lg font-semibold mt-3 text-primaryBackground">1. Introduction</Text>
      <Text className="text-screenText1">
        Welcome to our Language Learning App. Your privacy is important to us, and we are committed to protecting your personal data.
      </Text>

      <Text className="text-lg font-semibold mt-3 text-primaryBackground">2. Information We Collect</Text>
      <Text className="text-screenText1">
        - <Text className="font-semibold">Personal Information:</Text> We collect your name, email, and language preferences when you register.
        {"\n"}- <Text className="font-semibold">Usage Data:</Text> We track how you interact with the app to improve our services.
        {"\n"}- <Text className="font-semibold">Device Information:</Text> We may collect your device type, OS, and IP address for security purposes.
      </Text>

      <Text className="text-lg font-semibold mt-3 text-primaryBackground">3. How We Use Your Information</Text>
      <Text className="text-screenText1">
        - To provide and improve language learning experiences.
        {"\n"}- To personalize lessons based on progress.
        {"\n"}- To communicate updates, features, and promotions.
      </Text>

      <Text className="text-lg font-semibold mt-3 text-primaryBackground">4. Data Sharing & Security</Text>
      <Text className="text-screenText1">
        - We <Text className="font-semibold ">do not</Text> sell or rent your data.
        {"\n"}- We use encryption and security measures to protect your data.
        {"\n"}- We may share data with trusted partners to improve our services.
      </Text>

      <Text className="text-lg font-semibold mt-3 text-primaryBackground">5. Your Rights</Text>
      <Text className="text-screenText1">
        - You can update or delete your account anytime.
        {"\n"}- You can opt out of marketing emails.
        {"\n"}- You can request a copy of your personal data.
      </Text>

      <Text className="text-lg font-semibold mt-3 text-primaryBackground">6. Changes to This Policy</Text>
      <Text className="text-screenText1">
        We may update this Privacy Policy and notify you of any significant changes.
      </Text>

      <Text className="text-primaryBackground font-semibold mt-3">7. Contact Us</Text>
      <Text className="text-screenText1">
        If you have any questions, please contact us at EthioLingo@gmail.com.
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;
