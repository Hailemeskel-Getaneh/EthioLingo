import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { fetchAndCacheLessons, getLessonsFromSQLite } from '../../database/lessonOperations';
import QuestionProgressBar from '../../components/Lesson/QuestionProgressBar';
import { API_URL } from '@env';

const ReadingScreen = () => {
  const route = useRoute();
  const { topic, language = 'Amharic' } = route.params || { topic: { title: 'Unknown Topic' } };

  const [readingExercises, setReadingExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const currentExercise = readingExercises[currentExerciseIndex] || {};

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

      const lesson = lessons.find((l) => l.lesson_name === topic.title);
      const exercises = lesson?.content?.reading?.readingExercises || [];
      setReadingExercises(exercises);
    } catch (err) {
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
      Alert.alert('Error', 'Failed to start recording.');
    }
  }, [hasPermission]);

  const stopRecording = useCallback(async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        await AsyncStorage.setItem(`recording_${currentExerciseIndex}_${topic.title}_${language}`, uri);
        setRecordingUri(uri);
        setIsRecording(false);
        setRecording(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording.');
    }
  }, [recording, currentExerciseIndex, topic.title, language]);

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
    } catch {
      setFeedback('Error comparing recordings.');
    }
  }, [recordingUri, sound, currentExerciseIndex]);

  const handleNext = useCallback(async () => {
    if (!answerStatuses[currentExerciseIndex]) {
      setAnswerStatuses((prev) => ({ ...prev, [currentExerciseIndex]: 'skipped' }));
    }
    if (sound) await sound.unloadAsync();
    if (recording) await recording.stopAndUnloadAsync();

    setCurrentExerciseIndex((prev) => Math.min(prev + 1, readingExercises.length - 1));
    resetSession();
  }, [currentExerciseIndex, answerStatuses, readingExercises.length, sound, recording]);

  const handleBack = useCallback(async () => {
    if (!answerStatuses[currentExerciseIndex]) {
      setAnswerStatuses((prev) => ({ ...prev, [currentExerciseIndex]: 'skipped' }));
    }
    if (sound) await sound.unloadAsync();
    if (recording) await recording.stopAndUnloadAsync();

    setCurrentExerciseIndex((prev) => Math.max(prev - 1, 0));
    resetSession();
  }, [currentExerciseIndex, answerStatuses, sound, recording]);

  const resetSession = () => {
    setSound(null);
    setRecording(null);
    setIsPlaying(false);
    setIsRecording(false);
    setFeedback('');
    setRecordingUri(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#313574" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-red-600 text-xl mb-4 text-center">{error}</Text>
        <TouchableOpacity
          onPress={fetchData}
          className="bg-primaryBackground py-3 px-10 rounded-lg"
        >
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">
        Reading Exercise ({language})
      </Text>

      <QuestionProgressBar
        total={readingExercises.length}
        current={currentExerciseIndex}
        statuses={answerStatuses}
        onJumpTo={async (index) => {
          if (!answerStatuses[currentExerciseIndex]) {
            setAnswerStatuses((prev) => ({ ...prev, [currentExerciseIndex]: 'skipped' }));
          }
          if (sound) await sound.unloadAsync();
          if (recording) await recording.stopAndUnloadAsync();
          setCurrentExerciseIndex(index);
          resetSession();
        }}
      />

      <Text className="text-center text-screenText text-base mb-4">
        Read the phrase and record your voice.
      </Text>

      <View className="bg-accent6 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText2 text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      <View className="bg-accent7 p-6 rounded-xl shadow-lg mb-6">
        <View className="flex-row items-center">
          <Text className="text-screenText2 text-lg mr-2">{currentExercise.learningText}</Text>
          <TouchableOpacity
            onPress={loadAndPlayAudio}
            className="items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-accent1"
            disabled={isPlaying || isLoading || (!currentExercise.audioSource && !currentExercise.localPath)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#313574" />
            ) : (
              <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={20} color="#313574" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        className={`items-center justify-center w-24 h-16 rounded-full ${
          isRecording ? 'bg-red-300' : 'bg-white'
        } border-2 border-accent1 self-center mb-6`}
        disabled={!hasPermission}
      >
        <Ionicons name={isRecording ? 'stop' : 'mic'} size={30} color="#313574" />
        <Text className="text-screenText text-center text-xs mt-1">Hold to record</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={checkRecording}
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-6"
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between mb-6">
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentExerciseIndex === 0}
          className={`p-3 rounded-full ${currentExerciseIndex === 0 ? 'bg-gray-300' : 'bg-accent2'}`}
        >
          <Ionicons name="arrow-back" size={24} color="#f0f2f5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentExerciseIndex === readingExercises.length - 1}
          className={`p-3 rounded-full ${
            currentExerciseIndex === readingExercises.length - 1 ? 'bg-gray-300' : 'bg-accent2'
          }`}
        >
          <Ionicons name="arrow-forward" size={24} color="#f0f2f5" />
        </TouchableOpacity>
      </View>

      {feedback ? (
        <Text
          className={`text-center font-semibold ${
            feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default ReadingScreen;
