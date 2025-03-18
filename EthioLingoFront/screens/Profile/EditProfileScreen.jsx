import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/globalStyles';
import Button from '../../components/Common/Buttons';

const EditProfileScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('username');
    const [email, setEmail] = useState('user@example.com');
    const [Goal, setGoal] = useState('15min');
    const [profileImage, setProfileImage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('We need permission to access your camera and gallery.');
            }
        })();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

  
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };


    const saveProfile = () => {
        Alert.alert(
            'Are you sure?',
            'Do you want to save your changes?',
            [
                {
                    text: 'Discard',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Logic to save changes (e.g., API call or local storage update)
                        setShowSuccessMessage(true);

                        setTimeout(() => {
                            setShowSuccessMessage(false);
                        }, 1000);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex-1 bg-white p-6">
            <View className="flex-row justify-between items-center mt-10">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color={colors.primaryBackground} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-primaryBackground">Edit Profile</Text>
                <View style={{ width: 28 }} />
            </View>

            <View className="items-center mt-6">
                <Image
                    source={profileImage ? { uri: profileImage } : require('../../assets/images/SampleProfileImage.png')}
                    className="w-24 h-24 rounded-full border-2 border-primaryBackground"
                />
            </View>

            <View className="mt-4 flex-row justify-center space-x-4 gap-3">
                <TouchableOpacity onPress={takePhoto} className="p-3 bg-primaryBackground rounded-lg w-40">
                    <Text className="text-white text-center">Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} className="p-3 bg-homeBackground rounded-lg w-40">
                    <Text className="text-white text-center">Upload from File</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-6">
                <Text className="text-screenText1">Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2"
                    placeholder="Enter new username"
                />
            </View>

            <View className="mt-4">
                <Text className="text-screenText1">Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2"
                    placeholder="Enter new email"
                />
            </View>
            <View className="mt-4">
                <Text className="text-screenText1">DailyGoal</Text>
                <TextInput
                    value={Goal}
                    onChangeText={setGoal}
                    keyboardType="email-address"
                    className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2"
                    placeholder="Enter new email"
                />
            </View>

            <View className="mt-4">
            <Button 
                onPress={saveProfile} 
                className="w-40 p-3 bg-primaryBackground rounded-lg"
                title="SaveChanges"/>
                
            </View>

            {showSuccessMessage && (
                <View className="mt-4 items-center">
                    <Text className="text-homeBackground text-lg">Your profile has been successfully updated!</Text>
                </View>
            )}
        </View>
    );
};

export default EditProfileScreen;