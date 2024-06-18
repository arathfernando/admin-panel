import {
  CREATE_NOTIFICATION,
  CREATE_NOTIFICATION_FAILED,
  CREATE_NOTIFICATION_SUCCESSFUL,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_FAILED,
  DELETE_NOTIFICATION_SUCCESSFUL,
  GET_NOTIFICATION,
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATION_SUCCESSFUL,
  UPDATE_NOTIFICATION,
  UPDATE_NOTIFICATION_FAILED,
  UPDATE_NOTIFICATION_SUCCESSFUL,
} from '../../types/managements/notification';

// get_notification
export const getNotifications = () => {
  return {
    type: GET_NOTIFICATION,
  };
};
export const getNotificationsSuccessful = (payload) => {
  return {
    type: GET_NOTIFICATION_SUCCESSFUL,
    payload,
  };
};
export const getNotificationsFailed = (payload) => {
  return {
    type: GET_NOTIFICATION_FAILED,
    payload,
  };
};

// create_notification
export const createNotification = (payload) => {
  return {
    type: CREATE_NOTIFICATION,
    payload,
  };
};
export const createNotificationSuccessful = (payload) => {
  return {
    type: CREATE_NOTIFICATION_SUCCESSFUL,
    payload,
  };
};
export const createNotificationFailed = (payload) => {
  return {
    type: CREATE_NOTIFICATION_FAILED,
    payload,
  };
};

// update_notification
export const updateNotification = (payload) => {
  return {
    type: UPDATE_NOTIFICATION,
    payload,
  };
};
export const updateNotificationSuccessful = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_SUCCESSFUL,
    payload,
  };
};
export const updateNotificationFailed = (payload) => {
  return {
    type: UPDATE_NOTIFICATION_FAILED,
    payload,
  };
};

// delete_notification
export const deleteNotification = (payload) => {
  return {
    type: DELETE_NOTIFICATION,
    payload,
  };
};
export const deleteNotificationSuccessful = (payload) => {
  return {
    type: DELETE_NOTIFICATION_SUCCESSFUL,
    payload,
  };
};
export const deleteNotificationFailed = (payload) => {
  return {
    type: DELETE_NOTIFICATION_FAILED,
    payload,
  };
};
