import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar'; 
import {colors} from '../../styles/globalStyles'

const UserProfileScreen = () => {
    const navigation = useNavigation();
    const progress = 30; // 30% progress

    return (
        <View className="flex-1 bg-white">
            {/* Main Content */}
            <View className="p-6 md:p-8 lg:p-10">
                {/* Header Section */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg md:text-xl lg:text-2xl font-bold text-primaryBackground text-center">
                        Profile
                    </Text>
                    <View className="flex-row space-x-10 md:space-x-12 lg:space-x-14">
                        <Ionicons name="notifications" size={24} md={{size: 28}} lg={{size: 32}} color={colors.primaryBackground} />
                        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                            <Ionicons name="settings" size={24} md={{size: 28}} lg={{size: 32}} color={colors.primaryBackground} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Image Section */}
                <View className="justify-center items-center w-full p-4 md:p-6 lg:p-8 bg-homeBackground rounded-lg mt-5 md:mt-6 lg:mt-8 relative">
                    <View className="relative">
                        <Image
                            source={require('../../assets/images/SampleProfileImage.png')}
                            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-primaryBackground"
                        />
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('EditProfileScreen')}
                            className="absolute bottom-0 right-0 bg-primaryBackground p-1 md:p-1.5 lg:p-2 rounded-full border border-gray-300"
                        >
                            <Ionicons name="pencil" size={16} md={{size: 18}} lg={{size: 20}} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-primaryText mt-2 md:mt-3 lg:mt-4 text-center text-base md:text-lg lg:text-xl">
                        username
                    </Text>
                    <Text className="text-primaryText mt-2 md:mt-3 lg:mt-4 text-center text-sm md:text-base lg:text-lg">
                        Language
                    </Text>
                </View>

                {/* Progress Section */}
                <View className="mt-6 md:mt-8 lg:mt-10 w-full p-4 md:p-6 lg:p-8 border-2 border-primaryBackground rounded-lg">
                    <Text className="text-lg md:text-xl lg:text-2xl font-bold text-primaryBackground">
                        Learning Progress
                    </Text>
                    <View className="flex flex-row items-center space-x-8 md:space-x-10 lg:space-x-12 mt-2 md:mt-3 lg:mt-4">
                        <View className="w-80 md:w-96 lg:w-[28rem] h-2 bg-gray-300 rounded-md overflow-hidden">
                            <View className="h-full bg-primaryBackground" style={{ width: `${progress}%` }} />
                        </View>
                        <Progress.Circle
                            size={45}
                            md={{size: 50}}
                            lg={{size: 55}}
                            progress={progress / 100}
                            showsText={true}
                            progressColor={{color: "#313574"}}
                            unfilledColor="#e0e0e0"
                            borderWidth={0}
                            thickness={3}
                            textStyle={{ fontSize: 14, md: {fontSize: 16}, lg: {fontSize: 18}, color: "#313574" }}
                            formatText={() => `${progress}%`}
                        />
                    </View>
                    <Text className="text-screenText1 mt-2 md:mt-3 lg:mt-4 text-sm md:text-base lg:text-lg">
                        You completed 3 Chapters.
                    </Text>
                </View>

                {/* Achievements Section */}
                <Text className="text-lg md:text-xl lg:text-2xl font-bold mt-5 md:mt-6 lg:mt-8 text-primaryBackground">
                    Achievements
                </Text>
                <View className="mt-6 md:mt-8 lg:mt-10 bg-homeBackground rounded-lg p-6 md:p-8 lg:p-10">
                    <View className="mt-2 md:mt-3 lg:mt-4 flex flex-row justify-between">
                        <Text className="text-primaryText font-bold text-base md:text-lg lg:text-xl">
                            Records
                        </Text>
                        <Ionicons name="heart" size={16} md={{size: 18}} lg={{size: 20}} color="red" />
                    </View>
                    <View className="w-full h-[1px] bg-primaryText my-2 md:my-3 lg:my-4" />
                    <View className="mt-2 md:mt-3 lg:mt-4 flex flex-row justify-between">
                        <Text className="text-primaryText font-bold text-base md:text-lg lg:text-xl">
                            Points
                        </Text>
                        <Ionicons name="heart" size={16} md={{size: 18}} lg={{size: 20}} color="red" />
                    </View>
                </View>
            </View>

            {/* Navigation Bar */}
            <View className="pt-8 md:pt-10 lg:pt-12 mt-40 md:mt-48 lg:mt-56">
                <LessonNavigationBar navigation={navigation} />
            </View>
        </View>
    );
};

export default UserProfileScreen;