/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  GET_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from '../../types/managements/notification';

import {
  createNotificationFailed,
  createNotificationSuccessful,
  deleteNotificationFailed,
  deleteNotificationSuccessful,
  getNotifications,
  getNotificationsFailed,
  getNotificationsSuccessful,
  updateNotificationFailed,
  updateNotificationSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_notification
const getNotificationsAsync = () => {
  return get(
    `/admin/admin-notification`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetNotifications() {
  try {
    const response = yield call(getNotificationsAsync);
    yield put(getNotificationsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getNotificationsFailed({ error, data: [] }));
  }
}

// create_notification
const createNotificationAsync = (payload) => {
  return post('/admin/admin-notification', payload, {}, { notify: true });
};
function* CreateNotification({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createNotificationAsync, payload);
    yield put(createNotificationSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getNotifications());
  } catch (error) {
    yield put(createNotificationFailed(error));
  }
}

// update_notification
const updateNotificationAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/admin-notification/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateNotification({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateNotificationAsync, payload);
    yield put(updateNotificationSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getNotifications());
  } catch (error) {
    yield put(updateNotificationFailed(error));
  }
}

// delete_notification
const deleteNotificationAsync = (id) => {
  return del(`/admin/admin-notification/${id}`, {}, { notify: true });
};
// delete_notification
function* DeleteNotification({ payload }) {
  try {
    const response = yield call(deleteNotificationAsync, payload);
    yield put(deleteNotificationSuccessful(response.data));
    yield put(getNotifications());
  } catch (error) {
    yield put(deleteNotificationFailed(error));
  }
}

export function* watchGetNotification() {
  yield takeLatest(GET_NOTIFICATION, GetNotifications);
  yield takeLatest(CREATE_NOTIFICATION, CreateNotification);
  yield takeLatest(UPDATE_NOTIFICATION, UpdateNotification);
  yield takeLatest(DELETE_NOTIFICATION, DeleteNotification);
}

export default function* rootSaga() {
  yield all([fork(watchGetNotification)]);
}
