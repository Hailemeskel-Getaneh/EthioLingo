import React from "react";
import { View,Image,Text } from "react-native";
import {colors} from '../../styles/globalStyles'
import Button from "../../components/Common/Buttons";
import { useNavigation } from "@react-navigation/native";

const GreetingScreen =()=>{
    const navigation=useNavigation();

    const handleContinue = () =>{
        navigation.navigate('LanguageSelectionScreen')  
   }
    return(
    <View className="flex-1 bg-white items-center justify-center p-6">
        <View className="W-50 h-50 bg-primaryBackground ">
        <View className="w-96 h-96">
            <Image source={require('../../assets/images/greetingImage.png')}
         className="w-full h-full object-contain"
          resizeMode="contain"
        />
        </View>
        </View >
        <View className="absolute bottom-12 w-full items-center">
        <Text className="text-2xl font-bold text-primaryBackground mt-6 text-center">Welcome To EthioLingo</Text>
        <Text>lets set up your ethiopian language lerning journey</Text>
        <View className="w-full">
         <Button
         title="Continue"
         onPress={handleContinue}
        />
        </View>
        </View>
    </View>
    )
    
}

export default GreetingScreen;