import {
  GET_PUSH_NOTIFICATIONS,
  GET_PUSH_NOTIFICATIONS_FAILED,
  GET_PUSH_NOTIFICATIONS_SUCCESSFUL,
} from '../types/push_notification';

// get_push_notifications
export const getPushNotifications = (payload) => {
  return {
    type: GET_PUSH_NOTIFICATIONS,
    payload,
  };
};
export const getPushNotificationsSuccessful = (payload) => {
  return {
    type: GET_PUSH_NOTIFICATIONS_SUCCESSFUL,
    payload,
  };
};
export const getPushNotificationsFailed = (payload) => {
  return {
    type: GET_PUSH_NOTIFICATIONS_FAILED,
    payload,
  };
};
