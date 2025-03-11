import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

const DeleteAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleDeleteAccount = () => {
        if (password === "yourPassword") {  // Replace with real authentication logic
            console.log("Account Deleted");
            setIsOpen(false);
            setPassword("");
            setError("");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
        <View>
            <TouchableOpacity 
                onPress={() => setIsOpen(!isOpen)}
                className="flex-row justify-between items-center py-3 border-b"
            >
                <Text className="text-lg text-error font-bold">Delete Account</Text>
                <Text className="text-lg text-error">{isOpen ? "▴" : "▾"}</Text>
            </TouchableOpacity>

            {isOpen && (
                <View className="bg-homeBackground p-3 rounded-md">
                    <Text className="text-lg text-primaryText">
                        Enter your password to confirm account deletion.
                    </Text>
                    
                    <TextInput
                        secureTextEntry
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        className="bg-white p-2 rounded-md mt-3"
                    />

                    {error ? <Text className="text-error mt-2">{error}</Text> : null}

                    <View className="flex-row justify-between mt-4">
                      
                        <TouchableOpacity 
                            onPress={handleDeleteAccount} 
                            className="bg-error px-4 py-2 rounded-md"
                        >
                            <Text className="text-primaryText">Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DeleteAccount;
