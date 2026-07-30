import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const BadgeIcon = ({ icon = 'ðŸ†', label, count }) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.icon}>{icon}</Text>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      {count !== undefined ? <Text style={styles.count}>{count}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    justify: 'center',
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  icon: { fontSize: 24 },
  label: { fontSize: 12, color: Colors.textSecondary, marginTop: 4 },
  count: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },
});
