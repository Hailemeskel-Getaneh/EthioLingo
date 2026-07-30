import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Common/Buttons';
import { colors } from '../../styles/globalStyles';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { updateProfileLocally } from '../../database/actions';
import * as SecureStore from 'expo-secure-store';

function EditProfileScreen() {
  const navigation = useNavigation();
  const { userProfile, setUserProfile } = useUserProfile(); // Assume setUserProfile is provided by context
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || '');
      setEmail(userProfile.email || '');
      setGoal(userProfile.goalTime ? String(userProfile.goalTime) : '');
      setProfileImage(userProfile.profileImage || null);
    }
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need permission to access your camera and gallery.');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const deleteProfileImage = () => {
    Alert.alert(
      'Delete Profile Image',
      'Are you sure you want to delete your profile image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setProfileImage(null);
            Alert.alert('Success', 'Profile image deleted successfully');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const saveProfile = async () => {
    if (!userProfile?.userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    const updatedData = {
      fullName,
      goalTime: Number(goal) || 0,
      profileImage,
    };

    try {
      const userId = await SecureStore.getItemAsync('userId');
      await updateProfileLocally(userId, updatedData, (freshData) => {
        // Update context with fresh data
        setUserProfile(freshData);
      });

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'There was an issue saving your profile.');
    }
  };

  if (!userProfile) {
    return (
      <View className="flex-1 justify-center items-center bg-primaryText text-homeBackground">
        <Text>Loading profile...</Text>
      </View>
    );
  }

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
        <TouchableOpacity onPress={deleteProfileImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/SampleProfileImage.png')}
            className="w-24 h-24 rounded-full border-2 border-primaryBackground"
          />
        </TouchableOpacity>
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
        <Text className="text-screenText1">Full Name</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2"
          placeholder="Enter full name"
        />
      </View>

      <View className="mt-4">
        <Text className="text-screenText1">Email</Text>
        <TextInput
          value={email}
          editable={false}
          className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2 bg-gray-300"
          placeholder="Email (Cannot be edited)"
        />
        <Text className="text-red-500 mt-2">You cannot edit your email</Text>
      </View>

      <View className="mt-4">
        <Text className="text-screenText1">Daily Goal (minutes)</Text>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          keyboardType="numeric"
          className="border-b-2 border-primaryBackground rounded-lg p-3 mt-2"
          placeholder="Enter daily goal"
        />
      </View>

      <View className="mt-4">
        <Button
          onPress={saveProfile}
          className="w-40 p-3 bg-primaryBackground rounded-lg"
          title="Save Changes"
        />
      </View>

      {showSuccessMessage && (
        <View className="mt-4 items-center">
          <Text className="text-homeBackground text-lg">Your profile has been successfully updated!</Text>
        </View>
      )}
    </View>
  );
}

export default EditProfileScreen;