import {
  GET_PUSH_NOTIFICATIONS,
  GET_PUSH_NOTIFICATIONS_FAILED,
  GET_PUSH_NOTIFICATIONS_SUCCESSFUL,
} from '../types/push_notification';

const INIT_STATE = {
  pushNotifications: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PUSH_NOTIFICATIONS:
      return {
        ...state,
        pushNotifications: {
          ...state.pushNotifications,
          loading: true,
          error: null,
        },
      };
    case GET_PUSH_NOTIFICATIONS_SUCCESSFUL:
      return {
        ...state,
        pushNotifications: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PUSH_NOTIFICATIONS_FAILED:
      return {
        ...state,
        pushNotifications: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
