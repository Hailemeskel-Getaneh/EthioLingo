import React from 'react';
import { Image, View, Text } from 'react-native';
import {Done} from '../../components/Buttons/onbordingButtons'

const Complate = () => {
  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <View className="w-48 h-48">
        <Image
          source={require('../../assets/images/complate.png')}
          className="w-full h-full object-contain"
          resizeMode="contain"
        />
      </View>

      <Text className="text-2xl font-bold text-[#313574] mt-6 text-center">
        Password Reset Complete
      </Text>
      <Text className="text-gray-600 text-center mt-2 px-4">
        Good job! Your password has been reset successfully. You are all set to log in with your new password.
      </Text>
      <View  className="mt-48 w-full">
        <Done/>
      </View>
    </View>

  );
};

export default Complate;
