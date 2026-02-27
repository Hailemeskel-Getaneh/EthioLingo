import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../components/CustomText';
import { ProgressBar } from '../components/ProgressBar';

export const LessonScreen = () => {
  return (
    <View style={styles.container}>
      <ProgressBar progress={40} />
      <CustomText variant="title" style={{ marginTop: 20 }}>Lesson: Amharic Greetings</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
});
