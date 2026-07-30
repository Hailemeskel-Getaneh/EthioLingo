import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../components/CustomText';
import { useTheme } from '../contexts/ThemeContext';
import { CustomButton } from '../components/CustomButton';

export const SettingsScreen = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  return (
    <View style={styles.container}>
      <CustomText variant="title">Settings</CustomText>
      <CustomButton
        title={`Theme: ${isDarkMode ? 'Dark' : 'Light'}`}
        onPress={toggleTheme}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
