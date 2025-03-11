import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View,Text ,Image} from "react-native";
import Button from "../../components/Common/Buttons";
import Button2 from "../../components/Common/onbordingButtons";

const LevelCompletScreen =({ route,navigation  })=>{
    


    const {lessonNextTopic="family",Language="Amharic",lessonTopic="Greeting" }= route.params || {}
    return(
       
               <View className="flex-1 bg-white  p-6">
                   <View className="bg-primaryBackground w-full py-3 flex-row justify-between px-4 items-center rounded-lg mt-12">
                       <Text className="text-white font-bold text-lg">Level 1</Text>
                       <Text className="text-white">❤️ 5</Text>
                   </View>
                   
                 <View className="items-center justify-center p-8">
                    <Text className="text-homeBackground text-2xl font-bold mt-4">Congragulation!</Text>
                    <Text className="text-xl font-bold text-primaryBackground mt-4"> You Complated {lessonTopic}Successfully! </Text>
                    <Image
                       source={require('../../assets/images/complate.png')}
                       className="w-48 h-48 mt-6"
                       resizeMode="contain"
                    />
                    <Text className="text-l font-bold text-homeBackground mt-6">
                     You unlock the next topic.in that topic you will learn {lessonNextTopic} in {Language}</Text>
                    <View  className="mt-10 w-full ">
                    <Button 
                    title="NextTopic"
                    onPress={() =>navigation.navigate={lessonNextTopic}}
                    />
                    <Button2 
                    title="Menu"
                    onPress={() => navigation.navigate('LessonScreen')}
                    />
                   </View>
        </View>
        </View>
    )
}

export default LevelCompletScreen;