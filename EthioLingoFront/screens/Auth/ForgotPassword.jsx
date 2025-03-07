import React, { useState } from "react";
import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ResetButton } from "../../components/Buttons/onbordingButtons";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const  [error,setError]= useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); 
  };

  const handlePasswordReset = () => {
    if (!email || !isValidEmail(email)) {
      setError(true); 
      return;
    }
    
    setError(false); 
     // impliment password reset logic this
    console.log("Password reset verfication sent to:", email);

    navigation.navigate("Verfication");
  };

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <View className="flex-row items-center mt-6">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text className="text-xl font-bold text-[#313574] ml-2">Back</Text>
        </View>
      </TouchableOpacity>

      <View className="w-full max-w-sm mt-40">
        <Text className="text-2xl font-bold text-[#313574] text-center">
          Forgot your Password?
        </Text>
        <Text className="text-gray-600 mt-2 text-center">
          Please enter your email to reset your password
        </Text>
      </View>

      <View className="w-full mt-6">
        <TextInput
          className={`w-full p-4 border rounded-lg text-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(false); 
          }}
          keyboardType="email-address"
        />
        {error && <Text className="text-red-500 mt-1">Invalid email address</Text>}
      </View>

      <View className="mt-20 w-full">
        <ResetButton onPress={handlePasswordReset} />
      </View>

      <View className="mt-0 flex flex-row justify-center items-center">
        <Text className="text-gray-600">Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text className="text-[#313574] font-semibold ml-1">Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
