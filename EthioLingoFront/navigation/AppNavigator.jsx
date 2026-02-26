import React from 'react';
import { View } from 'react-native';
import { TabNavigator } from './TabNavigator';

export const AppNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <TabNavigator />
    </View>
  );
};
