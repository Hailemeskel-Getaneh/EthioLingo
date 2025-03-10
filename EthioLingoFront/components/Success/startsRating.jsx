import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarsRating = ({ rating }) => {
    return (
        <View className="flex-row mt-4">
            {[...Array(3)].map((_, index) => (
                <FontAwesome
                    key={index}
                    name="star"
                    size={30}
                    color={index < rating ? "#FFD700" : "#D3D3D3"}
                />
            ))}
        </View>
    );
};

export default StarsRating;
