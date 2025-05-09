import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, Animated, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { fetchAndCacheLessons, getLessonsFromSQLite, clearTestData } from '../../database/lessonOperations';
import { API_URL } from '@env';

const ListeningScreen = React.memo(() => {
  const route = useRoute();
  const { topic = { title: 'Unknown Topic' }, language: rawLanguage } = route.params || {};
  const language = rawLanguage && rawLanguage !== 'null' ? rawLanguage : 'Amharic';
  console.log('ListeningScreen params:', { topic: topic.title, language });

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [waveAnimation] = useState(new Animated.Value(0));
  const [error, setError] = useState(null);
  const [answerStatuses, setAnswerStatuses] = useState({});
  const [audioTracks, setAudioTracks] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const currentAudio = audioTracks[currentAudioIndex] || {
    correctText: 'No audio available',
    correctOption: 'N/A',
    options: ['N/A'],
    source: null,
    localPath: null,
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      console.log('Network state: connected=', state.isConnected);

      await clearTestData();
      let lessons = await getLessonsFromSQLite(topic.title, language);
      if (lessons.length === 0 && state.isConnected) {
        console.log('No lessons in SQLite, fetching from API');
        const fetchSuccess = await fetchAndCacheLessons(language, true);
        if (fetchSuccess) {
          lessons = await getLessonsFromSQLite(topic.title, language);
        }
      }

      if (lessons.length > 0) {
        const lesson = lessons.reduce((best, curr) => {
          const currAudioCount = curr.content?.listening?.audioFiles?.length || 0;
          const bestAudioCount = best.content?.listening?.audioFiles?.length || 0;
          return currAudioCount > bestAudioCount ? curr : best;
        }, lessons[0]);
        console.log('Selected lesson:', lesson.lesson_id);
        const tracks = lesson?.content?.listening?.audioFiles || [];
        console.log('Listening tracks count:', tracks.length);
        setAudioTracks(tracks);
      } else {
        setError('No listening exercises found. Please check your internet connection and API availability.');
      }
    } catch (err) {
      console.error('Error fetching listening exercises:', err.message);
      setError('Failed to load exercises: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }, [topic.title, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(waveAnimation, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ).start();
  }, [waveAnimation]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync().catch((err) => console.log('Unload error:', err));
        }
      : undefined;
  }, [sound]);

  const loadAndPlayAudio = useCallback(
    async (index = currentAudioIndex) => {
      if (!audioTracks[index]?.source && !audioTracks[index]?.localPath) {
        setError('No audio available for this exercise');
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        setSelectedOption(null);

        const audioSource = audioTracks[index].localPath || audioTracks[index].source;
        const audioUri = isConnected && !audioTracks[index].localPath ? audioTracks[index].source : audioSource;
        console.log('Playing audio:', audioUri.split('/').pop());

        if (sound) {
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true, rate: playbackSpeed, shouldCorrectPitch: true }
        );

        setSound(newSound);
        setIsPlaying(true);
        setCurrentAudioIndex(index);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      } catch (error) {
        console.error('Error loading audio:', error.message);
        setError('Failed to load audio. Please check your internet connection if offline content is unavailable.');
      } finally {
        setIsLoading(false);
      }
    },
    [sound, currentAudioIndex, playbackSpeed, audioTracks, isConnected]
  );

  const handlePlayPause = useCallback(async () => {
    if (!sound) {
      await loadAndPlayAudio();
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }, [sound, isPlaying, loadAndPlayAudio]);

  const handleNext = useCallback(async () => {
    if (currentAudioIndex < audioTracks.length - 1) {
      if (!answerStatuses[currentAudioIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentAudioIndex]: 'skipped',
        }));
      }
      await loadAndPlayAudio(currentAudioIndex + 1);
    }
  }, [currentAudioIndex, loadAndPlayAudio, answerStatuses, audioTracks.length]);

  const handlePrevious = useCallback(async () => {
    if (currentAudioIndex > 0) {
      if (!answerStatuses[currentAudioIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentAudioIndex]: 'skipped',
        }));
      }
      await loadAndPlayAudio(currentAudioIndex - 1);
    }
  }, [currentAudioIndex, loadAndPlayAudio, answerStatuses]);

  const handleSpeedChange = useCallback(async () => {
    const newSpeed = playbackSpeed === 1.0 ? 0.5 : playbackSpeed === 0.5 ? 1.5 : 1.0;
    setPlaybackSpeed(newSpeed);
    if (sound) {
      await sound.setRateAsync(newSpeed, true);
    }
  }, [sound, playbackSpeed]);

  const checkAnswer = () => {
    if (!selectedOption) {
      Alert.alert('Please select an option!');
      return;
    }
    const correctOption = currentAudio.correctOption?.toLowerCase().trim() || '';
    const userText = selectedOption.toLowerCase().trim();
    const isCorrect = userText === correctOption;

    setAnswerStatuses((prev) => ({
      ...prev,
      [currentAudioIndex]: isCorrect ? 'correct' : 'incorrect',
    }));

    if (isCorrect) {
      Alert.alert('Correct!', 'Great job!', [{ text: 'OK' }]);
    } else {
      Alert.alert('Incorrect', `The correct answer was: "${currentAudio.correctOption}"`, [
        { text: 'OK' },
      ]);
    }
    setSelectedOption(null);
  };

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
        <TouchableOpacity
          className="bg-primaryBackground py-3 px-10 rounded-lg"
          onPress={fetchData}
        >
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (audioTracks.length === 0) {
    return (
      <View className="flex-1 p-6 justify-center items-center">
        <Text className="text-screenText text-xl font-bold text-center mb-4">No listening content available</Text>
        <TouchableOpacity
          className="bg-primaryBackground py-3 px-10 rounded-lg"
          onPress={fetchData}
        >
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-6 bg-screenBackground">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Listening Exercise ({language})</Text>
      <View className="flex-row justify-center mb-6">
        {Array.from({ length: audioTracks.length }, (_, i) => {
          const status = answerStatuses[i];
          let bgColor = 'bg-listBarBackground';
          if (i === currentAudioIndex) {
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
                  i === currentAudioIndex || status === 'correct' || status === 'incorrect'
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
        Listen to the audio and identify the phrase.
      </Text>
      <Text className="text-screenText text-xl font-bold text-center mb-4">
        {currentAudio.correctText}
      </Text>
      <TouchableOpacity
        className="items-center justify-center w-16 h-16 rounded-full bg-white self-center mb-4 border-2 border-accent1"
        onPress={handlePlayPause}
        disabled={isLoading || (!currentAudio.source && !currentAudio.localPath)}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#313574" />
        ) : (!currentAudio.source && !currentAudio.localPath) ? (
          <Text className="text-screenText text-xs">No Audio</Text>
        ) : (
          <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={24} color="#313574" />
        )}
      </TouchableOpacity>
      <View className="mb-4">
        {currentAudio.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`p-3 my-1 ${
              selectedOption === option ? 'bg-primaryBackground' : 'bg-listBarBackground'
            } rounded-lg border border-primaryBackground`}
            onPress={() => setSelectedOption(option)}
          >
            <Text
              className={`text-center ${
                selectedOption === option ? 'text-primaryText' : 'text-listBarText'
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-4"
        onPress={checkAnswer}
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          className={`bg-accent2 py-3 px-4 rounded-lg mr-4 ${
            currentAudioIndex <= 0 ? 'opacity-50' : ''
          }`}
          onPress={handlePrevious}
          disabled={currentAudioIndex <= 0}
        >
          <Ionicons name="arrow-back" size={24} color="#f0f2f5" />
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-accent2 py-3 px-4 rounded-lg ${
            currentAudioIndex >= audioTracks.length - 1 ? 'opacity-50' : ''
          }`}
          onPress={handleNext}
          disabled={currentAudioIndex >= audioTracks.length - 1}
        >
          <Ionicons name="arrow-forward" size={24} color="#f0f2f5" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center"
        onPress={handleSpeedChange}
      >
        <Text className="text-primaryText text-base font-bold">Speed: {playbackSpeed}x</Text>
      </TouchableOpacity>
    </ScrollView>
  );
});

export default ListeningScreen;