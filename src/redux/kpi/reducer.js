import {
  GET_ACTIVE_USERS,
  GET_ACTIVE_USERS_FAILED,
  GET_ACTIVE_USERS_SUCCESSFUL,
  GET_REGISTARED_USER_COUNT,
  GET_REGISTARED_USER_COUNT_FAILED,
  GET_REGISTARED_USER_COUNT_SUCCESSFUL,
  GET_REGISTERED_USERS,
  GET_REGISTERED_USERS_FAILED,
  GET_REGISTERED_USERS_SUCCESSFUL,
  GET_UNREGISTARED_USERS,
  GET_UNREGISTARED_USERS_FAILED,
  GET_UNREGISTARED_USERS_SUCCESSFUL,
  GET_USER_ACTIVITY,
  GET_USER_ACTIVITY_FAILED,
  GET_USER_ACTIVITY_SUCCESSFUL,
  GET_USER_COUNT_CHART,
  GET_USER_COUNT_CHART_FAILED,
  GET_USER_COUNT_CHART_SUCCESSFUL,
  GET_VIEW_ALL_USERS,
  GET_VIEW_ALL_USERS_FAILED,
  GET_VIEW_ALL_USERS_SUCCESSFUL,
} from '../types/kpi';

const INIT_STATE = {
  registaredUserCount: {
    loading: false,
    error: null,
    data: {},
  },
  userCountChart: {
    loading: false,
    error: null,
    data: [],
  },
  viewAllUsers: {
    loading: false,
    error: null,
    data: [],
  },
  registeredUsers: {
    loading: false,
    error: null,
    data: [],
  },
  activeUsers: {
    loading: false,
    error: null,
    data: [],
  },
  unregistaredUsers: {
    loading: false,
    error: null,
    data: [],
  },
  userActivity: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_registared_user_count ------
    case GET_REGISTARED_USER_COUNT:
      return {
        ...state,
        registaredUserCount: {
          ...state.registaredUserCount,
          loading: true,
          error: null,
        },
      };
    case GET_REGISTARED_USER_COUNT_SUCCESSFUL:
      return {
        ...state,
        registaredUserCount: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_REGISTARED_USER_COUNT_FAILED:
      return {
        ...state,
        registaredUserCount: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_user_count_chart ------
    case GET_USER_COUNT_CHART:
      return {
        ...state,
        userCountChart: {
          ...state.userCountChart,
          loading: true,
          error: null,
        },
      };
    case GET_USER_COUNT_CHART_SUCCESSFUL:
      return {
        ...state,
        userCountChart: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_USER_COUNT_CHART_FAILED:
      return {
        ...state,
        userCountChart: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_view_all_users ------
    case GET_VIEW_ALL_USERS:
      return {
        ...state,
        viewAllUsers: {
          ...state.viewAllUsers,
          ...action.payload,
          loading: true,
          error: null,
        },
      };
    case GET_VIEW_ALL_USERS_SUCCESSFUL:
      return {
        ...state,
        viewAllUsers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_VIEW_ALL_USERS_FAILED:
      return {
        ...state,
        viewAllUsers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_registered_users ------
    case GET_REGISTERED_USERS:
      return {
        ...state,
        registeredUsers: {
          ...state.registeredUsers,
          ...action.payload,
          loading: true,
          error: null,
        },
      };
    case GET_REGISTERED_USERS_SUCCESSFUL:
      return {
        ...state,
        registeredUsers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_REGISTERED_USERS_FAILED:
      return {
        ...state,
        registeredUsers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_active_users ------
    case GET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: {
          ...state.activeUsers,
          ...action.payload,
          loading: true,
          error: null,
        },
      };
    case GET_ACTIVE_USERS_SUCCESSFUL:
      return {
        ...state,
        activeUsers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_ACTIVE_USERS_FAILED:
      return {
        ...state,
        activeUsers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_unregistared_users ------
    case GET_UNREGISTARED_USERS:
      return {
        ...state,
        unregistaredUsers: {
          ...state.unregistaredUsers,
          ...action.payload,
          loading: true,
          error: null,
        },
      };
    case GET_UNREGISTARED_USERS_SUCCESSFUL:
      return {
        ...state,
        unregistaredUsers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_UNREGISTARED_USERS_FAILED:
      return {
        ...state,
        unregistaredUsers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_user_activity ------
    case GET_USER_ACTIVITY:
      return {
        ...state,
        userActivity: {
          ...state.userActivity,
          loading: true,
          error: null,
          data: [],
        },
      };
    case GET_USER_ACTIVITY_SUCCESSFUL:
      return {
        ...state,
        userActivity: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_USER_ACTIVITY_FAILED:
      return {
        ...state,
        userActivity: {
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
