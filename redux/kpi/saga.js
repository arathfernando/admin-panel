import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  GET_ACTIVE_USERS,
  GET_REGISTARED_USER_COUNT,
  GET_REGISTERED_USERS,
  GET_UNREGISTARED_USERS,
  GET_USER_ACTIVITY,
  GET_USER_COUNT_CHART,
  GET_VIEW_ALL_USERS,
} from '../types/kpi';

import { get } from '../../ApiConfig';
import {
  getActiveUsersFailed,
  getActiveUsersSuccessful,
  getRegistaredUserCountFailed,
  getRegistaredUserCountSuccessful,
  getRegisteredUsersFailed,
  getRegisteredUsersSuccessful,
  getUnregistaredUsersFailed,
  getUnregistaredUsersSuccessful,
  getUserActivityFailed,
  getUserActivitySuccessful,
  getUserCountChartFailed,
  getUserCountChartSuccessful,
  getViewAllUsersFailed,
  getViewAllUsersSuccessful,
} from './actions';

// get_registared_user_count
const getRegistaredUserCountAsync = () => {
  return get('/api/analytics-user-report/registared-user-count', {
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetRegistaredUserCount() {
  try {
    const response = yield call(getRegistaredUserCountAsync);
    yield put(getRegistaredUserCountSuccessful(response));
  } catch (error) {
    yield put(getRegistaredUserCountFailed({ data: [], error }));
  }
}

// get_user_count_chart
const getUserCountChartAsync = () => {
  return get('/api/analytics-user-report/user-count-chart', {
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetUserCountChart() {
  try {
    const response = yield call(getUserCountChartAsync);
    yield put(
      getUserCountChartSuccessful({ data: response.data?.user_count || [] })
    );
  } catch (error) {
    yield put(getUserCountChartFailed({ data: [], error }));
  }
}

// get_view_all_users
const getViewAllUsersAsync = (params = {}) => {
  return get('/api/analytics-user-report/user-list', {
    params: { type: 'view_all_users', startDate: '2023-01-01', ...params },
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetViewAllUsers({ payload }) {
  try {
    const response = yield call(getViewAllUsersAsync, payload);
    yield put(
      getViewAllUsersSuccessful({
        ...payload,
        data: response.data?.user_list || [],
      })
    );
  } catch (error) {
    yield put(getViewAllUsersFailed({ ...payload, data: [], error }));
  }
}

// get_registered_users
const getRegisteredUsersAsync = (params = {}) => {
  return get('/api/analytics-user-report/user-list', {
    params: { type: 'reqistared_users', startDate: '2023-01-01', ...params },
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetRegisteredUsers({ payload }) {
  try {
    const response = yield call(getRegisteredUsersAsync, payload);
    yield put(
      getRegisteredUsersSuccessful({
        ...payload,
        data: response.data?.user_list || [],
      })
    );
  } catch (error) {
    yield put(getRegisteredUsersFailed({ ...payload, data: [], error }));
  }
}

// get_active_users
const getActiveUsersAsync = (params = {}) => {
  return get('/api/analytics-user-report/user-list', {
    params: { type: 'active_users', startDate: '2023-01-01', ...params },
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetActiveUsers({ payload }) {
  try {
    const response = yield call(getActiveUsersAsync, payload);
    yield put(
      getActiveUsersSuccessful({
        ...payload,
        data: response.data?.user_list || [],
      })
    );
  } catch (error) {
    yield put(getActiveUsersFailed({ ...payload, data: [], error }));
  }
}

// get_unregistared_users
const getUnregistaredUsersAsync = (params = {}) => {
  return get('/api/analytics-user-report/user-list', {
    params: { type: 'unreqistared_users', startDate: '2023-01-01', ...params },
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetUnregistaredUsers({ payload }) {
  try {
    const response = yield call(getUnregistaredUsersAsync, payload);
    yield put(
      getUnregistaredUsersSuccessful({
        ...payload,
        data: response.data?.user_list || [],
      })
    );
  } catch (error) {
    yield put(getUnregistaredUsersFailed({ ...payload, data: [], error }));
  }
}

// get_user_activity
const getUserActivityAsync = (params = {}) => {
  return get('/api/analytics-user-report/user-activity', {
    params: {
      startDate: '2023-01-01',
      user_id: 100,
      ...params,
    },
    baseURL: process.env.REACT_APP_HUBBERS_DOMAIN,
  });
};
function* GetUserActivity({ payload }) {
  try {
    const response = yield call(getUserActivityAsync, payload);
    yield put(
      getUserActivitySuccessful({
        ...payload,
        data: response.data?.user_activity || [],
      })
    );
  } catch (error) {
    yield put(getUserActivityFailed({ ...payload, data: [], error }));
  }
}

export function* watchKpi() {
  yield takeLatest(GET_REGISTARED_USER_COUNT, GetRegistaredUserCount);
  yield takeLatest(GET_USER_COUNT_CHART, GetUserCountChart);
  yield takeLatest(GET_VIEW_ALL_USERS, GetViewAllUsers);
  yield takeLatest(GET_REGISTERED_USERS, GetRegisteredUsers);
  yield takeLatest(GET_ACTIVE_USERS, GetActiveUsers);
  yield takeLatest(GET_UNREGISTARED_USERS, GetUnregistaredUsers);
  yield takeLatest(GET_USER_ACTIVITY, GetUserActivity);
}

export default function* rootSaga() {
  yield all([fork(watchKpi)]);
}
