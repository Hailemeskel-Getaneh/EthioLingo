// /EthioLingoFront/components/Lesson/LessonLearningTopics.jsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../styles/globalStyles';
import * as Progress from 'react-native-progress';

// Import unique images for each topic
import NumberIcon from '../../assets/icons/LessonIcons/numberIcon.png';
import EmergencyIcon from '../../assets/icons/LessonIcons/emergencyIcon.png';
import GreetingsIcon from '../../assets/icons/LessonIcons/greetingsIcon.png';
import FamilyIcon from '../../assets/icons/LessonIcons/familyIcon.png';
import ArticleIcon from '../../assets/icons/LessonIcons/articleIcon.png';
import SentenceIcon from '../../assets/icons/LessonIcons/sentenceIcon.png';
import AdjectiveIcon from '../../assets/icons/LessonIcons/adjectiveIcon.png';

const topicImages = {
  '1-Greetings': GreetingsIcon,
  '2-Emergency': EmergencyIcon,
  '3-Number': NumberIcon,
  '4-Family': FamilyIcon,
  '5-Definite Article': ArticleIcon,
  '6-Sentence & Months': SentenceIcon,
  '7-Adjective': AdjectiveIcon,
};

const updatedTopics = (topics) => {
  if (!Array.isArray(topics)) {
    return []; 
  }
  
  return topics.map((topic) => ({
    ...topic,
    image: topicImages[topic.title] || NumberIcon,
  }));
};

const accentColors = [
  colors.accent1,
  colors.accent2,
  colors.accent3,
  colors.accent4,
  colors.accent5,
];

const getProgressColor = (index) => {
  return accentColors[index % accentColors.length];
};

const renderLearningTopic = ({ item, index, navigation, selectedTopic, setSelectedTopic }) => {
  const progressColor = getProgressColor(index);
  const isSelected = selectedTopic === item.id;

  return (
    <TouchableOpacity
      className={`bg-listBarBackground flex-row items-center p-4 rounded-lg mb-2.5 shadow-md elevation-2 ${
        isSelected ? 'border-2 border-primaryText bg-accent4' : ''
      }`}
      onPress={() => {
        setSelectedTopic(item.id); 
        navigation.navigate('TopicScreen', { topic: item });
      }}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.accent4 : colors.listBarBackground,
      })}
    >
      <Image
        source={item.image}
        className="w-14 h-14 mr-3 bg-sky-30"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="text-listBarText text-base font-bold">{item.title}</Text>
      </View>
      <View className="flex-row items-center">
        <Progress.Circle
          size={45}
          progress={item.progress / 100}
          showsText={true}
          color={progressColor}
          unfilledColor="#e0e0e0"
          borderWidth={0}
          thickness={3}
          textStyle={{ fontSize: 14, color: colors.listBarText }}
          formatText={() => `${item.progress}%`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function LessonLearningTopics({ topics }) {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Update topics with images, using empty array as fallback
  const topicsWithImages = updatedTopics(topics);

  return (
    <View className="flex-1 px-4 py-2">
      <View className="mb-4">
        <Text className="text-screenText text-lg font-semibold">
          Here users see various learning topics. After clicking here will start.
        </Text>
      </View>
      <FlatList
        data={topicsWithImages}
        renderItem={(props) =>
          renderLearningTopic({ ...props, navigation, selectedTopic, setSelectedTopic })
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}