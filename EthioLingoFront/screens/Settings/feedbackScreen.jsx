import React, { useState } from 'react';
import { TextInput, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Common/Buttons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/globalStyles';

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    Alert.alert("Message", "Your message was submitted successfully!");
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-100">
     <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="absolute top-10 left-9 z-10 mt-2"
      >
        <Ionicons name="close" size={28} color={colors.primaryBackground} />
      </TouchableOpacity>
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Text className="text-primaryBackground text-lg font-bold text-center">Contact Us</Text>
        <Text className="text-center text-gray-600 mt-2">
          Have questions? Reach out to us and we'll get back to you soon!
        </Text>
        
        <TextInput
          className="border-2 border-primaryBackground w-full mt-4 p-3 rounded-lg"
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border-2 border-primaryBackground w-full mt-4 p-3 rounded-lg"
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          className="border-2  border-primaryBackground w-full  h-40 mt-4 p-3 rounded-lg"
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          className="mt-4"
        />
          <View className="mt-6 flex-row justify-center space-x-4">
          <View className="flex-row items-center">
            <Ionicons name="call-outline" size={20} color={colors.homeBackground}/>
            <Text className="ml-2 text-primaryBackground">+123 456 7890</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={20} color={colors.homeBackground} />
            <Text className="ml-2 text-primaryBackground">EthioLingo@gmail.com</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedbackScreen;
