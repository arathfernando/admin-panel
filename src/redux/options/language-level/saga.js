import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_LANGUAGE_LEVEL,
  DELETE_LANGUAGE_LEVEL,
  GET_ALL_LANGUAGE_LEVEL,
  GET_SINGLE_LANGUAGE_LEVEL,
  UPDATE_LANGUAGE_LEVEL,
} from '../../types/options/language-level';

import {
  createLanguageLevelError,
  createLanguageLevelSuccess,
  deleteLanguageLevelError,
  deleteLanguageLevelSuccess,
  getAllLanguageLevel,
  getAllLanguageLevelError,
  getAllLanguageLevelSuccess,
  getSingleLanguageLevelError,
  getSingleLanguageLevelSuccess,
  updateLanguageLevelError,
  updateLanguageLevelSuccess,
} from './actions';

const getAllLanguageLevelAsync = async () => {
  return api
    .get(`/admin/options/language-level`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllLanguageLevel() {
  try {
    const result = yield call(getAllLanguageLevelAsync);
    yield put(getAllLanguageLevelSuccess(result.data));
  } catch (error) {
    yield put(getAllLanguageLevelError('Get All LanguageLevel Error !'));
  }
}

const getSingleLanguageLevelAsync = async (payload) => {
  await api
    .get(`/language-level/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleLanguageLevel(payload) {
  try {
    const result = yield call(getSingleLanguageLevelAsync, payload);
    if (result.status) {
      yield put(getSingleLanguageLevelSuccess(result.data.data));
    } else {
      yield put(
        getSingleLanguageLevelError(
          'Get Single LanguageLevel Response is not success!'
        )
      );
    }
  } catch (error) {
    yield put(getSingleLanguageLevelError('Get Single LanguageLevel Error !'));
  }
}

const createLanguageLevelAsync = async ({ payload }) => {
  return api
    .post(`/admin/options/language-level`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* CreateLanguageLevel(payload) {
  try {
    const result = yield call(createLanguageLevelAsync, payload);
    console.log('result =>', result);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createLanguageLevelSuccess(result.data));
    } else {
      yield put(
        createLanguageLevelError(
          'Create LanguageLevel Response is not success!'
        )
      );
    }
  } catch (error) {
    yield put(createLanguageLevelError('Create LanguageLevel Error !'));
  }
}

const updateLanguageLevelAsync = async ({ payload }) => {
  const reqObj = {
    language_level_name: payload.language_level_name,
    description: payload.description,
  };
  return api
    .put(`/admin/options/language-level/${payload.id}`, reqObj)
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateLanguageLevel(payload) {
  try {
    const result = yield call(updateLanguageLevelAsync, payload);
    console.log('result =>', result);
    if (result.status) {
      yield put(updateLanguageLevelSuccess(result.data));
      yield put(getAllLanguageLevel());
    } else {
      yield put(
        updateLanguageLevelError(
          'Update LanguageLevel Response is not success!'
        )
      );
    }
  } catch (error) {
    yield put(updateLanguageLevelError('Update LanguageLevel Error !'));
  }
}

const deleteLanguageLevelAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/language-level/${payload}`, {
      ...payload,
    })
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteLanguageLevel(payload) {
  try {
    const result = yield call(deleteLanguageLevelAsync, payload);
    if (result.status) {
      yield put(deleteLanguageLevelSuccess(result.data));
      yield put(getAllLanguageLevel());
    } else {
      yield put(
        deleteLanguageLevelError(
          'Delete LanguageLevel Response is not success!'
        )
      );
    }
  } catch (error) {
    yield put(deleteLanguageLevelError('Delete LanguageLevel Error !'));
  }
}

export function* watchGetAllLanguageLevel() {
  yield takeEvery(GET_ALL_LANGUAGE_LEVEL, GetAllLanguageLevel);
}
export function* watchCreateLanguageLevel() {
  yield takeEvery(CREATE_LANGUAGE_LEVEL, CreateLanguageLevel);
}
export function* watchGetSingleLanguageLevel() {
  yield takeEvery(GET_SINGLE_LANGUAGE_LEVEL, GetSingleLanguageLevel);
}
export function* watchUpdateLanguageLevel() {
  yield takeEvery(UPDATE_LANGUAGE_LEVEL, UpdateLanguageLevel);
}
export function* watchDeleteLanguageLevel() {
  yield takeEvery(DELETE_LANGUAGE_LEVEL, DeleteLanguageLevel);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllLanguageLevel),
    fork(watchGetSingleLanguageLevel),
    fork(watchCreateLanguageLevel),
    fork(watchUpdateLanguageLevel),
    fork(watchDeleteLanguageLevel),
  ]);
}
