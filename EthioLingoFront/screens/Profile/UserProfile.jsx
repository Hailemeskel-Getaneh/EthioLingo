import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';

const UserProfile = () => {
    const navigation= useNavigation();
    const progress = 30; // 30% progress
  

    return (
        <View className="flex-1 bg-white">
            <View className="p-6">
                <View className="mt-10 flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-[#313574] text-center">Profile</Text>
                    <View className="flex-row space-x-10">
                        <Ionicons name="notifications" size={24} color="#313574" />
                        <Ionicons name="settings" size={24} color="#313574" />
                    </View>
                </View>

                <View className="justify-center items-center w-full p-4 bg-gray-200 rounded-lg mt-5 relative">
                    <View className="relative">
                        <Image
                            source={require('../../assets/images/SampleProfileImage.png')}
                            className="w-24 h-24 rounded-full border-2 border-[#313574]"
                        />
                        <TouchableOpacity 
                        onPress={()=> navigation.navigate('EditProfile')}
                        className="absolute bottom-0 right-0 bg-[#313574] p-1 rounded-full border border-gray-300">
                            <Ionicons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-gray-600 mt-2 text-center">username</Text>
                    <Text className="text-gray-600 mt-2 text-center">Language</Text>
                </View>

                <View className="mt-6 w-full p-4 border-2 border-[#313574] rounded-lg">
                    <Text className="text-lg font-bold text-[#313574]">Learning Progress</Text>
                    <View className="flex flex-row items-center space-x-8 mt-2">
                        <View className="w-80 h-2 bg-gray-300 rounded-md overflow-hidden">
                            <View className="h-full bg-[#313574]" style={{ width: `${progress}%` }} />
                        </View>
                        <Progress.Circle
                            size={45}
                            progress={progress / 100}
                            showsText={true}
                            progressColor={{color:"#313574"}}
                            unfilledColor="#e0e0e0"
                            borderWidth={0}
                            thickness={3}
                            textStyle={{ fontSize: 14, color: "#313574" }}
                            formatText={() => `${progress}%`} 
                        />
                    </View>
                    <Text className="text-gray-600 mt-2">You completed 3 Chapters.</Text>
                </View>

                <Text className="text-lg font-bold mt-5 text-[#313574]">Achievements</Text>
                <View className="mt-6 bg-gray-200 rounded-lg p-6">
                    <View className="mt-2 flex flex-row justify-between">
                        <Text className="text-gray-600 font-bold">Records</Text>
                        <Ionicons name="heart" size={16} color="red" />
                    </View>
                    <View className="w-full h-[1px] bg-[#313574] my-2" />
                    <View className="mt-2 flex flex-row justify-between">
                        <Text className="text-gray-600 font-bold">Points</Text>
                        <Ionicons name="heart" size={16} color="red" />
                    </View>
                </View>
            </View>
            <View className=" pt-8 mt-40">
                <LessonNavigationBar />
            </View>
        </View>
    );
};

export default UserProfile;
