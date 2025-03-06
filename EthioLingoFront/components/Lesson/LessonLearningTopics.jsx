// /EthioLingoFront/components/Lesson/LessonLearningTopics.jsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles } from '../../styles/globalStyles';
import * as Progress from 'react-native-progress';
import MyIcon from '../../assets/images/topicIcon.png';

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
        navigation.navigate('LessonScreen', { topic: item.title });
      }}
    >
      <Image
        source={MyIcon} 
        className="w-10 h-10 rounded-full mr-3 bg-accent4"
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
          textStyle={{ fontSize: 14, color: colors.listBarText}}
          formatText={() => `${item.progress}%`} 
        />
      </View>
    </TouchableOpacity>
  );
};

export default function LessonLearningTopics({ topics }) {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState(null); 

  return (
    <View className="flex-1 px-4 py-2">
      <View className="mb-4">
        <Text className="text-screenText text-lg font-semibold">
          Here users see various learning topics. After clicking here will start.
        </Text>
      </View>
      <FlatList
        data={topics}
        renderItem={(props) =>
          renderLearningTopic({ ...props, navigation, selectedTopic, setSelectedTopic })
        }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}