import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  Alert 
} from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';
import Buttons from '../../components/Common/Buttons';
import { Ionicons } from '@expo/vector-icons';
import {setLanguageandTime}  from '../../utils/requests/api'

const timeOptions = [
  { id: '1', minutes: 15, label: '15 min' },
  { id: '2', minutes: 30, label: '30 min' },
  { id: '3', minutes: 45, label: '45 min' },
  { id: '4', minutes: 60, label: '60 min' },
  { id: '5', minutes: 90, label: '90 min' },
  { id: '6', minutes: 120, label: '120 min' },
];

export default function SetGoalScreen({ navigation, route }) {
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedLanguage = route.params?.selectedLanguage; // Receive the language from the previous screen

  const renderTimeOption = ({ item }) => (
    <TouchableOpacity
      style={[styles.timeOption, selectedTime?.id === item.id && styles.selectedTime]}
      onPress={() => setSelectedTime(item)}
    >
      <Text style={styles.timeText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleGetStartedPress = () => {
    if (!selectedTime) {
      Alert.alert("Select a Goal", "Please choose a daily learning goal before proceeding.");
      return;
    }
    setLanguageandTime(selectedLanguage, selectedTime, navigation);
    // Here you could save the goal and selected language to local storage, Redux, or send it to your backend.
    Alert.alert('Goal Set', `You will learn ${selectedLanguage} for ${selectedTime.label} daily!`);
    navigation.navigate('HomeScreen', { selectedTime: selectedTime.minutes, selectedLanguage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
        </TouchableOpacity>
      </View>

      <Text style={[globalStyles.screenText, styles.headerText]}>Set your Daily Learning Goal</Text>
      <Text style={[globalStyles.screenText, styles.subText]}>
        Choose how much time you can dedicate to learning {selectedLanguage} each day.
      </Text>

      <FlatList
        data={timeOptions}
        renderItem={renderTimeOption}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      
      <View style={styles.buttonContainer}>
        <Buttons title="Get Started" onPress={handleGetStartedPress} />
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
    padding: 30,
    backgroundColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
    marginTop:20,
  },
  progressBars: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  progressBar: {
    width: 80,
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 7.5,
  },
  activeBar: {
    backgroundColor: colors.primaryBackground,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
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
    backgroundColor: colors.listBarBackground,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedTime: {
    backgroundColor: colors.homeBackground,
    borderWidth: 2,
    borderColor: colors.primaryText,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  timeText: {
    fontSize: 16,
    color: colors.listBarText,
  },
  otherContainer: {
    backgroundColor: colors.listBarBackground,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
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
    backgroundColor: colors.listBarBackground,
    color: colors.listBarText,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  buttonContainer: {
    padding: 20,
  },
});
