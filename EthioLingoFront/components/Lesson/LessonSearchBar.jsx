// /EthioLingoFront/components/Lesson/LessonSearchBar.jsx

import React from 'react';
import { View, TextInput } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';

export default function LessonSearchBar() {
  return (
    <View className="px-4 py-2">
      <TextInput
        className="bg-listBarBackground text-listBarText text-base p-3 rounded-lg border border-gray-300"
        placeholder="Search here for their learning topic easily"
        placeholderTextColor="#666"
      />
    </View>
  );
}