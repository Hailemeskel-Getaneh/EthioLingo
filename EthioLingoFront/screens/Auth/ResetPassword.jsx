import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/globalStyles'
import Button from "../../components/Common/Buttons";
const ResetPassword = () => {
  const navigation = useNavigation();
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error,setError]= useState("false");

 const handleResetPassword = () =>{
      navigation.navigate('Complate')  
 }

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={() => navigation.goBack('Verfication')}>
        <View className="flex-row items-center mt-6">
          <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
          <Text className="text-xl font-bold text-primaryBackground ml-2">Back</Text>
        </View>
      </TouchableOpacity>

      <View className="w-full max-w-sm mt-40">
        <Text className="text-2xl font-bold text-primaryBackground text-center">Reset Password</Text>
        <Text className="text-screenText1 mt-2 text-center">Please enter the new password</Text>
      </View>

      <View>
        <Text className="text-1xl font-bold text-primaryBackground mt-5">New Password</Text>
        <View className="relative">
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg text-lg mt-5"
            placeholder="Enter your new password"
            value={Password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -12 }],
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#313574"
            />
          </TouchableOpacity>
        </View>

        <Text className="text-1xl font-bold text-primaryBackground mt-5">Confirm Password</Text>
        <View className="relative">
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-lg text-lg mt-5"
            placeholder="Confirm Password"
            value={ConfirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isConfirmPasswordVisible} 
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: [{ translateY: -12 }],
            }}
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <Ionicons
              name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#313574"
            />
          </TouchableOpacity>
        </View>
      </View>
       <View className="mt-5 w-full" >
         <Button
          title="Sumbit"
          onPress={handleResetPassword}/>
       </View>
      
    </View>
  );
};

export default ResetPassword;
