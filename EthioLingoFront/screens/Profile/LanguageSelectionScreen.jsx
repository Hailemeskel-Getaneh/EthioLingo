import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';
import Buttons from '../../components/Common/Buttons'; // Updated to Buttons.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'; // For back arrow and search icon
import { setSelectedLanguage } from '../../store/settingsSlice';

const languages = [
  { id: '1', name: 'Amharic', flag: '🇪🇹' },
  { id: '2', name: 'Oromo', flag: '🇪🇹' },
  { id: '3', name: 'Tigrinya', flag: '🇪🇹' },
];

export default function LanguageSelectionScreen({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const fadeAnim = new Animated.Value(0);

  // Filter languages based on search query (case-insensitive)
  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animate fade-in for list
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      accessibilityLabel={`Select ${item.name}`}
      accessibilityRole="button"
      style={[
        styles.languageItem,
        selectedLanguage?.id === item.id && styles.selectedLanguage,
      ]}
      onPress={() => setSelectedLanguage(item)}
    >
      <Text style={styles.languageText}>
        {item.flag} {item.name}
      </Text>
    </TouchableOpacity>
  );

  const handleNextPress = () => {
    if (selectedLanguage) {
      dispatch({ type: 'settings/setSelectedLanguage', payload: selectedLanguage.name }); // Hardcode the action
      console.log('After dispatch - Redux state:', settings);
      navigation.navigate('SetGoalScreen', { selectedLanguage: selectedLanguage.name });
    } else {
      console.log('No language selected');
    }
  };

  return (
    <View style={[styles.gradientBackground, { backgroundColor: colors.screenBackground }]}>
      <View style={globalStyles.screenContainer}>
        {/* Header with Back Arrow and Progress Bars */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.backButton}
            accessibilityLabel="Go back to Welcome Screen"
          >
            <View style={styles.backButtonBackground}>
              <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
            </View>
          </TouchableOpacity>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, styles.activeBar]}>
              <Text style={styles.progressBarText}>1</Text>
            </View>
            <View style={styles.progressBar}>
              <Text style={styles.progressBarText}>2</Text>
            </View>
          </View>
        </View>

        <Text style={[globalStyles.screenText, styles.headerText]}>
          Which language do you want to learn?
        </Text>
        <Text style={[globalStyles.screenText, styles.subText]}>
          Pick one local Ethiopian language that you'd like to learn.
        </Text>

        {/* Search Input (Moved directly above the language list) */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search languages..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Search for a language"
          clearButtonMode="while-editing"
        />

        {/* Animated Language List */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={filteredLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No languages found</Text>}
          />
        </Animated.View>

        <Buttons
          title="Next"
          onPress={handleNextPress}
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
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.listBarBackground, // #ffffff
    color: colors.listBarText, // #131313
    fontSize: 16,
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
    marginTop: 0, // Adjusted to remove space after search
    flexGrow: 0,
  },
  languageItem: {
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
  selectedLanguage: {
    backgroundColor: colors.primaryBackground, // #313574
  },
  languageText: {
    fontSize: 16,
    color: colors.listBarText, // #131313
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});