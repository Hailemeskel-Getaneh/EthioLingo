import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { VerifyButton } from "../../components/Buttons/onbordingButtons";

const Verfication = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState(["", "", "", "", ""]); // State for 5 input boxes
  const [error, setError] = useState(false); 

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setError(false); // Reset error when user types
  };

  const handleVerfication = () => {
    if (code.some((digit) => digit.trim() === "")) {
      setError(true);
      return;
    }

    setError(false);
    // Implement verification logic here
    navigation.navigate("ResetPassword");
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
          Verification Code
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Enter the verification code sent to your email
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
              textAlign: "center",
              fontSize: 24,
              borderWidth: 2,
              borderColor: error ? "red" : "#313574", 
              borderRadius: 8,
              marginLeft:3,
            }}
            keyboardType="numeric"
          />
        ))}
      </View>

      {error && (
        <Text className="text-red-500 mt-2 text-center">
          Please check your code.
        </Text>
      )}

      <View className="mt-20 w-full">
        <VerifyButton onPress={handleVerfication} />
      </View>

      <View className="mt-0 flex flex-row justify-center items-center">
        <Text className="text-gray-600">Didn't receive your code?</Text>
        <TouchableOpacity>
          <Text className="text-[#313574] font-semibold ml-1">Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verfication;
