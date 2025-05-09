// /EthioLingoFront/screens/Lesson/LessonScreen.jsx
import React,{useState} from 'react';
import { View, StatusBar,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { colors, globalStyles } from '../../styles/globalStyles';
import LessonHeader from '../../components/Lesson/LessonHeader';
import LessonLearningTopics from '../../components/Lesson/LessonLearningTopics';
import LessonCountSentence from '../../components/Lesson/LessonCountSentence';
import LessonNavigationBar from '../../components/Lesson/LessonNavigationBar';

const learningTopics = [
  { id: '1', title: '1-Greetings', progress: 20 },
  { id: '2', title: '2-Emergency', progress: 50 },
  { id: '3', title: '3-Number', progress: 70 },
  { id: '4', title: '4-Family', progress: 15 },
  { id: '5', title: '5-Definite Article', progress: 60 },
  { id: '6', title: '6-Sentence & Months', progress: 30 },
  { id: '7', title: '7-Adjective', progress: 80 },
];

export default function LessonScreen() {
  const navigation = useNavigation();
  const [filteredTopics, setFilteredTopics] = useState(learningTopics);

  const handleSearch = (query) => {
    const filtered = learningTopics.filter((topic) =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTopics(filtered);
    
  };
  

  return (
    <View className="flex-1 bg-screenBackground">
      <StatusBar backgroundColor="#313574" />
      <View className="flex-1">
        <LessonHeader navigation={navigation} onSearch={handleSearch} />
        {filteredTopics.length === 0 ? (
          <Text className="text-center text-gray-500 mt-8 text-lg">
            No data available
          </Text>
        ) : (
          <LessonLearningTopics topics={filteredTopics} />
        )}
        <LessonCountSentence />
      </View>

      <LessonNavigationBar navigation={navigation} />
    </View>
  );
}