import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/globalStyles';
import { formatDistanceToNow } from 'date-fns'; 
function Notification() {
  // Simulate notifications with a read/unread flag
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'Progress Update',
      message: 'You’ve earned 50 XP today! Keep going!',
      date: new Date(),
      read: false,
    },
    {
      id: 2,
      type: 'Last Practice',
      message: 'Your last practice was on 2025-04-08 17:00:00.',
      date: new Date(Date.now() - 86400000),
      read: true,
    },
    {
      id: 3,
      type: 'Subscription Update',
      message: 'Your subscription is active for the next 3 days.',
      date: new Date(Date.now() - 172800000), 
      read: false,
    },
  ]);


  const handleReadNotification = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mt-10 flex-row space-x-7 gap-10">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={colors.primaryBackground} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-primaryBackground">Notification</Text>
      </View>

      <ScrollView className="mt-6">
        {notifications.map((notif) => (
          <View
            key={notif.id}
            className={`p-4 mb-4 rounded-lg ${
              notif.read ? 'bg-gray-200' : 'bg-blue-100'
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
            <Text className="text-gray-600">{notif.message}</Text>
            <Text className="text-sm text-gray-500 mt-2">
              {formatDistanceToNow(new Date(notif.date))} ago
            </Text>

            {!notif.read && (
              <TouchableOpacity onPress={() => handleReadNotification(notif.id)}>
                <Text className="text-blue-500 mt-2">Mark as Read</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Notification;
