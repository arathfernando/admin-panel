import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  GET_ALL_COUNTRY,
  GET_SINGLE_COUNTRY,
  UPDATE_COUNTRY,
} from '../../types/options/country';

import {
  createCountryError,
  createCountrySuccess,
  deleteCountryError,
  deleteCountrySuccess,
  getAllCountry,
  getAllCountryError,
  getAllCountrySuccess,
  getSingleCountryError,
  getSingleCountrySuccess,
  updateCountryError,
  updateCountrySuccess,
} from './actions';

const getAllCountryAsync = async () => {
  return api
    .get(`/admin/options/country`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllCountry() {
  try {
    const result = yield call(getAllCountryAsync);
    yield put(getAllCountrySuccess(result.data));
  } catch (error) {
    yield put(getAllCountryError('Get All Country Error !'));
  }
}

const getSingleCountryAsync = async (payload) => {
  await api
    .get(`/country/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleCountry(payload) {
  try {
    const result = yield call(getSingleCountryAsync, payload);
    if (result.status) {
      yield put(getSingleCountrySuccess(result.data.data));
    } else {
      yield put(
        getSingleCountryError('Get Single Country Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleCountryError('Get Single Country Error !'));
  }
}

const createCountryAsync = async ({ payload }) => {
  return api.post(`/admin/options/country`, {
    ...payload,
  });
};

function* CreateCountry(payload) {
  try {
    const result = yield call(createCountryAsync, payload);
    yield put(createCountrySuccess(result.data));
    yield put(getAllCountry());
  } catch (error) {
    yield put(createCountryError('Create Country Error !'));
  }
}

const updateCountryAsync = async ({ payload }) => {
  const reqObj = {
    country_name: payload.country_name,
    short_name: payload.short_name,
    continent: payload.continent,
  };
  return api.put(`/admin/options/country/${payload.id}`, reqObj);
};

function* UpdateCountry(payload) {
  try {
    const result = yield call(updateCountryAsync, payload);
    yield put(updateCountrySuccess(result.data));
    yield put(getAllCountry());
  } catch (error) {
    yield put(updateCountryError('Update Country Error !'));
  }
}

const deleteCountryAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/country/${payload}`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteCountry(payload) {
  try {
    const result = yield call(deleteCountryAsync, payload);
    yield put(deleteCountrySuccess(result.data));
    yield put(getAllCountry());
  } catch (error) {
    yield put(deleteCountryError('Delete Country Error !'));
  }
}

export function* watchGetAllCountry() {
  yield takeEvery(GET_ALL_COUNTRY, GetAllCountry);
}
export function* watchCreateCountry() {
  yield takeEvery(CREATE_COUNTRY, CreateCountry);
}
export function* watchGetSingleCountry() {
  yield takeEvery(GET_SINGLE_COUNTRY, GetSingleCountry);
}
export function* watchUpdateCountry() {
  yield takeEvery(UPDATE_COUNTRY, UpdateCountry);
}
export function* watchDeleteCountry() {
  yield takeEvery(DELETE_COUNTRY, DeleteCountry);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCountry),
    fork(watchGetSingleCountry),
    fork(watchCreateCountry),
    fork(watchUpdateCountry),
    fork(watchDeleteCountry),
  ]);
}
