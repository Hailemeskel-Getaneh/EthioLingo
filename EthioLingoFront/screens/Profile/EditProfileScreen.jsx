import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/globalStyles'

const EditProfileScreen = () => {
    const navigation = useNavigation();
    
    const [username, setUsername] = useState('username');
    const [email, setEmail] = useState('user@example.com');
    const [profileImage, setProfileImage] = useState(null);

    // Request permissions to access camera and gallery
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('We need permission to access your camera and gallery.');
            }
        })();
    }, []);

    // Pick an image from gallery
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

    // Take a photo using the camera
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

    // Save profile changes
    const saveProfile = () => {
        // Logic to save changes (e.g., API call or local storage update)
        navigation.goBack();
    };

    // Discard changes and return to previous screen
    const discardChanges = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-white p-6">
            <View className="flex-row justify-between items-center mt-10">
                <TouchableOpacity onPress={discardChanges}>
                    <Ionicons name="close" size={28} color={colors.primaryBackground} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-primaryBackground">Edit Profile</Text>
                <View style={{ width: 28 }} /> {/* Empty View to balance layout */}
            </View>
            <View className="items-center mt-6">
                <Image
                    source={profileImage ? { uri: profileImage } : require('../../assets/images/SampleProfileImage.png')}
                    className="w-24 h-24 rounded-full border-2 border-primaryBackground"
                />
            </View>
            <View className="mt-4 flex-row justify-center space-x-4">
                <TouchableOpacity onPress={takePhoto} className="p-3 bg-primaryBackground rounded-lg w-40">
                    <Text className="text-white text-center">Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickImage} className="p-3 bg-screenText1 rounded-lg w-40">
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

            <View className="mt-6 flex-row justify-between">
                <TouchableOpacity onPress={discardChanges} className="w-40 p-3 border-2 border-primaryBackground rounded-lg">
                    <Text className="text-primaryBackground text-center">Discard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveProfile} className="w-40 p-3 bg-primaryBackground rounded-lg">
                    <Text className="text-white text-center">Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileScreen;
