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

// get_registared_user_count
export const getRegistaredUserCount = () => {
  return {
    type: GET_REGISTARED_USER_COUNT,
  };
};
export const getRegistaredUserCountSuccessful = (payload) => {
  return {
    type: GET_REGISTARED_USER_COUNT_SUCCESSFUL,
    payload,
  };
};
export const getRegistaredUserCountFailed = (payload) => {
  return {
    type: GET_REGISTARED_USER_COUNT_FAILED,
    payload,
  };
};

// get_user_count_chart
export const getUserCountChart = () => {
  return {
    type: GET_USER_COUNT_CHART,
  };
};
export const getUserCountChartSuccessful = (payload) => {
  return {
    type: GET_USER_COUNT_CHART_SUCCESSFUL,
    payload,
  };
};
export const getUserCountChartFailed = (payload) => {
  return {
    type: GET_USER_COUNT_CHART_FAILED,
    payload,
  };
};

// get_view_all_users
export const getViewAllUsers = (payload) => {
  return {
    type: GET_VIEW_ALL_USERS,
    payload,
  };
};
export const getViewAllUsersSuccessful = (payload) => {
  return {
    type: GET_VIEW_ALL_USERS_SUCCESSFUL,
    payload,
  };
};
export const getViewAllUsersFailed = (payload) => {
  return {
    type: GET_VIEW_ALL_USERS_FAILED,
    payload,
  };
};

// get_registered_users
export const getRegisteredUsers = (payload) => {
  return {
    type: GET_REGISTERED_USERS,
    payload,
  };
};
export const getRegisteredUsersSuccessful = (payload) => {
  return {
    type: GET_REGISTERED_USERS_SUCCESSFUL,
    payload,
  };
};
export const getRegisteredUsersFailed = (payload) => {
  return {
    type: GET_REGISTERED_USERS_FAILED,
    payload,
  };
};

// get_active_users
export const getActiveUsers = (payload) => {
  return {
    type: GET_ACTIVE_USERS,
    payload,
  };
};
export const getActiveUsersSuccessful = (payload) => {
  return {
    type: GET_ACTIVE_USERS_SUCCESSFUL,
    payload,
  };
};
export const getActiveUsersFailed = (payload) => {
  return {
    type: GET_ACTIVE_USERS_FAILED,
    payload,
  };
};

// get_unregistared_users
export const getUnregistaredUsers = (payload) => {
  return {
    type: GET_UNREGISTARED_USERS,
    payload,
  };
};
export const getUnregistaredUsersSuccessful = (payload) => {
  return {
    type: GET_UNREGISTARED_USERS_SUCCESSFUL,
    payload,
  };
};
export const getUnregistaredUsersFailed = (payload) => {
  return {
    type: GET_UNREGISTARED_USERS_FAILED,
    payload,
  };
};

// get_user_activity
export const getUserActivity = (payload) => {
  return {
    type: GET_USER_ACTIVITY,
    payload,
  };
};
export const getUserActivitySuccessful = (payload) => {
  return {
    type: GET_USER_ACTIVITY_SUCCESSFUL,
    payload,
  };
};
export const getUserActivityFailed = (payload) => {
  return {
    type: GET_USER_ACTIVITY_FAILED,
    payload,
  };
};
