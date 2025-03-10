// /EthioLingoFront/screens/Lesson/ListeningScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const ListeningScreen = React.memo(({ route }) => {
  const topic = route?.params?.topic || { title: 'Default Topic' };
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [waveAnimation] = useState(new Animated.Value(0));
  const [error, setError] = useState(null);
  const [answerStatuses, setAnswerStatuses] = useState({});

  const audioTracks = [
    {
      source: require('../../assets/audio/Record033.mp3'),
      correctText: 'how are you?',
      correctOption: "ሁሉም",
      options: ["እንዴት ነህ?", "እንዴት ነዎት?", "ሰላም ነው?", "ሁሉም"],
    },
    {
      source: require('../../assets/audio/Record034.mp3'),
      correctText: 'Good morning!',
      correctOption: "እንደምን አደርክ!",
      options: ["እንደምሽህ!", "እንደምን አደርክ!", "ደህና እደር!"],
    },
    {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'Good evening!',
        correctOption: "እንደምሽህ!",
        options: ["እንደምሽህ!", "እንደምን አደርክ!", "ደህና እደር!"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'Good night!',
        correctOption: "ደህና እደር!",
        options: ["እንደምሽህ!", "እንደምን አደርክ!", "ደህና እደር!"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'How are you? (formal)',
        correctOption: "እንዴት ነዎት?",
        options: ["እንዴት ነዎት?", "እንዴት ነህ?", "ሰላም ነው?"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'How are you? (informal)',
        correctOption: "እንዴት ነህ?",
        options: ["እንዴት ነዎት?", "እንዴት ነህ?", "ሰላም ነው?"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'Are you at peace?',
        correctOption: "ሰላም ነው?",
        options: ["እንዴት ነዎት?", "እንዴት ነህ?", "ሰላም ነው?"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'I like to write books.',
        correctOption: "መጽሐፍትን መጻፍ እወዳለሁ።",
        options: ["መጽሐፍትን መጻፍ እወዳለሁ።", "መጽሐፍትን ማንበብ አልወድም።", "መጽሐፍትን ማንበብ እወዳለሁ።"],
      },
      {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'I dislike reading books.',
        correctOption: "መጽሐፍትን ማንበብ አልወድም።",
        options: ["መጽሐፍትን መጻፍ እወዳለሁ።", "መጽሐፍትን ማንበብ አልወድም።", "መጽሐፍትን ማንበብ እወዳለሁ።"],
      },
        {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'I like to read books.',
        correctOption: "መጽሐፍትን ማንበብ እወዳለሁ።",
        options: ["መጽሐፍትን መጻፍ እወዳለሁ።", "መጽሐፍትን ማንበብ አልወድም።", "መጽሐፍትን ማንበብ እወዳለሁ።"],
      },
        {
        source: require('../../assets/audio/Record034.mp3'),
        correctText: 'Books read me.',
        correctOption: "መጽሐፍት ያነቡኛል።",
        options: ["መጽሐፍት ያነቡኛል።", "መጽሐፍትን ማንበብ አልወድም።", "መጽሐፍትን ማንበብ እወዳለሁ።"],
      },
  ];

  const currentAudio = audioTracks[currentAudioIndex];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(waveAnimation, { toValue: 0, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, [waveAnimation]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync().catch((err) => console.log('Unload error:', err));
        }
      : undefined;
  }, [sound]);

  const loadAndPlayAudio = useCallback(async (index = currentAudioIndex) => {
    try {
      setIsLoading(true);
      setSelectedOption(null);
      if (sound) await sound.unloadAsync();

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioTracks[index].source,
        { shouldPlay: true, rate: playbackSpeed, shouldCorrectPitch: true }
      );

      setSound(newSound);
      setIsPlaying(true);
      setCurrentAudioIndex(index);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
        }
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error loading audio:', error);
      setError('Failed to load audio.');
    } finally {
      setIsLoading(false);
    }
  }, [sound, currentAudioIndex, playbackSpeed]);

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
  }, [currentAudioIndex, loadAndPlayAudio, answerStatuses]);

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
    const correctOption = currentAudio.correctOption.toLowerCase().trim();
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

  if (error) {
    return (
      <View className="flex-1 p-6 justify-center">
        <Text className="text-error text-xl font-bold text-center">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6 justify-center bg-screenBackground">
      <Text className="text-screenText text-base text-center mb-2">Choose the correct question</Text>

      <View className="flex-row justify-center mb-4">
        {Array.from({ length: 10 }, (_, i) => {
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
              <Text className={`text-base ${
                i === currentAudioIndex || status === 'correct' || status === 'incorrect'
                  ? 'text-primaryText'
                  : 'text-screenText'
              }`}>
                {i + 1}
              </Text>
            </View>
          );
        })}
      </View>

      <Text className="text-screenText text-base text-center mb-4">Listen to the audio and identify the phrase.</Text>

      <Text className="text-screenText text-xl font-bold text-center mb-4">{currentAudio.correctText}</Text>

      <TouchableOpacity
        className="items-center justify-center w-16 h-16 rounded-full bg-white self-center mb-4 border-2 border-accent1"
        onPress={handlePlayPause}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#313574" />
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
            <Text className={`text-center ${selectedOption === option ? 'text-primaryText' : 'text-listBarText'}`}>
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
    </View>
  );
});

export default ListeningScreen;