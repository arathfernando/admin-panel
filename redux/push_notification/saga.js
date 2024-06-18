/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { GET_PUSH_NOTIFICATIONS } from '../types/push_notification';

import { get } from '../../ApiConfig';
import {
  getPushNotificationsFailed,
  getPushNotificationsSuccessful,
} from './actions';

// get_push_notifications
const getPushNotificationsAsync = ({ page = 1, limit = 100 } = {}) => {
  return get(
    `/admin/options/all/notification`,
    { params: { page, limit } },
    { notifyError: true }
  );
};
function* GetPushNotifications({ payload }) {
  try {
    const response = yield call(getPushNotificationsAsync, payload);
    yield put(getPushNotificationsSuccessful({ ...payload, ...response.data }));
  } catch (error) {
    yield put(getPushNotificationsFailed({ ...payload, data: [], error }));
  }
}

export function* watchGetAllPushNotification() {
  yield takeLatest(GET_PUSH_NOTIFICATIONS, GetPushNotifications);
}

export default function* rootSaga() {
  yield all([fork(watchGetAllPushNotification)]);
}
