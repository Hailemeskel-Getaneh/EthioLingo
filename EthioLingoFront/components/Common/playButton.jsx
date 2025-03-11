import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const PlayButton = ({ onPress,title }) => {
    return (
        <TouchableOpacity
            className="bg-primaryBackground px-8 py-3 rounded-full mt-6 items-center w-48"
            onPress={onPress}
        >
            <Text className="text-white font-bold text-lg">
            {title}
            </Text>
        </TouchableOpacity>
    );
};

export default PlayButton;
