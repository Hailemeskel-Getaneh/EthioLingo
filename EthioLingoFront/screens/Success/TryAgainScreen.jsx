import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScoreBox from '../../components/Success/scoreBox';
import StarsRating from '../../components/Success/startsRating';
import PlayButton from '../../components/Common/playButton';

const ExcellentScreen = ({ route }) => {
    const navigation = useNavigation();
    
    // Ensure route.params exists before destructuring
    const { lessonTopic = "Greeting", score = 0, accuracy = 0, stars = 0 } = route.params || {};

    return (
        <View className="flex-1 bg-white mt-12 p-6">
            <View className="bg-primaryBackground w-full py-3 flex-row justify-between px-4 items-center rounded-lg">
                <Text className="text-white font-bold text-lg">Level 1</Text>
                <Text className="text-white">❤️ 5</Text>
            </View>
          <View className="items-center justify-center p-8">
            <Text className="text-homeBackground text-2xl font-bold mt-4">oops!</Text>
            <Image
                source={require('../../assets/images/sadEmoji.png')}
                className="w-32 h-32 mt-6"
                resizeMode="contain"
            />

            
            <Text className="text-xl font-bold text-primaryBackground mt-4">{lessonTopic}</Text>
            <Text className="text-screenText1 mt-4">Speaking</Text>
            <Text className="text-screenText1 mt-4">Level faild!</Text>

            <StarsRating rating={stars} />

            <View className="flex-row gap-8 mt-8 ">
                <ScoreBox label="Score" value={`${score}/10`} />
                <ScoreBox label="Accuracy" value={`${accuracy}%`} />
            </View>

            <View  className="mt-8" >
            <PlayButton
            title="🔄 Retry"
            onPress={() => navigation.navigate('ExcellentScreen')} />
            </View>
            
            </View>
        </View>
    );
};

export default ExcellentScreen;
