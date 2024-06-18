/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_BADGE,
  DELETE_BADGE,
  GET_BADGE,
  UPDATE_BADGE,
} from '../../types/options/badge';

import { axiosPut, del, get, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import {
  createBadgeFailed,
  createBadgeSuccessful,
  deleteBadgeFailed,
  deleteBadgeSuccessful,
  getBadges,
  getBadgesFailed,
  getBadgesSuccessful,
  updateBadgeFailed,
  updateBadgeSuccessful,
} from './actions';

// get_badge
const getBadgesAsync = () => {
  return get(`/admin/options/badges`, {}, { notifyError: true });
};
function* GetBadges() {
  try {
    const response = yield call(getBadgesAsync);
    yield put(getBadgesSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getBadgesFailed({ error, data: [] }));
  }
}

// create_badge
const createBadgeAsync = (payload) => {
  return post(
    '/admin/options/badge',
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateBadge({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createBadgeAsync, payload);
    yield put(createBadgeSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getBadges());
  } catch (error) {
    yield put(createBadgeFailed(error));
  }
}

// update_badge
const updateBadgeAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/badge/${id}`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* UpdateBadge({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateBadgeAsync, payload);
    yield put(updateBadgeSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getBadges());
  } catch (error) {
    yield put(updateBadgeFailed(error));
  }
}

// delete_badge
const deleteBadgeAsync = (id) => {
  return del(`/admin/options/badge/${id}`, {}, { notify: true });
};
// delete_badge
function* DeleteBadge({ payload }) {
  try {
    const response = yield call(deleteBadgeAsync, payload);
    yield put(deleteBadgeSuccessful(response.data));
    yield put(getBadges());
  } catch (error) {
    yield put(deleteBadgeFailed(error));
  }
}

export function* watchBadge() {
  yield takeLatest(GET_BADGE, GetBadges);
  yield takeLatest(CREATE_BADGE, CreateBadge);
  yield takeLatest(UPDATE_BADGE, UpdateBadge);
  yield takeLatest(DELETE_BADGE, DeleteBadge);
}

export default function* rootSaga() {
  yield all([fork(watchBadge)]);
}
