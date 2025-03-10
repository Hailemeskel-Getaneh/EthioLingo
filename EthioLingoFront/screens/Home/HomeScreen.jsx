import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { ProgressBar } from '../../components/Progress/ProgressBar';


const ProgressCard = ({ title, percentage, icon }) => (
  <View className="bg-white p-4 rounded-xl" style={styles.cardShadow}>
    <Image source={icon}
      className="w-20 h-20 mb-2"
      style={{width:"90",height:"80"}}
      resizeMode="contain" />

    <Text className="text-gray-800 font-medium mb-1">{title}</Text>
    <View className="w-full bg-gray-200 rounded-full h-1.5 mb-1 ">
      <ProgressBar percentage={percentage} color={"#8257fe"}/>
    </View>
    <Text className="text-gray-600 text-sm">{percentage}%</Text>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Amharic');

  const languages = [
    { name: 'Amharic', flag: '🇪🇹' },
    { name: 'Tigrinya', flag: '🇪🇷' },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: '#f3f4ff' }}>
      <StatusBar backgroundColor="#313574" />
      <View style={{ backgroundColor: '#313574', height:'20%', borderBottomRightRadius:125 }} className="rounded-br-8xl p-6 pb-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/icons/woman.png')}
              className="w-12 h-12 rounded-full bg-white border-2 border-white"
            />
            <View className="ml-3">
              <Text className="text-white text-lg font-bold">Hello!</Text>
              <Text className="text-white">Bhavithra</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-white mr-2">5</Text>
            <Image 
              source={require('../../assets/icons/heart.png')} 
              className="w-6 h-6 mr-2"
            />
            <Image 
              source={require('../../assets/icons/notification.png')} 
              className="w-6 h-6 ml-2"
            />
          </View>
          
        </View>

        {/* Language Selection */}
        <View>
          <TouchableOpacity 
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{alignSelf: "center"}}
            className="bg-white/20 mt-6 p-3 rounded-xl flex-row items-center">
            <Text className="text-white">Learning {selectedLanguage} {languages.find(l => l.name === selectedLanguage)?.flag}</Text>
            <Text className="text-white ml-2">{isDropdownOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {isDropdownOpen && (
            <View className="absolute top-16 w-48 bg-white rounded-xl shadow-lg z-50 self-center">
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.name}
                  className="p-3 border-b border-gray-100"
                  onPress={() => {
                    setSelectedLanguage(language.name);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text className="text-gray-800">{language.name} {language.flag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
  
      </View>
      
      {/* Learning Card */}
      <View className="mx-4 mt-4 bg-[#8257fe] p-4 rounded-xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-sm font-sm mb-1">Let's start learning Amharic</Text>
            <Text className="text-white text-lg mb-2 font-normal">Chapter 3</Text>
            <Text className="text-white/70 text-base">More essential phrases</Text>
            <View style={{width:"90%"}} className="w-[85%] bg-gray-200/50 rounded-full h-1.5 mb-1 mt-3">
              
              
            </View>
            <Text className="text-white/50 text-xs mt-1">Last practiced 3 days ago</Text>
            <TouchableOpacity className="bg-white/20 mt-3 py-2 px-4 rounded-lg self-start" onPress={() => navigation.navigate('Lessons')}>
              <Text className="text-white">Continue</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../../assets/icons/reading-book.png')} 
            // className="w-20 h-20"
            style={{width:"100",height:"100"}}
          />
        </View>
      </View>

      {/* Progress Section */}
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">My Progress</Text>
        <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
            <ProgressCard 
              title="Reading" 
              percentage={60} 
              icon={require('../../assets/icons/reading-book.png')} 
            />
          </View>
          <View style={styles.gridItem}>
            <ProgressCard 
              title="Listening" 
              percentage={90} 
              icon={require('../../assets/icons/listening.png')} 
            />
          </View>
          <View style={styles.gridItem}>
            <ProgressCard 
              title="Speaking" 
              percentage={20} 
              icon={require('../../assets/icons/speaking.png')} 
            />
          </View>
          
         
          <View style={styles.gridItem}>
            <ProgressCard 
              title="Writing" 
              percentage={40} 
              icon={require('../../assets/icons/writing.png')} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  navbar: {
      height:"50%"
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  gridItem: {
    width: '50%',
    padding: 10, 
  }
})