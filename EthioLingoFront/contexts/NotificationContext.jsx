// contexts/NotificationContext.js
import React, { createContext, useState, useEffect } from 'react';
import { isToday } from 'date-fns';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const generatedNotifications = [
      {
        id: 1,
        type: 'Progress Update',
        message: "You’ve earned 50 XP today! Keep going!",
        date: new Date(),
        read: false,
      },
      {
        id: 2,
        type: 'Last Practice',
        message: "Your last practice was on April 9th.",
        date: new Date(Date.now() - 86400000),
        read: true,
      },
      {
        id: 3,
        type: 'Subscription Update',
        message: "Your subscription is active for the next 30 days.",
        date: new Date(Date.now() - 172800000),
        read: false,
      },
    ];

    setNotifications(generatedNotifications);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadNotifications = notifications.filter(notif => !notif.read);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadNotifications,
      markNotificationAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
