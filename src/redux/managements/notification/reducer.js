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

const INIT_STATE = {
  notifications: {
    loading: false,
    error: null,
    data: [],
  },
  createNotificationAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateNotificationAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteNotificationAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    //------ get_notification ------
    case GET_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          loading: true,
          error: null,
        },
      };
    case GET_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        notifications: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_NOTIFICATION_FAILED:
      return {
        ...state,
        notifications: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    //------ create_notification ------
    case CREATE_NOTIFICATION:
      return {
        ...state,
        createNotificationAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        createNotificationAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_NOTIFICATION_FAILED:
      return {
        ...state,
        createNotificationAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ update_notification ------
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        updateNotificationAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        updateNotificationAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NOTIFICATION_FAILED:
      return {
        ...state,
        updateNotificationAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    //------ delete_notification ------
    case DELETE_NOTIFICATION:
      return {
        ...state,
        deleteNotificationAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        deleteNotificationAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_NOTIFICATION_FAILED:
      return {
        ...state,
        deleteNotificationAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
