/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_ACTICLE,
  DELETE_ACTICLE,
  GET_ACTICLE,
  UPDATE_ACTICLE,
} from '../../types/community/acticle';

import {
  createActicleFailed,
  createActicleSuccessful,
  deleteActicleFailed,
  deleteActicleSuccessful,
  getActicles,
  getActiclesFailed,
  getActiclesSuccessful,
  updateActicleFailed,
  updateActicleSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_acticle
const getActiclesAsync = ({ id, ...params } = {}) => {
  return get(
    `/admin/community/community/community-article/${id || ','}`,
    { params: { article_location: 'ALL', page: 1, limit: 1000, ...params } },
    { notifyError: true }
  );
};
function* GetActicles({ payload }) {
  try {
    const response = yield call(getActiclesAsync, payload);
    yield put(getActiclesSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getActiclesFailed({ error, data: [] }));
  }
}

// create_acticle
const createActicleAsync = (payload) => {
  return post(
    '/admin/community/community-article',
    payload,
    {},
    { notify: true }
  );
};
function* CreateActicle({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createActicleAsync, payload);
    yield put(getActicles());
    yield put(createActicleSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(createActicleFailed(error));
  }
}

// update_acticle
const updateActicleAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/community/community-article/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateActicle({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateActicleAsync, payload);
    yield put(getActicles());
    yield put(updateActicleSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(updateActicleFailed(error));
  }
}

// delete_acticle
const deleteActicleAsync = (id) => {
  return del(`/admin/community/community-article/${id}`, {}, { notify: true });
};
// delete_acticle
function* DeleteActicle({ payload }) {
  try {
    const response = yield call(deleteActicleAsync, payload);
    yield put(getActicles());
    yield put(deleteActicleSuccessful(response.data));
  } catch (error) {
    yield put(deleteActicleFailed(error));
  }
}

export function* watchGetActicle() {
  yield takeLatest(GET_ACTICLE, GetActicles);
  yield takeLatest(CREATE_ACTICLE, CreateActicle);
  yield takeLatest(UPDATE_ACTICLE, UpdateActicle);
  yield takeLatest(DELETE_ACTICLE, DeleteActicle);
}

export default function* rootSaga() {
  yield all([fork(watchGetActicle)]);
}
