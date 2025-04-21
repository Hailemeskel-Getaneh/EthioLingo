import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const ReadingScreen = React.memo(() => {
  const route = useRoute();
  const data = route.params?.data || {};
  console.log('ReadingScreen data:', data); // Debug

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const readingExercises = data?.readingExercises || [];
  const currentExercise = readingExercises[currentExerciseIndex] || {
    motherTongueText: 'No exercise available',
    learningText: 'N/A',
  };

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    return sound ? () => sound.unloadAsync().catch(() => {}) : undefined;
  }, [sound]);

  useEffect(() => {
    return recording ? () => recording.stopAndUnloadAsync().catch(() => {}) : undefined;
  }, [recording]);

  const loadAndPlayAudio = useCallback(async () => {
    if (!currentExercise.audioSource) {
      setError('No audio source available');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentExercise.audioSource },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (error) {
      setError('Failed to play audio: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [sound, currentExercise]);

  const startRecording = useCallback(async () => {
    if (!hasPermission) {
      Alert.alert('Error', 'Recording permission not granted.');
      return;
    }
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording.');
    }
  }, [hasPermission]);

  const stopRecording = useCallback(async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        await AsyncStorage.setItem(`recording_${currentExerciseIndex}`, uri);
        setRecordingUri(uri);
        setIsRecording(false);
        setRecording(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording.');
    }
  }, [recording, currentExerciseIndex]);

  const checkRecording = useCallback(async () => {
    if (!recordingUri) {
      setFeedback('Please record your reading first!');
      return;
    }
    if (!sound) {
      setFeedback('Please play the original audio first!');
      return;
    }
    try {
      const originalStatus = await sound.getStatusAsync();
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({ uri: recordingUri });
      const recordedStatus = await recordedSound.getStatusAsync();
      const durationDiff = Math.abs(originalStatus.durationMillis - recordedStatus.durationMillis);
      const isMatch = durationDiff < 1000;
      setAnswerStatuses((prev) => ({
        ...prev,
        [currentExerciseIndex]: isMatch ? 'correct' : 'incorrect',
      }));
      setFeedback(
        isMatch
          ? 'Correct! Duration matches.'
          : `Wrong! Duration differs by ${Math.round(durationDiff / 1000)} seconds.`
      );
      await recordedSound.unloadAsync();
    } catch (error) {
      setFeedback('Error comparing recordings.');
    }
  }, [recordingUri, sound, currentExerciseIndex]);

  const handleNext = useCallback(async () => {
    if (currentExerciseIndex < readingExercises.length - 1) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({ ...prev, [currentExerciseIndex]: 'skipped' }));
      }
      if (sound) await sound.unloadAsync();
      if (recording) await recording.stopAndUnloadAsync();
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSound(null);
      setRecording(null);
      setIsPlaying(false);
      setIsRecording(false);
      setFeedback('');
      setRecordingUri(null);
      setError(null);
    }
  }, [currentExerciseIndex, answerStatuses, readingExercises.length, sound, recording]);

  const handleBack = useCallback(async () => {
    if (currentExerciseIndex > 0) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({ ...prev, [currentExerciseIndex]: 'skipped' }));
      }
      if (sound) await sound.unloadAsync();
      if (recording) await recording.stopAndUnloadAsync();
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSound(null);
      setRecording(null);
      setIsPlaying(false);
      setIsRecording(false);
      setFeedback('');
      setRecordingUri(null);
      setError(null);
    }
  }, [currentExerciseIndex, answerStatuses, sound, recording]);

  if (readingExercises.length === 0) {
    return (
      <View className="flex-1 p-6 justify-center">
        <Text className="text-screenText text-xl font-bold text-center">No reading content available</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 p-6 justify-center">
        <Text className="text-error text-xl font-bold text-center">Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Reading Exercise</Text>
      <View className="flex-row justify-center mb-6">
        {Array.from({ length: readingExercises.length }, (_, i) => (
          <View
            key={i}
            className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center ${
              i === currentExerciseIndex
                ? 'bg-accent2'
                : answerStatuses[i] === 'correct'
                ? 'bg-primaryBackground'
                : answerStatuses[i] === 'incorrect'
                ? 'bg-accent4'
                : 'bg-listBarBackground'
            }`}
          >
            <Text
              className={`text-base ${
                i === currentExerciseIndex || answerStatuses[i] ? 'text-primaryText' : 'text-screenText'
              }`}
            >
              {i + 1}
            </Text>
          </View>
        ))}
      </View>
      <Text className="text-screenText text-base text-center mb-4">Read the phrase and record your voice.</Text>
      <View className="bg-accent6 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText2 text-lg">{currentExercise.motherTongueText}</Text>
      </View>
      <View className="bg-accent7 p-6 rounded-xl shadow-lg mb-6">
        <View className="flex-row items-center">
          <Text className="text-screenText2 text-lg mr-2">{currentExercise.learningText}</Text>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-accent1"
            onPress={loadAndPlayAudio}
            disabled={isPlaying || isLoading || !currentExercise.audioSource}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#313574" />
            ) : !currentExercise.audioSource ? (
              <Text className="text-screenText text-xs">No Audio</Text>
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={20} color="#313574" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        className={`items-center justify-center w-24 h-16 rounded-full ${
          isRecording ? 'bg-red-300' : 'bg-white'
        } border-2 border-accent1 self-center mb-6`}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={!hasPermission}
      >
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={30} color="#313574" />
        <Text className="text-screenText text-center text-xs mt-1">Hold to record</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-6"
        onPress={checkRecording}
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity
          className={`p-3 rounded-full ${currentExerciseIndex === 0 ? 'bg-gray-300' : 'bg-accent2'}`}
          onPress={handleBack}
          disabled={currentExerciseIndex === 0}
        >
          <Ionicons name="arrow-back" size={24} color={currentExerciseIndex === 0 ? '#9ca3af' : '#f0f2f5'} />
        </TouchableOpacity>
        <TouchableOpacity
          className={`p-3 rounded-full ${
            currentExerciseIndex === readingExercises.length - 1 ? 'bg-gray-300' : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === readingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={currentExerciseIndex === readingExercises.length - 1 ? '#9ca3af' : '#f0f2f5'}
          />
        </TouchableOpacity>
      </View>
      {feedback && (
        <Text
          className={`text-center ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'} font-semibold`}
        >
          {feedback}
        </Text>
      )}
    </ScrollView>
  );
});

export default ReadingScreen;