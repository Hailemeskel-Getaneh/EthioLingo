import React, { useState } from "react";
import { Text, View, Switch,TouchableOpacity} from "react-native";
import FontSize from "../../components/Common/FontSize";
import DeleteAccount from "../Auth/DeleteAccount";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

const SettingScreen = () => {
  const navigation=useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <View className="flex-1 bg-white p-6">
          <View className="flex-row items-center  justify-between mt-6 ">
            <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
           <View className="flex-row items-center ">
          <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
         
          <Text className="text-xl font-bold text-primaryBackground ml-2">Back</Text>
          </View>
        </TouchableOpacity>
            <Text className="text-xl font-bold  mb-4 text-primaryBackground">Settings</Text>
            </View>
            <View className="flex-row justify-between items-center py-3 border-b ">
                <Text className="text-xl text-primaryBackground font-bold">Dark Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={(value) => setIsDarkMode(value)}
                />
            </View>

            <FontSize className="text-xl" />

         
            <DeleteAccount className="text-xl" />
        </View>
    );
};

export default SettingScreen;
