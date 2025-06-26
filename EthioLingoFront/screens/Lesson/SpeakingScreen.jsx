import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { fetchAndCacheLessons, getLessonsFromSQLite } from '../../database/lessonOperations';
import { API_URL } from '@env';
import QuestionProgressBar from '../../components/Lesson/QuestionProgressBar';

const SpeakingScreen = React.memo(() => {
  const route = useRoute();
  const { topic, language = 'Amharic' } = route.params || { topic: { title: 'Unknown Topic' } };

  const [speakingExercises, setSpeakingExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answerStatuses, setAnswerStatuses] = useState({});
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const currentExercise = speakingExercises[currentExerciseIndex] || {
    motherTongueText: 'No exercise available',
    learningText: 'N/A',
    audioSource: null,
    localPath: null,
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);

      let lessons = await getLessonsFromSQLite(topic.title, language);
      if (lessons.length === 0 && state.isConnected) {
        const fetchSuccess = await fetchAndCacheLessons(language, true);
        if (fetchSuccess) {
          lessons = await getLessonsFromSQLite(topic.title, language);
        }
      }

      if (lessons.length > 0) {
        const lesson = lessons.find((l) => l.lesson_name === topic.title);
        const exercises = lesson?.content?.speaking?.speakingExercises || [];
        setSpeakingExercises(exercises);
      } else {
        setError('No speaking exercises found. Please check your internet connection and API availability.');
      }
    } catch (err) {
      console.error('Error fetching speaking exercises:', err.message);
      setError('Failed to load exercises: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, [topic.title, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    if (!currentExercise.audioSource && !currentExercise.localPath) {
      setError('No audio source available');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      if (sound) await sound.unloadAsync();

      const audioUri = isConnected && !currentExercise.localPath
        ? currentExercise.audioSource
        : currentExercise.localPath || currentExercise.audioSource;

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (error) {
      console.error('Error playing audio:', error.message);
      setError('Failed to play audio: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [sound, currentExercise, isConnected]);

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
      console.error('Error starting recording:', error.message);
      Alert.alert('Error', 'Failed to start recording.');
    }
  }, [hasPermission]);

  const stopRecording = useCallback(async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const key = `speaking_recording_${currentExercise.id || currentExerciseIndex}_${topic.title}_${language}`;
        await AsyncStorage.setItem(key, uri);
        setRecordingUri(uri);
        setIsRecording(false);
        setRecording(null);
      }
    } catch (error) {
      console.error('Error stopping recording:', error.message);
      Alert.alert('Error', 'Failed to stop recording.');
    }
  }, [recording, currentExercise.id, currentExerciseIndex, topic.title, language]);

  const checkRecording = useCallback(async () => {
    if (!recordingUri) {
      Alert.alert('Error', 'Please record your speech first!');
      return;
    }
    if (!sound) {
      Alert.alert('Error', 'Please play the original audio first!');
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
      Alert.alert(
        isMatch ? 'Correct!' : 'Wrong!',
        isMatch ? 'Great job!' : `The duration differs by ${Math.round(durationDiff / 1000)} seconds.`,
        [{ text: 'OK' }]
      );
      await recordedSound.unloadAsync();
      const key = `speaking_recording_${currentExercise.id || currentExerciseIndex}_${topic.title}_${language}`;
      await AsyncStorage.removeItem(key);
      setRecordingUri(null);
    } catch (error) {
      console.error('Error checking recording:', error.message);
      Alert.alert('Error', 'Failed to compare recordings.');
    }
  }, [recordingUri, sound, currentExerciseIndex, currentExercise.id, topic.title, language]);

  const retryRecording = useCallback(async () => {
    if (recordingUri) {
      const key = `speaking_recording_${currentExercise.id || currentExerciseIndex}_${topic.title}_${language}`;
      await AsyncStorage.removeItem(key);
      setRecordingUri(null);
    }
    setIsRecording(false);
    setRecording(null);
  }, [recordingUri, currentExercise.id, currentExerciseIndex, topic.title, language]);

  const handleNext = useCallback(async () => {
    if (currentExerciseIndex < speakingExercises.length - 1) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      if (sound) await sound.unloadAsync();
      if (recording) await recording.stopAndUnloadAsync();
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSound(null);
      setRecording(null);
      setIsPlaying(false);
      setIsRecording(false);
      setRecordingUri(null);
      setError(null);
      const key = `speaking_recording_${currentExercise.id || currentExerciseIndex}_${topic.title}_${language}`;
      await AsyncStorage.removeItem(key);
    }
  }, [currentExerciseIndex, answerStatuses, speakingExercises.length, sound, recording, currentExercise.id, topic.title, language]);

  const handleBack = useCallback(async () => {
    if (currentExerciseIndex > 0) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      if (sound) await sound.unloadAsync();
      if (recording) await recording.stopAndUnloadAsync();
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSound(null);
      setRecording(null);
      setIsPlaying(false);
      setIsRecording(false);
      setRecordingUri(null);
      setError(null);
      const key = `speaking_recording_${currentExercise.id || currentExerciseIndex}_${topic.title}_${language}`;
      await AsyncStorage.removeItem(key);
    }
  }, [currentExerciseIndex, answerStatuses, sound, recording, currentExercise.id, topic.title, language]);

  const jumpToExercise = useCallback((index) => {
    setCurrentExerciseIndex(index);
    setSound(null);
    setRecording(null);
    setIsPlaying(false);
    setIsRecording(false);
    setRecordingUri(null);
    setError(null);
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 p-6 justify-center">
        <ActivityIndicator size="large" color="#313574" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 p-6 justify-center items-center">
        <Text className="text-error text-xl font-bold text-center mb-4">{error}</Text>
        <TouchableOpacity className="bg-primaryBackground py-3 px-10 rounded-lg" onPress={fetchData}>
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (speakingExercises.length === 0) {
    return (
      <View className="flex-1 p-6 justify-center items-center">
        <Text className="text-screenText text-xl font-bold text-center mb-4">No speaking content available</Text>
        <TouchableOpacity className="bg-primaryBackground py-3 px-10 rounded-lg" onPress={fetchData}>
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Speaking Exercise ({language})</Text>

      <QuestionProgressBar
        currentIndex={currentExerciseIndex}
        total={speakingExercises.length}
        answerStatuses={answerStatuses}
        onPressIndicator={jumpToExercise}
      />

      <Text className="text-screenText text-base text-center mb-4">
        Speak the phrase in the learning language.
      </Text>

      <View className="bg-accent3 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      <View className="bg-accent5 p-6 rounded-xl shadow-lg mb-6">
        <View className="flex-row items-center">
          <Text className="text-screenText text-lg mr-2">{currentExercise.learningText}</Text>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-accent1"
            onPress={loadAndPlayAudio}
            disabled={isPlaying || isLoading || (!currentExercise.audioSource && !currentExercise.localPath)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#313574" />
            ) : (!currentExercise.audioSource && !currentExercise.localPath) ? (
              <Text className="text-screenText text-xs">No Audio</Text>
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={20} color="#313574" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className={`items-center justify-center w-16 h-16 rounded-full ${
          isRecording ? 'bg-red-300' : 'bg-white'
        } border-2 border-accent1 self-center mb-6`}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={!hasPermission}
      >
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={30} color="#313574" />
        <Text className="text-screenText text-center text-xs mt-1">Hold to speak</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mb-6">
        {recordingUri && (
          <TouchableOpacity className="bg-accent2 py-3 px-6 rounded-lg mr-4" onPress={retryRecording}>
            <Text className="text-primaryText text-base font-bold">Retry</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity className="bg-primaryBackground py-3 px-10 rounded-lg" onPress={checkRecording}>
          <Text className="text-primaryText text-base font-bold">Check</Text>
        </TouchableOpacity>
      </View>

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
            currentExerciseIndex === speakingExercises.length - 1 ? 'bg-gray-300' : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === speakingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={currentExerciseIndex === speakingExercises.length - 1 ? '#9ca3af' : '#f0f2f5'}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

export default SpeakingScreen;
