/* eslint-disable no-unused-expressions */
import logoSvg from '../assets/svg/logo-sm.svg';

navigator.serviceWorker?.register?.('/sw.js');

export const notify = (title, options = {}) => {
  try {
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification(title, {
            icon: logoSvg,
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            ...options,
          });
        });
      }
    });
  } catch (error) {}
};
