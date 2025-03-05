import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';
import Buttons from '../../components/Common/Buttons'; // Updated to Buttons.jsx
import { Ionicons } from '@expo/vector-icons'; // For back arrow

const timeOptions = [
  { id: '1', minutes: 15, label: '15 min' },
  { id: '2', minutes: 30, label: '30 min' },
  { id: '3', minutes: 45, label: '45 min' },
  { id: '4', minutes: 60, label: '60 min' },
  { id: '5', minutes: 90, label: '90 min' },
  { id: '6', minutes: 120, label: '120 min' },
  { id: '7', minutes: 'other', label: 'Other' },
];

export default function SetGoalScreen({ navigation, route }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [otherTime, setOtherTime] = useState(''); // For custom time input
  const selectedLanguage = route.params?.selectedLanguage;
  const fadeAnim = new Animated.Value(0); // For animation

  // Filter time options to exclude 'Other' if custom time is entered
  const displayedTimeOptions = timeOptions.filter(item => item.minutes !== 'other' || !otherTime);

  // Animate fade-in for list
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderTimeOption = ({ item }) => {
    if (item.minutes === 'other') {
      return (
        <View style={styles.otherContainer}>
          <TextInput
            style={styles.otherInput}
            placeholder="Enter custom time (min)"
            placeholderTextColor="#666"
            value={otherTime}
            onChangeText={setOtherTime}
            keyboardType="numeric"
            accessibilityLabel="Enter custom learning time in minutes"
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityLabel={`Select ${item.label} learning time`}
        accessibilityRole="button"
        style={[
          styles.timeOption,
          selectedTime?.id === item.id && styles.selectedTime,
        ]}
        onPress={() => setSelectedTime(item)}
      >
        <Text style={styles.timeText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const handleGetStartedPress = () => {
    if (selectedTime || otherTime) {
      const finalTime = selectedTime?.minutes || (otherTime ? parseInt(otherTime, 10) : null);
      if (finalTime) {
        navigation.navigate('Home', { selectedTime: finalTime, selectedLanguage });
      }
    }
  };

  return (
    <View style={[styles.gradientBackground, { backgroundColor: colors.screenBackground }]}>
      <View style={globalStyles.screenContainer}>
        {/* Header with Back Arrow and Progress Bars */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LanguageSelectionScreen')}
            style={styles.backButton}
            accessibilityLabel="Go back to Language Selection"
          >
            <View style={styles.backButtonBackground}>
              <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
            </View>
          </TouchableOpacity>
          <View style={styles.progressBars}>
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>1</Text>
            </View>
            <View style={[styles.progressBar, styles.activeBar]}>
              <Text style={styles.progressBarText}>2</Text>
            </View>
          </View>
        </View>

        <Text style={[globalStyles.screenText, styles.headerText]}>
          Set your Daily Learning Goal
        </Text>
        <Text style={[globalStyles.screenText, styles.subText]}>
          Choose how much time you can dedicate to learning {selectedLanguage} each day.
        </Text>

        {/* Animated Time Options List */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={displayedTimeOptions}
            renderItem={renderTimeOption}
            keyExtractor={(item) => item.id}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No time options available</Text>}
          />
        </Animated.View>

        <Buttons
          title="Get Started"
          onPress={handleGetStartedPress}
          style={{ marginBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent', // No gradient, so transparent works with solid background
  },
  backButton: {
    padding: 5,
  },
  backButtonBackground: {
    backgroundColor: colors.listBarBackground, // #ffffff
    borderRadius: 20,
    padding: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  progressBar: {
    width: 40, // Increased width
    height: 10, // Increased height
    backgroundColor: '#ccc',
    borderRadius: 5, // Adjusted for larger size
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBar: {
    backgroundColor: colors.primaryBackground, // #313574
  },
  progressBarText: {
    fontSize: 12, // Adjusted for larger bars
    color: colors.primaryText, // #f0f2f5 for active, #666 for inactive
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  list: {
    marginHorizontal: 20,
    marginTop: 10,
    flexGrow: 0,
  },
  timeOption: {
    backgroundColor: colors.listBarBackground, // #ffffff
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedTime: {
    backgroundColor: colors.primaryBackground, // #313574
  },
  timeText: {
    fontSize: 16,
    color: colors.listBarText, // #131313
  },
  otherContainer: {
    backgroundColor: colors.listBarBackground, // #ffffff
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  otherInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.listBarBackground, // #ffffff
    color: colors.listBarText, // #131313
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});