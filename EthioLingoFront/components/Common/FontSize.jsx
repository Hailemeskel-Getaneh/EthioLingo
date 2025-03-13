import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

const FontSize = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize, setFontSize] = useState("Medium");

    return (
        <View>
            <TouchableOpacity 
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row justify-between items-center py-3 border-b"
            >
                <Text className="text-xl font-bold text-primaryBackground ">Font Size</Text>
                <Text className="text-xl ">{isOpen ? "▴" : "▾"}</Text>
            </TouchableOpacity>

            {isOpen && (
                <View className="bg-homeBackground p-3 rounded-md text-primaryText">
                    {["Small", "Medium", "Large"].map((size) => (
                        <TouchableOpacity
                            key={size}
                            onPress={() => {
                                setFontSize(size);
                                setIsOpen(false);
                            }}
                            className="p-2 text-primaryText"
                        >
                            <Text className={`text-lg ${fontSize === size ? "font-bold" : "" }`}>{size}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default FontSize;
