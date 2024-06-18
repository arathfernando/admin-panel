import { uniqBy } from 'lodash';
import { getNotificationData } from '../../containers/navs/notification';
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

const INIT_STATE = {
  notifications: {
    loading: false,
    error: null,
    page: 1,
    data: [],
  },
  removeNotificationAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateNotificationSeenStatusAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  notificationDeleteAllAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  notificationMarkAllReadAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_notifications ------
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          data: action.payload?.page === 1 ? [] : state.notifications.data,
          loading: true,
          error: null,
        },
      };
    case GET_NOTIFICATIONS_SUCCESSFUL:
      return {
        ...state,
        notifications: {
          loading: false,
          error: null,
          ...action.payload,
          data: uniqBy(
            [
              ...state.notifications.data,
              ...(action.payload?.data?.map(
                (data) => getNotificationData(data)[data.type] || data
              ) || []),
            ],
            (id) => id
          ),
        },
      };
    case GET_NOTIFICATIONS_FAILED:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          ...action.payload,
          loading: false,
          data: [...state.notifications.data, ...(action.payload?.data || [])],
        },
      };
    case UPDATE_NOTIFICATION_STATE:
      // eslint-disable-next-line no-case-declarations
      const { payload } = action;
      if (payload.actionType === 'update_notification') {
        // copy existing state
        const newData = [...state.notifications.data];
        // find targeted index
        const targetedNtfIndx = state.notifications.data.findIndex(
          (data = {}) => data.id === payload.notificationId
        );
        if (targetedNtfIndx !== -1) {
          // update targeted state
          newData[targetedNtfIndx] = {
            ...newData[targetedNtfIndx],
            ...payload.data,
          };
          // set new state
          return {
            ...state,
            notifications: {
              ...state.notifications,
              data: newData,
            },
          };
        }
      } else if (payload.actionType === 'new_notification') {
        return {
          ...state,
          notifications: {
            ...state.notifications,
            data: uniqBy(
              [...(action.payload.data || []), ...state.notifications.data],
              (id) => id
            ),
          },
        };
      }
    // ------ remove_notification ------
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        removeNotificationAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case REMOVE_NOTIFICATION_SUCCESSFUL:
      return {
        ...state,
        removeNotificationAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case REMOVE_NOTIFICATION_FAILED:
      return {
        ...state,
        removeNotificationAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_notification_seen_status ------
    case UPDATE_NOTIFICATION_SEEN_STATUS:
      return {
        ...state,
        updateNotificationSeenStatusAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NOTIFICATION_SEEN_STATUS_SUCCESSFUL:
      return {
        ...state,
        updateNotificationSeenStatusAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_NOTIFICATION_SEEN_STATUS_FAILED:
      return {
        ...state,
        updateNotificationSeenStatusAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      }; // ------ notification_delete_all ------
    case NOTIFICATION_DELETE_ALL:
      return {
        ...state,
        notificationDeleteAllAction: {
          status: 'submitting',
          error: null,
          ...action.payload,
        },
        notifications: {
          loading: false,
          error: null,
          page: 1,
          data: [],
        },
      };
    case NOTIFICATION_DELETE_ALL_SUCCESSFUL:
      return {
        ...state,
        notificationDeleteAllAction: {
          status: 'submitted',
          error: null,
          ...action.payload,
        },
      };
    case NOTIFICATION_DELETE_ALL_FAILED:
      return {
        ...state,
        notificationDeleteAllAction: {
          status: 'failed',
          ...action.payload,
        },
      };
    // ------ notification_mark_all_read ------
    case NOTIFICATION_MARK_ALL_READ:
      return {
        ...state,
        notificationMarkAllReadAction: {
          status: 'submitting',
          error: null,
          ...action.payload,
        },
      };
    case NOTIFICATION_MARK_ALL_READ_SUCCESSFUL:
      return {
        ...state,
        notificationMarkAllReadAction: {
          status: 'submitted',
          error: null,
          ...action.payload,
        },
        notifications: {
          ...state.notifications,
          data:
            state.notifications.data?.map?.((data) => ({
              ...data,
              seen_unseen: 'SEEN',
            })) || [],
        },
      };
    case NOTIFICATION_MARK_ALL_READ_FAILED:
      return {
        ...state,
        notificationMarkAllReadAction: {
          status: 'failed',
          ...action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
