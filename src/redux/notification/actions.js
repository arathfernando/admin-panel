import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAILED,
  GET_NOTIFICATIONS_SUCCESSFUL,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_DELETE_ALL_FAILED,
  NOTIFICATION_DELETE_ALL_SUCCESSFUL,
  NOTIFICATION_MARK_ALL_READ,
  NOTIFICATION_MARK_ALL_READ_FAILED,
  NOTIFICATION_MARK_ALL_READ_SUCCESSFUL,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_FAILED,
  REMOVE_NOTIFICATION_SUCCESSFUL,
  UPDATE_NOTIFICATION_SEEN_STATUS,
  UPDATE_NOTIFICATION_SEEN_STATUS_FAILED,
  UPDATE_NOTIFICATION_SEEN_STATUS_SUCCESSFUL,
  UPDATE_NOTIFICATION_STATE,
} from '../types/notification';

// get_notifications
export const getAdminNotifications = (payload) => {
  return {
    type: GET_NOTIFICATIONS,
    payload,
  };
};
export const getAdminNotificationsSuccessful = (payload) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESSFUL,
    payload,
  };
};
export const getAdminNotificationsFailed = (payload) => {
  return {
    type: GET_NOTIFICATIONS_FAILED,
    payload,
  };
};
export const updateNotificationState = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_STATE,
    payload,
  };
};

// remove_notification
export const removeNotification = (payload) => {
  return {
    type: REMOVE_NOTIFICATION,
    payload,
  };
};
export const removeNotificationSuccessful = (payload) => {
  return {
    type: REMOVE_NOTIFICATION_SUCCESSFUL,
    payload,
  };
};
export const removeNotificationFailed = (payload) => {
  return {
    type: REMOVE_NOTIFICATION_FAILED,
    payload,
  };
};

// update_notification_seen_status
export const updateNotificationSeenStatus = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_SEEN_STATUS,
    payload,
  };
};
export const updateNotificationSeenStatusSuccessful = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_SEEN_STATUS_SUCCESSFUL,
    payload,
  };
};
export const updateNotificationSeenStatusFailed = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_SEEN_STATUS_FAILED,
    payload,
  };
};
// notification_delete_all
export const notificationDeleteAll = () => {
  return {
    type: NOTIFICATION_DELETE_ALL,
  };
};
export const notificationDeleteAllSuccessful = (payload) => {
  return {
    type: NOTIFICATION_DELETE_ALL_SUCCESSFUL,
    payload,
  };
};
export const notificationDeleteAllFailed = (payload) => {
  return {
    type: NOTIFICATION_DELETE_ALL_FAILED,
    payload,
  };
};

// notification_mark_all_read
export const notificationMarkAllRead = () => {
  return {
    type: NOTIFICATION_MARK_ALL_READ,
  };
};
export const notificationMarkAllReadSuccessful = (payload) => {
  return {
    type: NOTIFICATION_MARK_ALL_READ_SUCCESSFUL,
    payload,
  };
};
export const notificationMarkAllReadFailed = (payload) => {
  return {
    type: NOTIFICATION_MARK_ALL_READ_FAILED,
    payload,
  };
};
