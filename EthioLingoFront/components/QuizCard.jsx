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
// QuizCard interactive UI variant 3
// QuizCard interactive UI variant 4
// QuizCard interactive UI variant 5
// QuizCard interactive UI variant 6
// QuizCard interactive UI variant 7
// QuizCard interactive UI variant 8
// QuizCard interactive UI variant 9
// QuizCard interactive UI variant 10
// QuizCard interactive UI variant 11
