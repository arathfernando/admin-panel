import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_LANGUAGE,
  DELETE_LANGUAGE,
  GET_ALL_LANGUAGE,
  GET_SINGLE_LANGUAGE,
  UPDATE_LANGUAGE,
} from '../../types/options/language';

import {
  createLanguageError,
  createLanguageSuccess,
  deleteLanguageError,
  deleteLanguageSuccess,
  getAllLanguage,
  getAllLanguageError,
  getAllLanguageSuccess,
  getSingleLanguageError,
  getSingleLanguageSuccess,
  updateLanguageError,
  updateLanguageSuccess,
} from './actions';

const getAllLanguageAsync = async () => {
  return api.get(`/admin/options/language`);
};

function* GetAllLanguage() {
  try {
    const result = yield call(getAllLanguageAsync);
    yield put(getAllLanguageSuccess(result.data));
  } catch (error) {
    yield put(getAllLanguageError('Get All Language Error !'));
  }
}

const getSingleLanguageAsync = async (payload) => {
  await api
    .get(`Language/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleLanguage(payload) {
  try {
    const result = yield call(getSingleLanguageAsync, payload);
    if (result.status) {
      yield put(getSingleLanguageSuccess(result.data.data));
    } else {
      yield put(
        getSingleLanguageError('Get Single Language Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleLanguageError('Get Single Language Error !'));
  }
}

const createLanguageAsync = async ({ payload }) => {
  return api
    .post(`/admin/options/language`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* CreateLanguage(payload) {
  try {
    const result = yield call(createLanguageAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createLanguageSuccess(result.data));
    } else {
      yield put(
        createLanguageError('Create Language Response is not success!')
      );
    }
  } catch (error) {
    yield put(createLanguageError('Create Language Error !'));
  }
}

const updateLanguageAsync = async ({ payload }) => {
  const requestData = {
    language_code: payload.language_code,
    language_name: payload.language_name,
    native_name: payload.native_name,
  };
  return api
    .put(`/admin/options/language/${payload.id}`, requestData)
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateLanguage(payload) {
  try {
    const result = yield call(updateLanguageAsync, payload);
    if (result.status) {
      yield put(updateLanguageSuccess(result.data));
      yield put(getAllLanguage());
    } else {
      yield put(
        updateLanguageError('Update Language Response is not success!')
      );
    }
  } catch (error) {
    yield put(updateLanguageError('Update Language Error !'));
  }
}

const deleteLanguageAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/language/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteLanguage(payload) {
  try {
    const result = yield call(deleteLanguageAsync, payload);
    if (result.status) {
      yield put(deleteLanguageSuccess(result.data));
      yield put(getAllLanguage());
    } else {
      yield put(
        deleteLanguageError('Delete Language Response is not success!')
      );
    }
  } catch (error) {
    yield put(deleteLanguageError('Delete Language Error !'));
  }
}

export function* watchGetAllLanguage() {
  yield takeEvery(GET_ALL_LANGUAGE, GetAllLanguage);
}
export function* watchCreateLanguage() {
  yield takeEvery(CREATE_LANGUAGE, CreateLanguage);
}
export function* watchGetSingleLanguage() {
  yield takeEvery(GET_SINGLE_LANGUAGE, GetSingleLanguage);
}
export function* watchUpdateLanguage() {
  yield takeEvery(UPDATE_LANGUAGE, UpdateLanguage);
}
export function* watchDeleteLanguage() {
  yield takeEvery(DELETE_LANGUAGE, DeleteLanguage);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllLanguage),
    fork(watchGetSingleLanguage),
    fork(watchCreateLanguage),
    fork(watchUpdateLanguage),
    fork(watchDeleteLanguage),
  ]);
}
