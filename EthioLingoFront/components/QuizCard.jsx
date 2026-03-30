import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QuizCard = ({ question }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, backgroundColor: '#FAFAFA' },
  title: { fontSize: 18 }
});
// QuizCard interactive UI variant 1
// QuizCard interactive UI variant 2
