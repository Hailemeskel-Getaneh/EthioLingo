// /EthioLingoFront/screens/Lesson/WritingScreen.jsx
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, globalStyles } from '../../styles/globalStyles';

const WritingScreen = React.memo(({ topic }) => {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleCheck = useCallback(() => {
    const correctAnswer = 'One'; // Example
    setFeedback(input.toLowerCase() === correctAnswer.toLowerCase() ? 'Correct Answer' : 'Wrong Answer');
  }, [input]);

  return (
    <View className="p-4">
      <Text className="text-primaryText text-lg mb-4">Enter what you hear</Text>
      <TextInput
        className="bg-white p-2 mb-2 rounded border border-gray-300"
        value={input}
        onChangeText={setInput}
        placeholder="Type here"
        placeholderTextColor={colors.listBarText}
      />
      <TouchableOpacity className="bg-primaryBackground p-4 rounded mb-2" onPress={handleCheck}>
        <View className="flex-row items-center justify-center">
          <Ionicons name="checkmark" size={24} color={colors.primaryText} />
          <Text className="text-primaryText text-base ml-2">Check</Text>
        </View>
      </TouchableOpacity>
      {feedback ? <Text className="text-primaryText text-center">{feedback}</Text> : null}
      <TouchableOpacity className="bg-primaryBackground p-4 rounded">
        <Text className="text-primaryText text-base text-center">Skip</Text>
      </TouchableOpacity>
    </View>
  );
});

export default WritingScreen;