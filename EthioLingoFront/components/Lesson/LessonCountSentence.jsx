// /EthioLingoFront/components/Lesson/LessonCountSentence.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

export default function LessonCountSentence() {
  return (
    <View className="px-4 py-2">
      <Text className="text-screenText text-sm">
        {/* Below every topic name can see how many sentences this lesson is for practice. */}
      </Text>
      <Text className="text-listBarText text-base mt-1">Total Sentences: 42</Text>
    </View>
  );
}