// /EthioLingoFront/screens/Lesson/WritingScreen.jsx
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';

const writingExercises = [
  {
    id: 1,
    motherTongueText: 'የት ነህ? ',
    equivalentText: 'Where are you?',
  },
  {
    id: 2,
    motherTongueText: 'ሰላም አደርኩት ',
    equivalentText: 'I greeted you',
  },
  {
    id: 3,
    motherTongueText: 'መጽሐፍ አንብብ ',
    equivalentText: 'read a book',
  },
];

const WritingScreen = React.memo(({ topic }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});

  const currentExercise = writingExercises[currentExerciseIndex];

  const handleCheck = useCallback(() => {
    const isCorrect = userInput.trim().toLowerCase() === currentExercise.equivalentText.toLowerCase();
    setAnswerStatuses((prev) => ({
      ...prev,
      [currentExerciseIndex]: isCorrect ? 'correct' : 'incorrect',
    }));
    Alert.alert(
      isCorrect ? 'Correct!' : 'Wrong!',
      isCorrect ? 'Great job!' : `The correct answer is "${currentExercise.equivalentText}".`,
      [
        { text: 'OK', onPress: () => setUserInput('') }, 
      ]
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
      setUserInput('');
    }
  }, [currentExerciseIndex, answerStatuses]);

  return (
    <ScrollView className="flex-1 bg-screenBackground p-6">
      <Text className="text-2xl font-bold text-screenText text-center mb-6">Writing Exercise</Text>

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
        Write the equivalent phrase in the learning language.
      </Text>

      {/* Mother Tongue Text */}
      <View className="bg-accent3 p-6 rounded-xl shadow-lg mb-6">
        <Text className="text-screenText text-lg">{currentExercise.motherTongueText}</Text>
      </View>

      {/* Input Field */}
      <View className="bg-accent5 p-6 rounded-xl shadow-lg mb-6">
        <TextInput
          className="text-screenText text-base p-2 border border-primaryBackground rounded-lg"
          placeholder="Type here..."
          placeholderTextColor={colors.listBarText}
          value={userInput}
          onChangeText={setUserInput}
          multiline={true}
          numberOfLines={3}
        />
      </View>

      {/* Check Button */}
      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-6"
        onPress={handleCheck}
      >
        <Text className="text-primaryText text-base font-bold">Check</Text>
      </TouchableOpacity>

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
            currentExerciseIndex === writingExercises.length - 1
              ? 'bg-gray-300'
              : 'bg-accent2'
          }`}
          onPress={handleNext}
          disabled={currentExerciseIndex === writingExercises.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={
              currentExerciseIndex === writingExercises.length - 1
                ? '#9ca3af'
                : '#f0f2f5'
            }
          />
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
});

export default WritingScreen;