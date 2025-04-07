import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/globalStyles';
import ListeningScreen from './ListeningScreen';
import SpeakingScreen from './SpeakingScreen';
import ReadingScreen from './ReadingScreen';
import WritingScreen from './WritingScreen';
import { getLessons } from '../../api/api';
import { getLessonsFromStorage, saveLessons } from '../../services/localStorageService';

const TopicScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { topic } = route.params || { topic: { title: 'Unknown Topic' } };
  const [activeTab, setActiveTab] = useState('listening');
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      setLoading(true);
      setError(null);
      try {
        let lessons = await getLessonsFromStorage();
        let lesson = lessons.find(l => l.lesson_name === topic.title);

        if (!lesson) {
          const response = await getLessons('Amharic', activeTab, topic.title);
          if (response.success && response.data.length > 0) {
            lessons = response.data;
            await saveLessons(lessons);
            lesson = lessons.find(l => l.lesson_name === topic.title);
          }
        }

        if (lesson) {
          const content = lesson.content[activeTab] || {};

          let normalizedData;
          switch (activeTab) {
            case 'listening':
              normalizedData = {
                title: lesson.lesson_name,
                audioFiles: content.audioFiles || []
              };
              break;
            case 'speaking':
              normalizedData = {
                title: lesson.lesson_name,
                speakingExercises: content.speakingExercises || []
              };
              break;
            case 'reading':
              normalizedData = {
                title: lesson.lesson_name,
                readingExercises: content.readingExercises || []
              };
              break;
            case 'writing':
              normalizedData = {
                title: lesson.lesson_name,
                writingExercises: content.writingExercises || []
              };
              break;
            default:
              normalizedData = {
                title: lesson.lesson_name,
                audioFiles: []
              };
          }

          setTopicData(normalizedData);
        } else {
          setTopicData({
            title: 'Topic Not Found',
            audioFiles: [],
            speakingExercises: [],
            readingExercises: [],
            writingExercises: []
          });
        }
      } catch (err) {
        console.error('Error fetching topic data:', err.message, err.response?.data);
        setError('Failed to load topic data: ' + err.message);
        setTopicData({
          title: 'Topic Not Found',
          audioFiles: [],
          speakingExercises: [],
          readingExercises: [],
          writingExercises: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [activeTab, topic.title]);

  const renderContent = () => {
    if (loading) {
      return <Text className="text-center text-lg">Loading...</Text>;
    }
    if (error) {
      return <Text className="text-center text-lg text-red-500">{error}</Text>;
    }
    switch (activeTab) {
      case 'listening':
        return <ListeningScreen topic={topic} data={topicData} />;
      case 'speaking':
        return <SpeakingScreen topic={topic} data={topicData} />;
      case 'reading':
        return <ReadingScreen topic={topic} data={topicData} />;
      case 'writing':
        return <WritingScreen topic={topic} data={topicData} />;
      default:
        return <ListeningScreen topic={topic} data={topicData} />;
    }
  };

  return (
    <View className="flex-1 bg-screenBackground">
      <View className="bg-primaryBackground p-4 pt-12 pb-6 flex-row items-center justify-between rounded-b-3xl">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={colors.primaryText} />
        </TouchableOpacity>
        <Text className="text-primaryText text-xl font-bold">{topic.title}</Text>
        <View className="w-7" />
      </View>

      <View className="flex-row justify-around p-2 bg-secondaryBackground rounded-b-2xl mb-4">
        {['listening', 'speaking', 'reading', 'writing'].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-primaryBackground' : 'bg-gray-300'}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text className={`text-base ${activeTab === tab ? 'text-screenBackground' : 'text-secondaryText'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-4 pb-4">{renderContent()}</ScrollView>
    </View>
  );
};

export default React.memo(TopicScreen);