import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';

const WritingScreen = React.memo(({ topic, data }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [answerStatuses, setAnswerStatuses] = useState({});

  const writingExercises = data?.writingExercises || [];

  const currentExercise = writingExercises[currentExerciseIndex] || {
    motherTongueText: 'No exercise available',
    equivalentText: 'N/A',
  };

  const handleCheck = useCallback(() => {
    if (!userInput.trim()) {
      Alert.alert('Input Required', 'Please type your answer before checking.', [
        { text: 'OK' },
      ]);
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
  }, [currentExerciseIndex, answerStatuses, writingExercises.length]);

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

      {/* Progress Indicator */}
      <View className="flex-row justify-center mb-12">
        {Array.from({ length: 10 }, (_, i) => {
          const status = answerStatuses[i];
          let bgColor = 'bg-accent6';
          let textColor = 'text-screenText';

          if (i === currentExerciseIndex) {
            bgColor = 'bg-accent2';
            textColor = 'text-primaryText';
          } else if (status === 'correct') {
            bgColor = 'bg-accent2';
            textColor = 'text-primaryText';
          } else if (status === 'incorrect') {
            bgColor = 'bg-lightRed';
            textColor = 'text-primaryText';
          }
          return (
            <View
              key={i}
              className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center ${bgColor}`}
            >
              <Text className={`text-base font-medium ${textColor}`}>
                {i + 1}
              </Text>
            </View>
          );
        })}
      </View>

      <Text className="text-screenText text-base text-center mb-4 mt-6">
        Write the equivalent phrase in the learning language.
      </Text>

      {/* Mother Tongue Text */}
      <View className="bg-listBarBackground p-6 rounded-xl shadow-md mb-6">
        <Text className="text-screenText text-lg text-center">{currentExercise.motherTongueText}</Text>
      </View>

      {/* Input Field */}
      <View className="bg-listBarBackground p-6 rounded-xl shadow-md mb-6">
        <TextInput
          className="text-screenText text-base p-3 border border-accent6 rounded-lg bg-accent1"
          placeholder="Type here..."
          placeholderTextColor={colors.listBarText}
          value={userInput}
          onChangeText={setUserInput}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Check Button */}
      <TouchableOpacity
        className="bg-primaryBackground py-3 px-10 rounded-lg self-center mb-8 shadow-sm"
        onPress={handleCheck}
      >
        <Text className="text-primaryText text-lg font-bold">Check</Text>
      </TouchableOpacity>

      {/* Navigation Controls */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          className={`p-3 rounded-full ${
            currentExerciseIndex === 0 ? 'bg-accent6' : 'bg-accent2'
          }`}
          onPress={handleBack}
          disabled={currentExerciseIndex === 0}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={currentExerciseIndex === 0 ? colors.listBarText : colors.primaryText}
          />
        </TouchableOpacity>

        <Text className="text-screenText text-sm">
          {currentExerciseIndex + 1} / {writingExercises.length}
        </Text>

        <TouchableOpacity
          className={`p-3 rounded-full ${
            currentExerciseIndex === writingExercises.length - 1
              ? 'bg-accent6'
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
                ? colors.listBarText
                : colors.primaryText
            }
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});

export default WritingScreen;