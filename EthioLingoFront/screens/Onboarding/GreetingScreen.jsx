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
        <View className="w-48 h-48">
            <Image source={require('../../assets/images/greetingImage.png')}
         className="w-full h-full object-contain"
          resizeMode="contain"
        />
        </View>
        
        <Text className="text-2xl font-bold text-primaryBackground mt-6 text-center">welcome to EthioLingo</Text>
        <Text>lets set up your ethiopian language lerning journey</Text>
        <Button
         title="continue"
         onPress={handleContinue}
        />
    </View>
    )
    
}

export default GreetingScreen;