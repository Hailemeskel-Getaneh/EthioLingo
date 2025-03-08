// /EthioLingoFront/screens/Lesson/LessonScreen.jsx
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../styles/globalStyles';
import LessonHeader from '../../components/Lesson/LessonHeader';
import LessonLearningTopics from '../../components/Lesson/LessonLearningTopics';
import LessonCountSentence from '../../components/Lesson/LessonCountSentence';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';

const learningTopics = [
  { id: '1', title: '1-Greetings', progress: 20 },
  { id: '2', title: '2-Emergency', progress: 50 },
  { id: '3', title: '3-Number', progress: 70 },
  { id: '4', title: '4-Family', progress: 15 },
  { id: '5', title: '5-Definite article', progress: 60 },
  { id: '6', title: '6-Sentence & Months', progress: 30 },
  { id: '7', title: '7-Adjective', progress: 80 },
];

export default function LessonScreen() {
  const navigation = useNavigation();
  console.log('Navigation in LessonScreen:', navigation); 

  return (
    <View className="flex-1 bg-screenBackground">

      <View className="flex-1">
        <LessonHeader navigation={navigation} />
        <LessonLearningTopics topics={learningTopics} />
        <LessonCountSentence />
      </View>

      <LessonNavigationBar navigation={navigation} />
    </View>
  );
}