import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, ActivityIndicator, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import QuestionProgressBar from '../../components/Lesson/QuestionProgressBar';
import { fetchAndCacheLessons, getLessonsFromSQLite, clearTestData } from '../../database/lessonOperations';

const ListeningScreen = React.memo(() => {
  const route = useRoute();
  const { topic = { title: 'Unknown Topic' }, language: rawLanguage } = route.params || {};
  const language = rawLanguage && rawLanguage !== 'null' ? rawLanguage : 'Amharic';

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
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

      await clearTestData();
      let lessons = await getLessonsFromSQLite(topic.title, language);
      if (lessons.length === 0 && state.isConnected) {
        const fetchSuccess = await fetchAndCacheLessons(language, true);
        if (fetchSuccess) {
          lessons = await getLessonsFromSQLite(topic.title, language);
        }
      }

      if (lessons.length > 0) {
        const lesson = lessons.reduce((best, curr) => {
          const currCount = curr.content?.listening?.audioFiles?.length || 0;
          const bestCount = best.content?.listening?.audioFiles?.length || 0;
          return currCount > bestCount ? curr : best;
        }, lessons[0]);
        setAudioTracks(lesson?.content?.listening?.audioFiles || []);
      } else {
        setError('No listening exercises found.');
      }
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
    return sound ? () => {
      sound.unloadAsync().catch(console.error);
    } : undefined;
  }, [sound]);

  const loadAndPlayAudio = useCallback(
    async (index = currentAudioIndex) => {
      if (!audioTracks[index]?.source && !audioTracks[index]?.localPath) {
        setError('No audio available');
        return;
      }
      try {
        setIsLoading(true);
        setSelectedOption(null);
        const audioUri = isConnected && !audioTracks[index].localPath
          ? audioTracks[index].source
          : audioTracks[index].localPath;

        if (sound) await sound.unloadAsync();

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true, rate: playbackSpeed, shouldCorrectPitch: true }
        );

        setSound(newSound);
        setIsPlaying(true);
        setCurrentAudioIndex(index);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) setIsPlaying(false);
        });
      } catch (error) {
        setError('Failed to load audio');
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
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
    setIsPlaying(!isPlaying);
  }, [sound, isPlaying, loadAndPlayAudio]);

  const handleNext = async () => {
    if (currentAudioIndex < audioTracks.length - 1) {
      if (!answerStatuses[currentAudioIndex]) {
        setAnswerStatuses((prev) => ({ ...prev, [currentAudioIndex]: 'skipped' }));
      }
      await loadAndPlayAudio(currentAudioIndex + 1);
    }
  };

  const handlePrevious = async () => {
    if (currentAudioIndex > 0) {
      if (!answerStatuses[currentAudioIndex]) {
        setAnswerStatuses((prev) => ({ ...prev, [currentAudioIndex]: 'skipped' }));
      }
      await loadAndPlayAudio(currentAudioIndex - 1);
    }
  };

  const handleSpeedChange = async () => {
    const newSpeed = playbackSpeed === 1.0 ? 0.5 : playbackSpeed === 0.5 ? 1.5 : 1.0;
    setPlaybackSpeed(newSpeed);
    if (sound) await sound.setRateAsync(newSpeed, true);
  };

  const checkAnswer = () => {
    if (!selectedOption) return alert('Please select an option.');
    const correct = selectedOption.toLowerCase().trim() === currentAudio.correctOption?.toLowerCase().trim();
    setAnswerStatuses((prev) => ({ ...prev, [currentAudioIndex]: correct ? 'correct' : 'incorrect' }));
    alert(correct ? 'Correct!' : `Incorrect. Correct: ${currentAudio.correctOption}`);
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
        <TouchableOpacity className="bg-primaryBackground py-3 px-10 rounded-lg" onPress={fetchData}>
          <Text className="text-primaryText text-base font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-6 bg-screenBackground">
      <Text className="text-2xl font-bold text-screenText text-center mb-4">
        Listening Exercise ({language})
      </Text>

      <QuestionProgressBar
        total={audioTracks.length}
        current={currentAudioIndex}
        statuses={answerStatuses}
        onJumpTo={loadAndPlayAudio}
      />

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
        ) : (
          <Ionicons name={isPlaying ? 'pause' : 'volume-high'} size={24} color="#313574" />
        )}
      </TouchableOpacity>

      {currentAudio.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          className={`p-3 my-1 rounded-lg border ${
            selectedOption === option ? 'bg-primaryBackground border-primaryBackground' : 'bg-listBarBackground border-listBarText'
          }`}
          onPress={() => setSelectedOption(option)}
        >
          <Text className={`text-center ${selectedOption === option ? 'text-primaryText' : 'text-listBarText'}`}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-4" onPress={checkAnswer}>
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          className={`bg-accent2 py-3 px-4 rounded-lg mr-4 ${currentAudioIndex <= 0 ? 'opacity-50' : ''}`}
          onPress={handlePrevious}
          disabled={currentAudioIndex <= 0}
        >
          <Ionicons name="arrow-back" size={24} color="#f0f2f5" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-accent2 py-3 px-4 rounded-lg ${currentAudioIndex >= audioTracks.length - 1 ? 'opacity-50' : ''}`}
          onPress={handleNext}
          disabled={currentAudioIndex >= audioTracks.length - 1}
        >
          <Ionicons name="arrow-forward" size={24} color="#f0f2f5" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-8"
        onPress={handleSpeedChange}
      >
        <Text className="text-primaryText text-base font-bold">Speed: {playbackSpeed}x</Text>
      </TouchableOpacity>
    </ScrollView>
  );
});

export default ListeningScreen;
