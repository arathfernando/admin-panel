/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_TIMEZONE,
  DELETE_TIMEZONE,
  GET_ALL_TIMEZONE,
  GET_SINGLE_TIMEZONE,
  UPDATE_TIMEZONE,
} from '../../types/options/timezone';

import {
  createTimezoneError,
  createTimezoneSuccess,
  deleteTimezoneError,
  deleteTimezoneSuccess,
  getAllTimezone,
  getAllTimezoneError,
  getAllTimezoneSuccess,
  getSingleTimezoneError,
  getSingleTimezoneSuccess,
  updateTimezoneError,
  updateTimezoneSuccess,
} from './actions';

const getAllTimezoneAsync = async () => {
  return api.get(`/admin/options/timezone`);
};

function* GetAllTimezone() {
  try {
    const result = yield call(getAllTimezoneAsync);
    yield put(getAllTimezoneSuccess(result.data));
  } catch (error) {
    yield put(getAllTimezoneError('Get All Timezone Error !'));
  }
}

const getSingleTimezoneAsync = async (payload) => {
  await api
    .get(`/admin/options/timezone/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleTimezone(payload) {
  try {
    const result = yield call(getSingleTimezoneAsync, payload);
    if (result.status) {
      yield put(getSingleTimezoneSuccess(result.data));
    } else {
      yield put(
        getSingleTimezoneError('Get Single Timezone Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleTimezoneError('Get Single Timezone Error !'));
  }
}

const createTimezoneAsync = async ({ payload }) => {
  return api.post(`/admin/options/timezone`, {
    ...payload,
  });
};

function* CreateTimezone(payload) {
  try {
    const result = yield call(createTimezoneAsync, payload);
    yield put(createTimezoneSuccess(result.data));
    yield put(getAllTimezone());
  } catch (error) {
    yield put(createTimezoneError('Create Timezone Error !'));
  }
}

const updateTimezoneAsync = async ({ payload }) => {
  const reqObj = {
    timezone_value: payload.timezone_value,
    timezone_abbr: payload.timezone_abbr,
    offset: payload.offset,
    dst: payload.dst,
    timezone_text: payload.timezone_text,
    timezone_utc: payload.timezone_utc,
  };
  return api
    .put(`/admin/options/timezone/${payload.id}`, reqObj)
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateTimezone(payload) {
  try {
    const result = yield call(updateTimezoneAsync, payload);
    yield put(updateTimezoneSuccess(result.data));
    yield put(getAllTimezone());
  } catch (error) {
    yield put(updateTimezoneError('Update Timezone Error !'));
  }
}

const deleteTimezoneAsync = async ({ payload }) => {
  return api.delete(`/admin/options/timezone/${payload}`);
};

function* DeleteTimezone(payload) {
  try {
    const result = yield call(deleteTimezoneAsync, payload);
    yield put(deleteTimezoneSuccess(result.data));
    yield put(getAllTimezone());
  } catch (error) {
    yield put(deleteTimezoneError('Delete Timezone Error !'));
  }
}

export function* watchGetAllTimezone() {
  yield takeEvery(GET_ALL_TIMEZONE, GetAllTimezone);
}
export function* watchCreateTimezone() {
  yield takeEvery(CREATE_TIMEZONE, CreateTimezone);
}
export function* watchGetSingleTimezone() {
  yield takeEvery(GET_SINGLE_TIMEZONE, GetSingleTimezone);
}
export function* watchUpdateTimezone() {
  yield takeEvery(UPDATE_TIMEZONE, UpdateTimezone);
}
export function* watchDeleteTimezone() {
  yield takeEvery(DELETE_TIMEZONE, DeleteTimezone);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllTimezone),
    fork(watchGetSingleTimezone),
    fork(watchCreateTimezone),
    fork(watchUpdateTimezone),
    fork(watchDeleteTimezone),
  ]);
}
