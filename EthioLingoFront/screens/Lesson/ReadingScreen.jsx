// /EthioLingoFront/screens/Lesson/ReadingScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, globalStyles } from '../../styles/globalStyles';

const readingExercises = [
  {
    id: 1,
    motherTongueText: `የሰማይ ቀንድ በምሽት ይቀጣል። 
የአየር ሁኔታ በዚያ ጊዜ መልካም ነው። 
የአበባዎች ቀጠሮ በዚያ ጊዜ ይጀመራል። 
የንጹህ ነፋስ የሚመጣው ከምሽቱ ጀምሮ ነው።`,
    learningText: `The sun sets in the evening. 
The weather becomes pleasant at that hour. 
The blooming of flowers begins around then. 
Fresh breezes start to arrive from the evening onwards.`,
    audioSource: require('../../assets/audio/Record034.mp3'),
  },
  {
    id: 2,
    motherTongueText: `ፈረስ በጎርፍ ይኖራል። 
የእሱ ግድግዳ በተለመደ ነው። 
የእሱ መንገድ በጎርፍ ዙሪያ ነው።`,
    learningText: `A horse lives in the stable. 
Its mane is well-groomed. 
Its path circles around the stable.`,
    audioSource: require('../../assets/audio/Record033.mp3'),
  },
  {
    id: 3,
    motherTongueText: `መጽሐፍትን ማንበብ እወዳለሁ። 
በቤት ውስጥ መጽሐፍት መጠበቅ አለብኝ። 
የመጽሐፍ ገፅታዎች መመልከት መዝናኛ ነው። 
ከመጽሐፍ መንገድ እቅድ መውሰድ አለብኝ። 
የመጽሐፍ ጥቅም በህይወት ተገቢ ነው።`,
    learningText: `I like to read books. 
I need to keep books inside the house. 
Reading the pages of a book is enjoyable. 
I should plan my reading schedule. 
The value of books is significant in life.`,
    audioSource: require('../../assets/audio/Record034.mp3'),
  },
];

const ReadingScreen = React.memo(({ topic }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});

  const currentExercise = readingExercises[currentExerciseIndex];

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
        await AsyncStorage.setItem(`recording_${currentExercise.id}`, uri);
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
        setFeedback('Please record your reading first!');
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
      setFeedback(isMatch ? 'Correct!' : 'Wrong! The duration doesn’t match.');
      await recordedSound.unloadAsync();
    } catch (error) {
      console.error('Error checking recording:', error);
      setFeedback('Error comparing recordings.');
    }
  }, [recordingUri, sound, currentExerciseIndex]);

  const handleNext = useCallback(() => {
    if (currentExerciseIndex < readingExercises.length - 1) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setIsPlaying(false);
      setIsRecording(false);
      setFeedback('');
    }
  }, [currentExerciseIndex, answerStatuses]);

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
      setFeedback('');
    }
  }, [currentExerciseIndex, answerStatuses]);

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Reading Exercise</Text>

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
        Read the phrase and record your voice.
      </Text>

      <View className="bg-accent6 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText2 text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      <View className="bg-accent7 p-6 rounded-xl shadow-lg mb-6">
        <View className="flex-row items-center">
          <Text className="text-screenText2 text-lg mr-2">{currentExercise.learningText}</Text>
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

          <TouchableOpacity
              className={`items-center justify-center w-24 h-16 rounded-full ${isRecording ? 'bg-red-300' : 'bg-white'
                  } border-2 border-accent1 self-center mb-6`}
              onPress={isRecording ? stopRecording : startRecording}
          >
              <Ionicons
                  name={isRecording ? 'stop' : 'mic'}
                  size={30}
                  color="#313574"
              />
              <Text className="text-screenText text-center text-xs mt-1">Hold to record before reading</Text>
</TouchableOpacity>

      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-6"
        onPress={checkRecording}
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>

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
            currentExerciseIndex === readingExercises.length - 1
              ? 'bg-gray-300'
              : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === readingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={
              currentExerciseIndex === readingExercises.length - 1
                ? '#9ca3af'
                : '#f0f2f5'
            }
          />
        </TouchableOpacity>
      </View>

      {feedback ? (
        <Text
          className={`text-center ${
            feedback === 'Correct!' ? 'text-green-600' : 'text-red-600'
          } font-semibold`}
        >
          {feedback}
        </Text>
      ) : null}
    </ScrollView>
  );
});

export default ReadingScreen;