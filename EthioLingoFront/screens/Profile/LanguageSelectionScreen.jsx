import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Buttons from '../../components/Common/Buttons';
import { colors, globalStyles } from '../../styles/globalStyles';

const languages = [
  { id: '1', name: 'Amharic', flag: '🇪🇹' },
  { id: '2', name: 'Oromo', flag: '🇪🇹' },
  { id: '3', name: 'Tigrinya', flag: '🇪🇹' },
  { id: '4', name: 'Welayita', flag: '🇪🇹' },
  { id: '5', name: 'Guraghe', flag: '🇪🇹' },
];

export default function LanguageSelectionScreen({ navigation, route }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();
  // const settings = useSelector((state) => state.settings);

  useEffect(() => {
    console.log('LanguageSelectionScreen mounted, route params:', route.params);
    const timer = setTimeout(() => {
      console.log('Loading complete');
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredLanguages = languages.filter((language) => language.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      accessibilityLabel={`Select ${item.name} language`}
      accessibilityRole="button"
      accessibilityHint={`Select to learn ${item.name}`}
      style={[styles.languageItem, selectedLanguage?.id === item.id && styles.selectedLanguage]}
      onPress={() => setSelectedLanguage(item)}
    >
      <View style={styles.languageContainer}>
        <Text style={styles.languageText}>
          {item.flag}
          {' '}
          {item.name}
        </Text>
        <View style={styles.radioButtonContainer}>
          <View
            style={[
              styles.radioButton,
              selectedLanguage?.id === item.id && styles.radioButtonSelected,
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleNextPress = () => {
    if (!selectedLanguage) {
      Alert.alert('Select a Language', 'Please choose a language before proceeding.');
      return;
    }
    navigation.navigate('SetGoalScreen', { selectedLanguage: selectedLanguage.name });
  };

  return (
    <View style={[styles.gradientBackground, { backgroundColor: colors.screenBackground }]}>
      <View style={globalStyles.screenContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.backButton}
          >
            <View style={styles.backButtonBackground}>
              <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
            </View>
          </TouchableOpacity>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, styles.activeBar]} />
            <View style={styles.progressBar} />
          </View>
        </View>

        <Text style={[styles.headerText]}>
          Which language do you want to learn?
        </Text>
        <Text style={[globalStyles.screenText, styles.subText]}>
          Pick one local Ethiopian language that you'd like to learn.
        </Text>

        <Animatable.View animation="bounceIn" duration={1000} style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchQuery('')}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </Animatable.View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading languages...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No languages found</Text>}
          />
        )}
        <View style={styles.buttonContainer}>
          <Buttons
            title="Next"
            onPress={handleNextPress}
            style={{ marginBottom: 20 }}
          />
        </View>

      </View>
    </View>
  );
}

// Styles unchanged
const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: { padding: 5 },
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
  activeBar: { backgroundColor: colors.primaryBackground },
  searchContainer: { marginHorizontal: 20, marginBottom: 10 },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.listBarBackground,
    color: colors.listBarText,
    fontSize: 16,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: colors.primaryBackground,
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
    marginTop: 0,
    flexGrow: 0,
  },
  languageItem: {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  languageText: {
    fontSize: 16,
    color: colors.listBarText,
    flex: 1, 
    
  },
  radioButtonContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: colors.primaryText,
  },
  selectedLanguage: {
    backgroundColor: colors.homeBackground,
    borderWidth: 2,
    borderColor: colors.primaryText,
  },
  
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',

  },
  buttonContainer: {
    padding: 20,
  },
});
