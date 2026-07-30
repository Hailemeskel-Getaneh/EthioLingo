import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../components/CustomText';
import { OptionCard } from '../components/OptionCard';

export const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText variant="subtitle">What is 'Hello' in Amharic?</CustomText>
      <OptionCard text="áˆ°áˆ‹áˆ (Selam)" isSelected={true} />
      <OptionCard text="áŠ áˆ˜áˆ°áŒáŠ“áˆˆáˆ (Ameseginalehu)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
