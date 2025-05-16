import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { fetchAndCacheLessons, getLessonsFromSQLite } from '../../database/lessonOperations';
import { colors } from '../../styles/globalStyles';
import QuestionProgressBar from '../../components/Lesson/QuestionProgressBar';

const WritingScreen = React.memo(() => {
  const route = useRoute();
  const { topic, language = 'Amharic' } = route.params || { topic: { title: 'Unknown Topic' } };
  console.log('WritingScreen params:', { topic: topic.title, language });

  const [writingExercises, setWritingExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const currentExercise = writingExercises[currentExerciseIndex] || {
    motherTongueText: 'No exercise available',
    equivalentText: 'N/A',
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
        const exercises = lesson?.content?.writing?.writingExercises || [];
        setWritingExercises(exercises);
      } else {
        setError('No writing exercises found. Please check your internet connection and API availability.');
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

  const handleCheck = useCallback(() => {
    if (!userInput.trim()) {
      Alert.alert('Input Required', 'Please type your answer before checking.');
      return;
    }
    const isCorrect = userInput.trim().toLowerCase() === currentExercise.equivalentText.toLowerCase();
    setAnswerStatuses((prev) => ({
      ...prev,
      [currentExerciseIndex]: isCorrect ? 'correct' : 'incorrect',
    }));
    Alert.alert(
      isCorrect ? 'Correct!' : 'Wrong!',
      isCorrect ? 'Great job!' : `The correct answer is "${currentExercise.equivalentText}".`,
      [{ text: 'OK', onPress: () => setUserInput('') }]
    );
  }, [userInput, currentExercise, currentExerciseIndex]);

  const handleNext = useCallback(() => {
    if (currentExerciseIndex < writingExercises.length - 1) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserInput('');
    }
  }, [currentExerciseIndex, writingExercises.length, answerStatuses]);

  const handleBack = useCallback(() => {
    if (currentExerciseIndex > 0) {
      if (!answerStatuses[currentExerciseIndex]) {
        setAnswerStatuses((prev) => ({
          ...prev,
          [currentExerciseIndex]: 'skipped',
        }));
      }
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setUserInput('');
    }
  }, [currentExerciseIndex, answerStatuses]);

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

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Writing Exercise ({language})</Text>

      <QuestionProgressBar
        total={writingExercises.length}
        current={currentExerciseIndex}
        statuses={answerStatuses}
        onJumpTo={(i) => {
          if (!answerStatuses[currentExerciseIndex]) {
            setAnswerStatuses((prev) => ({
              ...prev,
              [currentExerciseIndex]: 'skipped',
            }));
          }
          setCurrentExerciseIndex(i);
          setUserInput('');
        }}
      />

      <Text className="text-screenText text-base text-center mb-4">
        Write the equivalent phrase in the learning language.
      </Text>

      <View className="bg-accent3 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      <View className="bg-accent5 p-6 rounded-xl shadow-lg mb-6">
        <TextInput
          className="text-screenText text-base p-2 border border-primaryBackground rounded-lg"
          placeholder="Type here..."
          placeholderTextColor={colors.listBarText}
          value={userInput}
          onChangeText={setUserInput}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-6"
        onPress={handleCheck}
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>

      <View className="flex-row justify-between mb-10">
        <TouchableOpacity
          className={`p-3 rounded-full ${currentExerciseIndex === 0 ? 'bg-gray-300' : 'bg-accent2'}`}
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
            currentExerciseIndex === writingExercises.length - 1 ? 'bg-gray-300' : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === writingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={currentExerciseIndex === writingExercises.length - 1 ? '#9ca3af' : '#f0f2f5'}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

export default WritingScreen;
