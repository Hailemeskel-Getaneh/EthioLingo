import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../styles/globalStyles';

const { width } = Dimensions.get('window');

export default function LessonNavigationBar() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={[styles.navItem, isActive('HomeScreen') && styles.activeItem]}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home"
          size={24}
          color={isActive('HomeScreen') ? colors.homeBackground : colors.primaryText}
        />
        <Text style={[styles.label, { color: isActive('HomeScreen') ? colors.homeBackground : colors.primaryText }]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Lesson Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('LessonScreen')}
        style={[styles.navItem, isActive('LessonScreen') && styles.activeItem]}
        activeOpacity={0.7}
      >
        <Ionicons
          name="book"
          size={24}
          color={isActive('LessonScreen') ? colors.homeBackground : colors.primaryText}
        />
        <Text style={[styles.label, { color: isActive('LessonScreen') ? colors.homeBackground : colors.primaryText }]}>
          Lessons
        </Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfileScreen')}
        style={[styles.navItem, isActive('UserProfileScreen') && styles.activeItem]}
        activeOpacity={0.7}
      >
        <Ionicons
          name="person"
          size={24}
          color={isActive('UserProfileScreen') ? colors.homeBackground : colors.primaryText}
        />
        <Text style={[styles.label, { color: isActive('UserProfileScreen') ? colors.homeBackground : colors.primaryText }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,  // Adjusted padding for a smaller nav bar
    backgroundColor: colors.primaryBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 8, 
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
