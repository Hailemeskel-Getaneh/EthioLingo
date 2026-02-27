import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../components/CustomText';

export const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText variant="title">Global Leaderboard</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
