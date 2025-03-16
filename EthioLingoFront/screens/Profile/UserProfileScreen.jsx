import React, { useState,useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Image,StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar'; 
import {colors} from '../../styles/globalStyles'
import axios from 'axios';
import { API_URL } from '@env';

const UserProfileScreen  = () => {
    const navigation= useNavigation();
    const [profile,setProfile]=useState('');

    const fetchProfileData= async( )=>{
        try{
          const response= await axios.get('http:${API_URL}/api/profile',);
           setProfile(response.data);
        }
        catch(err){
            console.log('Error fetching profile data:', err);
        }
    }
    useEffect(() => {
        fetchProfileData();
      }, []);
    const progress = 30; // 30% progress

    if (!profile) {
        return (
          <View className="flex-1 justify-center items-center">
            <Text className="text-homeBackground">No profile data available!</Text>
          </View>
        );
      }

    return (
        <View className="flex-1 bg-white">       
            <View className="p-6">
                <View className=" flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-primaryBackground text-center">Profile</Text>
                    <View className="flex-row space-x-10">
                        <Ionicons name="notifications" size={24} color={colors.primaryBackground} />
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('SettingsScreen')}>
                        <Ionicons name="settings" size={24} color={colors.primaryBackground} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="justify-center items-center w-full p-4 bg-homeBackground rounded-lg mt-5 relative">
                    <View className="relative">
                        <Image
                            source={require('../../assets/images/SampleProfileImage.png')}
                            className="w-24 h-24 rounded-full border-2 border-primaryBackground"
                        />
                        <TouchableOpacity 
                        onPress={()=> navigation.navigate('EditProfileScreen')}
                        className="absolute bottom-0 right-0 bg-primaryBackground p-1 rounded-full border border-gray-300">
                            <Ionicons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-primaryText mt-2 text-center">{username}</Text>
                    <Text className="text-primaryText mt-2 text-center">{Language}</Text>
                </View>
                <View className="mt-6 w-full p-4 border-2 border-primaryBackground rounded-lg">
                    <Text className="text-lg font-bold text-primaryBackground ">Learning Progress</Text>
                    <View className="flex flex-row items-center space-x-8 mt-2">
                        <View className="w-80 h-2 bg-gray-300 rounded-md overflow-hidden">
                            <View className="h-full bg-primaryBackground" style={{ width: `${progress}%` }} />
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
                    <Text className="text-screenText1 mt-2">You completed 3 Chapters.</Text>
                </View>
                <Text className="text-lg font-bold mt-5 text-primaryBackground">Achievements</Text>
                <View className="mt-6 bg-homeBackground rounded-lg p-6">
                    <View className="mt-2 flex flex-row justify-between">
                        <Text className="text-primaryText font-bold">Records</Text>
                        <Ionicons name="heart" size={16} color="red" />
                    </View>
                    <View className="w-full h-[1px] bg-primaryText my-2" />
                    <View className="mt-2 flex flex-row justify-between">
                        <Text className="text-primaryText font-bold">Points</Text>
                        <Ionicons name="heart" size={16} color="red" />
                    </View>
                </View>
            </View>
            <View className=" pt-8 mt-40">
               <LessonNavigationBar navigation={navigation} />
            </View>
        </View>
    );
};

export default UserProfileScreen ;
