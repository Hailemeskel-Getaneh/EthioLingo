// /EthioLingoFront/screens/Lesson/SpeakingScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, globalStyles } from '../../styles/globalStyles';

const speakingExercises = [
  {
    id: 1,
    motherTongueText: 'የት ነህ? (Where are you?)',
    learningText: 'Where are you?',
    audioSource: require('../../assets/audio/Record034.mp3'),
  },
  {
    id: 2,
    motherTongueText: 'ሰላም አደርኩት (I greeted you)',
    learningText: 'I greeted you',
    audioSource: require('../../assets/audio/Record033.mp3'),
  },
  {
    id: 3,
    motherTongueText: 'መጽሐፍ አንብብ (Let’s read a book)',
    learningText: 'Let’s read a book',
    audioSource: require('../../assets/audio/Record034.mp3'),
  },
];

const SpeakingScreen = React.memo(({ topic }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [answerStatuses, setAnswerStatuses] = useState({});

  const currentExercise = speakingExercises[currentExerciseIndex];

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    return recording
      ? () => {
          recording.stopAndUnloadAsync().catch((err) => console.log('Unload error:', err));
        }
      : undefined;
  }, [recording]);

  const loadAndPlayAudio = useCallback(async () => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        currentExercise.audioSource,
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', 'Failed to play audio.');
    }
  }, [sound, currentExercise]);

  const startRecording = useCallback(async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording. Check permissions.');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        await AsyncStorage.setItem(`speaking_recording_${currentExercise.id}`, uri);
        setRecordingUri(uri);
        setIsRecording(false);
        setRecording(null);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to stop recording.');
    }
  }, [recording, currentExercise.id]);

  const checkRecording = useCallback(async () => {
    try {
      if (!recordingUri) {
        Alert.alert('Error', 'Please record your speech first!');
        return;
      }
      const originalStatus = await sound.getStatusAsync();
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({ uri: recordingUri });
      const recordedStatus = await recordedSound.getStatusAsync();
      const durationDiff = Math.abs(
        (originalStatus.durationMillis || 0) - (recordedStatus.durationMillis || 0)
      );
      const isMatch = durationDiff < 1000; // Match if within 1 second
      setAnswerStatuses((prev) => ({
        ...prev,
        [currentExerciseIndex]: isMatch ? 'correct' : 'incorrect',
      }));
      Alert.alert(
        isMatch ? 'Correct!' : 'Wrong!',
        isMatch ? 'Great job!' : 'The pronunciation did not match.',
        [
          { text: 'OK', onPress: () => {} },
        ]
      );
      await recordedSound.unloadAsync();
      // Delete the recording from AsyncStorage after comparison
      await AsyncStorage.removeItem(`speaking_recording_${currentExercise.id}`);
      setRecordingUri(null);
    } catch (error) {
      console.error('Error checking recording:', error);
      Alert.alert('Error', 'Failed to compare recordings.');
    }
  }, [recordingUri, sound, currentExerciseIndex]);

  const retryRecording = useCallback(async () => {
    if (recordingUri) {
      await AsyncStorage.removeItem(`speaking_recording_${currentExercise.id}`);
      setRecordingUri(null);
    }
    setIsRecording(false);
    setRecording(null);
  }, [recordingUri, currentExercise.id]);

  const handleNext = useCallback(() => {
    if (currentExerciseIndex < speakingExercises.length - 1) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsPlaying(false);
      setIsRecording(false);
      setRecordingUri(null);
      AsyncStorage.removeItem(`speaking_recording_${currentExercise.id}`);
    }
  }, [currentExerciseIndex, answerStatuses, currentExercise.id]);

  const handleBack = useCallback(() => {
    if (currentExerciseIndex > 0) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setIsPlaying(false);
      setIsRecording(false);
      setRecordingUri(null);
      AsyncStorage.removeItem(`speaking_recording_${currentExercise.id}`);
    }
  }, [currentExerciseIndex, answerStatuses, currentExercise.id]);

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Speaking Exercise</Text>

      {/* Progress Indicator */}
      <View className="flex-row justify-center mb-6">
        {Array.from({ length: 10 }, (_, i) => {
          const status = answerStatuses[i];
          let bgColor = 'bg-listBarBackground';
          if (i === currentExerciseIndex) {
            bgColor = 'bg-accent2';
          } else if (status === 'correct') {
            bgColor = 'bg-primaryBackground';
          } else if (status === 'incorrect') {
            bgColor = 'bg-accent4';
          }
          return (
            <View
              key={i}
              className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center ${bgColor}`}
            >
              <Text
                className={`text-base ${
                  i === currentExerciseIndex || status === 'correct' || status === 'incorrect'
                    ? 'text-primaryText'
                    : 'text-screenText'
                }`}
              >
                {i + 1}
              </Text>
            </View>
          );
        })}
      </View>

      <Text className="text-screenText text-base text-center mb-4">
        Speak the phrase in the learning language.
      </Text>

      {/* Mother Tongue Text */}
      <View className="bg-accent3 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      {/* Learning Language Text with Play Button */}
      <View className="bg-accent5 p-6 rounded-xl shadow-lg mb-6">
        <View className="flex-row items-center">
          <Text className="text-screenText text-lg mr-2">{currentExercise.learningText}</Text>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-accent1"
            onPress={loadAndPlayAudio}
            disabled={isPlaying || !sound}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'volume-high'}
              size={20}
              color="#313574"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Record Button */}
      <TouchableOpacity
        className={`items-center justify-center w-16 h-16 rounded-full ${
          isRecording ? 'bg-red-300' : 'bg-white'
        } border-2 border-accent1 self-center mb-6`}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? 'stop' : 'mic'}
          size={30}
          color="#313574"
        />
        <Text className="text-screenText text-center text-xs mt-1">Hold to speak</Text>
      </TouchableOpacity>

      {/* Retry and Check Buttons */}
      <View className="flex-row justify-center mb-6">
        {recordingUri && (
          <TouchableOpacity
            className="bg-accent2 py-3 px-6 rounded-lg mr-4"
            onPress={retryRecording}
          >
            <Text className="text-primaryText text-base font-bold">Retry</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-primaryBackground py-3 px-10 rounded-lg"
          onPress={checkRecording}
        >
          <Text className="text-primaryText text-base font-bold">Check</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Controls */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity
          className={`p-3 rounded-full ${
            currentExerciseIndex === 0 ? 'bg-gray-300' : 'bg-accent2'
          }`}
          onPress={handleBack}
          disabled={currentExerciseIndex === 0}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={currentExerciseIndex === 0 ? '#9ca3af' : '#f0f2f5'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className={`p-3 rounded-full ${
            currentExerciseIndex === speakingExercises.length - 1
              ? 'bg-gray-300'
              : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === speakingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={
              currentExerciseIndex === speakingExercises.length - 1
                ? '#9ca3af'
                : '#f0f2f5'
            }
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

export default SpeakingScreen;