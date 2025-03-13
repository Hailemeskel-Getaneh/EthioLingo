import React from 'react';
import { View, Text } from 'react-native';

const ScoreBox = ({ label, value }) => {
    return (
        <View className="bg-homeBackground rounded-lg p-4 w-27 items-center">
            <Text className="text-white font-bold">{label}</Text>
            <Text className="bg-white px-3 py-1 rounded-md mt-2 text-black font-semibold">
                {value}
            </Text>
        </View>
    );
};

export default ScoreBox;
