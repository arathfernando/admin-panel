/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  GET_NOTIFICATIONS,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_MARK_ALL_READ,
  REMOVE_NOTIFICATION,
  UPDATE_NOTIFICATION_SEEN_STATUS,
} from '../types/notification';

import { axiosPut, del, get } from '../../ApiConfig';
import {
  getAdminNotificationsFailed,
  getAdminNotificationsSuccessful,
  notificationDeleteAllFailed,
  notificationDeleteAllSuccessful,
  notificationMarkAllReadFailed,
  notificationMarkAllReadSuccessful,
  removeNotificationFailed,
  removeNotificationSuccessful,
  updateNotificationSeenStatusFailed,
  updateNotificationSeenStatusSuccessful,
} from './actions';

// get_notifications
const getNotifications = ({ page = 1 }) => {
  return get('/admin/options/user/notification', {
    params: { page, limit: 25 },
  }).then((data) => data.data);
};
function* GetNotifications({ payload }) {
  try {
    const response = yield call(getNotifications, { page: payload.page });
    yield put(
      getAdminNotificationsSuccessful({
        ...payload,
        ...response,
      })
    );
  } catch (error) {
    yield put(
      getAdminNotificationsFailed({
        error,
        ...payload,
        data: [],
      })
    );
  }
}

// remove_notification
const removeNotificationAsync = ({ id }) => {
  return del(
    `/admin/options/user/notification/${id}`,
    {},
    { notifyError: true }
  );
};
function* RemoveNotification({ payload: { onSuccess, onError, ...payload } }) {
  try {
    const response = yield call(removeNotificationAsync, payload);
    yield put(removeNotificationSuccessful(response));
    onSuccess(response);
  } catch (error) {
    yield put(removeNotificationFailed(error));
    onError?.(error);
  }
}

// update_notification_seen_status
const updateNotificationSeenStatusAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/user/notification/${id}`,
    payload,
    {},
    { notifyError: true }
  );
};
function* UpdateNotificationSeenStatus({ payload: { id, ...payload } }) {
  try {
    const response = yield call(updateNotificationSeenStatusAsync, {
      id,
      ...payload,
    });
    yield put(updateNotificationSeenStatusSuccessful(response));
  } catch (error) {
    yield put(updateNotificationSeenStatusFailed(error));
  }
}

// notification_delete_all
const notificationDeleteAllAsync = () => {
  return del('/admin/options/user/notification', {}, { notify: true });
};
function* NotificationDeleteAll() {
  try {
    const response = yield call(notificationDeleteAllAsync);
    yield put(notificationDeleteAllSuccessful({ ...response }));
  } catch (error) {
    yield put(notificationDeleteAllFailed(error));
  }
}

// notification_mark_all_read
const notificationMarkAllReadAsync = () => {
  return axiosPut('/admin/options/user/notification', {}, {}, { notify: true });
};
function* NotificationMarkAllRead() {
  try {
    const response = yield call(notificationMarkAllReadAsync);
    yield put(notificationMarkAllReadSuccessful({ ...response }));
  } catch (error) {
    yield put(notificationMarkAllReadFailed(error));
  }
}

export function* watchGetAllNotification() {
  yield takeLatest(GET_NOTIFICATIONS, GetNotifications);
  yield takeLatest(REMOVE_NOTIFICATION, RemoveNotification);
  yield takeLatest(
    UPDATE_NOTIFICATION_SEEN_STATUS,
    UpdateNotificationSeenStatus
  );
  yield takeLatest(NOTIFICATION_DELETE_ALL, NotificationDeleteAll);
  yield takeLatest(NOTIFICATION_MARK_ALL_READ, NotificationMarkAllRead);
}

export default function* rootSaga() {
  yield all([fork(watchGetAllNotification)]);
}
