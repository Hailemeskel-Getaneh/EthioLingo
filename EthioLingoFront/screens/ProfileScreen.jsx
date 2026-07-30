import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from '../components/Avatar';
import { CustomText } from '../components/CustomText';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Avatar name="Hailemeskel" size={70} />
      <CustomText variant="title" style={{ marginTop: 12 }}>Hailemeskel Getaneh</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
});
