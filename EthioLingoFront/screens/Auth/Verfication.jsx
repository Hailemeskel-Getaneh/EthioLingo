import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { VerifyButton } from "../../components/Buttons/onbordingButtons";

const Verfication = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '', '']); // State for the 5 input boxes

  // Function to handle the change in each input box
  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View className="flex-row items-center mt-6">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text className="text-xl font-bold text-[#313574] ml-2">Back</Text>
        </View>
      </TouchableOpacity>

      <View className="w-full max-w-sm mt-40">
        <Text className="text-2xl font-bold text-[#313574] text-center">
          Verfication code
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Enter the verification code sent on your email 
        </Text>
      </View>

    
      <View className="mt-10 flex flex-row justify-center space-x-2">
        {code.map((value, index) => (
          <TextInput
            key={index}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            maxLength={1}
            style={{
              width: 50,
              height: 50,
              marginLeft:3,
              textAlign: "center",
              fontSize: 24,
              borderWidth: 2,
              borderColor: "#313574",
              borderRadius: 8,
            }}
            keyboardType="numeric" 
          />
        ))}
      </View>

      <View className="mt-20 w-full">
        <VerifyButton onPress={() => navigation.navigate('ResetPassword')} />
      </View>

      <View className="mt-0 flex flex-row justify-center items-center">
        <Text className="text-gray-600">Didn't receive your code?</Text>
        <TouchableOpacity >
          <Text className="text-[#313574] font-semibold ml-1">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verfication;
