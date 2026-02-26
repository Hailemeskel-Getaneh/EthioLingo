import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

export const StatCard = ({ icon, title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  icon: { fontSize: 28, marginRight: 10 },
  value: { fontSize: 18, fontWeight: 'bold', color: Colors.textPrimary },
  title: { fontSize: 12, color: Colors.textSecondary },
});
