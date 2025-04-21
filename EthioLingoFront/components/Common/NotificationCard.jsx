import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/globalStyles';

const NotificationCard = ({ notif, onMarkRead }) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate('NotificationDetail', { notif });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <View
        className={`p-4 mb-4 rounded-lg ${
          notif.read ? 'bg-homeBackground' : 'bg-[#a27fe2]'
        }`}
      >
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-lg">{notif.type}</Text>
          {!notif.read && (
            <Ionicons
              name="ellipse"
              size={10}
              color={colors.primaryBackground}
              className="mr-2"
            />
          )}
        </View>

        <Text className="text-white">{notif.message}</Text>

        <Text className="text-sm text-white mt-2">
          {formatDistanceToNow(new Date(notif.date))} ago
        </Text>
        {!notif.read && (
          <TouchableOpacity onPress={() => onMarkRead(notif.id)}>
            <Text className="text-white mt-2">Mark as Read</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
