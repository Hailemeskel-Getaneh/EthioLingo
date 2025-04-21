import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState,useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { isToday } from 'date-fns';
import { colors } from '../../styles/globalStyles';
import NotificationCard from '../../components/Common/NotificationCard';
import { useNavigation } from '@react-navigation/native';
import { NotificationContext } from '../../contexts/NotificationContext';

function Notification() {
  const navigation = useNavigation();
  const { notifications, markNotificationAsRead } = useContext(NotificationContext);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    
  }, []);

 

  const handleReadNotification = (id) => {
    markNotificationAsRead(id);
  };
  

  const filteredNotifications = notifications.filter((notif) =>
    filter === 'unread' ? !notif.read : true
  );

  const todayNotifications = filteredNotifications.filter((notif) =>
    isToday(new Date(notif.date))
  );
  const earlierNotifications = filteredNotifications.filter(
    (notif) => !isToday(new Date(notif.date))
  );

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.primaryBackground}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-primaryBackground">
          Notification
        </Text>
      </View>

      <View className="flex-row mt-4 mb-4 space-x-4">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full  ${filter === 'all' ? 'bg-primaryBackground' : 'bg-gray-200'}`}
          onPress={() => setFilter('all')}
        >
          <Text className={`${filter === 'all' ? 'text-white' : 'text-black'} font-medium`}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${filter === 'unread' ? 'bg-primaryBackground' : 'bg-gray-200'}`}
          onPress={() => setFilter('unread')}
        >
          <Text className={`${filter === 'unread' ? 'text-white' : 'text-black'} font-medium`}>
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <ScrollView>
  {filter === 'unread' && todayNotifications.length === 0 && earlierNotifications.length === 0 && (
    <Text className="text-center text-gray-500 mt-10">No unread messages.</Text>
  )}

  {todayNotifications.length > 0 && (
    <View className="mb-6">
      <Text className="text-lg font-semibold mb-2 text-primaryBackground">Today</Text>
      {todayNotifications.map((notif) => (
        <View key={notif.id} className="relative">
          <NotificationCard
            notif={notif}
            onMarkRead={handleReadNotification}
          />
        </View>
      ))}
    </View>
  )}

  {earlierNotifications.length > 0 && (
    <View>
      <Text className="text-lg font-semibold mb-2 text-primaryBackground">Earlier</Text>
      {earlierNotifications.map((notif) => (
        <View key={notif.id} className="relative">
          <NotificationCard
            notif={notif}
            onMarkRead={handleReadNotification}
          />
        </View>
      ))}
    </View>
  )}
</ScrollView>
    </View>
  );
}

export default Notification;
