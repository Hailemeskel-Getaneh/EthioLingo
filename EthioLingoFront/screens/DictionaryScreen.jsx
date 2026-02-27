import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { CustomText } from '../components/CustomText';

export const DictionaryScreen = () => {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search Amharic dictionary..." />
      <CustomText variant="caption">Showing results for: {query}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
