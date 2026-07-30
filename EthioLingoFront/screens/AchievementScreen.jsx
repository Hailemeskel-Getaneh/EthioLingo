import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../components/CustomText';
import { BadgeIcon } from '../components/BadgeIcon';

export const AchievementScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText variant="title">Your Achievements</CustomText>
      <View style={styles.grid}>
        <BadgeIcon icon="ðŸ”¥" label="7 Day Streak" />
        <BadgeIcon icon="ðŸŽ“" label="First Quiz" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  grid: { flexDirection: 'row', gap: 12, marginTop: 16 },
});
