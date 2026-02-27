import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HeaderTitle } from '../components/HeaderTitle';
import { StatCard } from '../components/StatCard';
import { Colors } from '../styles/colors';

export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <HeaderTitle title="EthioLingo" subtitle="Master Ethiopian Languages" />
      <View style={styles.statsRow}>
        <StatCard icon="ðŸ”¥" title="Streak" value="5 Days" />
        <StatCard icon="â­" title="XP" value="450" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.background },
  statsRow: { flexDirection: 'row', marginVertical: 12 },
});
