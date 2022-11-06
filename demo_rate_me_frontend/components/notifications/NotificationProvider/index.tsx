import React, { createContext, useState } from "react";
import Notification from "../Notification";
import {
  INotification,
  NotificationType,
} from "../../../shared/interfaces/notification.interface";
import styles from "./notification_provider.module.scss";
import { useTransition } from "react-spring";
export const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const notify = (type: NotificationType, message: string) => {
    const newNotification: INotification = {
      type,
      message,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleOnNotificationAccept = (notificationIndex: number) => {
    const filteredNotifications = notifications.filter(
      (undefined, index) => index !== notificationIndex
    );
    setNotifications(filteredNotifications);
  };
  return (
    <NotificationContext.Provider value={notify}>
      <div className={styles.notifications_container}>
        {notifications.map((notification: INotification, index) => (
          <Notification
            index={index}
            key={index}
            {...notification}
            onAccept={() => handleOnNotificationAccept(index)}
          />
        ))}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
