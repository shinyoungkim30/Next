import { createContext } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

export default NotificationContext;
