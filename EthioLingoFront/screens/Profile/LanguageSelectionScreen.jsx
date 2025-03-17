import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert, Image } from 'react-native';
import { colors, globalStyles } from '../../styles/globalStyles';
import Buttons from '../../components/Common/Buttons';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { API_URL } from '@env';

export default function LanguageSelectionScreen({ navigation, route }) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/languages`); 

      const languagesData = response.data.map(language => ({
        ...language,
        id: language._id.toString(), 
        flag:  require('../../assets/images/ethiopia.jpg'), 
      }));
      setLanguages(languagesData); 
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch languages. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);
  
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLanguageItem = ({ item }) => (
   
    <TouchableOpacity
      accessibilityLabel={`Select ${item.name} language`}
      accessibilityRole="button"
      style={[styles.languageItem, selectedLanguage?.id === item.id && styles.selectedLanguage]}
      onPress={() => handleSelectLanguage(item)}
    >
       <View className="flex flex-row gap-5 items-center">
      <Image source={item.flag} style={styles.flagImage} />
      <Text style={styles.languageText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
    
  );

  const handleNextPress = () => {
    if (selectedLanguage) {
      navigation.navigate('SetGoalScreen', { selectedLanguage: selectedLanguage.name });
    } else {
      Alert.alert('Selection Required', 'Please select a language to proceed.');
    }
  };

  return (
    <View style={[styles.gradientBackground, { backgroundColor: colors.screenBackground }]}> 
      <View style={globalStyles.screenContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.backButton}>
            <View style={styles.backButtonBackground}>
              <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
            </View>
          </TouchableOpacity>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, styles.activeBar]} />
            <View style={styles.progressBar} />
          </View>
        </View>
        
        <Text style={styles.headerText}>Which language do you want to learn?</Text>
        <Text style={[globalStyles.screenText, styles.subText]}>Pick one local Ethiopian language that you'd like to learn.</Text>

        <Animatable.View animation="bounceIn" duration={1000} style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search languages..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </Animatable.View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primaryBackground} />
            <Text style={styles.loadingText}>Loading languages...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No languages found</Text>}
          />
        )}

        <View style={styles.buttonContainer}>
          <Buttons title="Next" onPress={handleNextPress} style={{ marginBottom: 20 }} />
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
  backButtonBackground: {
    backgroundColor: colors.listBarBackground,
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color:colors.primaryBackground
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
  },
  selectedLanguage: {
    backgroundColor: colors.homeBackground,
    borderWidth: 2,
    borderColor: colors.primaryText,
  },
  languageText: {
    fontSize: 16,
    fontWeight:"bold",
    color: colors.primaryBackground,
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
  flagImage:{
      width: 20, 
      height: 15, 
      marginRight: 10, 
  },
  buttonContainer: {
    padding: 20,
  },
});