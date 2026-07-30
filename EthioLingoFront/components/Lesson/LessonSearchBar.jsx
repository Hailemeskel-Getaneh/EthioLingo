import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

export default function LessonSearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (text) => {
    setSearchText(text);
    onSearch?.(text);
  };

  return (
    <View className="flex-1">
      <TextInput
        value={searchText}
        onChangeText={handleChange}
        className="bg-listBarBackground text-listBarText text-base px-4 py-3 rounded-lg border border-gray-300 w-full"
        placeholder="Search here for learning topic easily ..."
        placeholderTextColor="#666"
      />
    </View>
  );
}
