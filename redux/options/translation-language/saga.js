/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE,
  GET_ALL_TRANSLATION_LANGUAGES,
  UPDATE_TRANSLATION_LANGUAGE,
} from '../../types/options/translation-language';

import {
  createTranslationLanguageError,
  createTranslationLanguageSuccess,
  deleteTranslationLanguageError,
  deleteTranslationLanguageSuccess,
  getAllTranslationLanguages,
  getAllTranslationLanguagesSuccess,
  updateTranslationLanguageError,
  updateTranslationLanguageSuccess,
} from './actions';

const getAllTranslationLanguagesAsync = async () => {
  return api.get(`/admin/options/translation-language`);
};

function* GetAllTranslationLanguages() {
  const result = yield call(getAllTranslationLanguagesAsync);
  yield put(getAllTranslationLanguagesSuccess(result.data));
}

const createTranslationLanguageAsync = async ({ payload }) => {
  return api
    .post(`/admin/options/translation-language`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};

function* CreateTranslationLanguage(payload) {
  try {
    const result = yield call(createTranslationLanguageAsync, payload);

    yield put(createTranslationLanguageSuccess(result.data));
    yield put(getAllTranslationLanguages());
  } catch (error) {
    yield put(
      createTranslationLanguageError('Create TranslationLanguage Error !')
    );
  }
}

const updateTranslationLanguageAsync = async ({ payload }) => {
  const { id, flag, ...reqObj } = payload;
  if (typeof flag !== 'string') {
    reqObj.flag = flag;
  }
  return api
    .put(`/admin/options/translation-language/${id}`, objectToFormData(reqObj))
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateTranslationLanguage(payload) {
  try {
    const result = yield call(updateTranslationLanguageAsync, payload);
    yield put(updateTranslationLanguageSuccess(result.data));
    yield put(getAllTranslationLanguages());
  } catch (error) {
    yield put(
      updateTranslationLanguageError('Update TranslationLanguage Error !')
    );
  }
}

const deleteTranslationLanguageAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/translation-language/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteTranslationLanguage(payload) {
  try {
    const result = yield call(deleteTranslationLanguageAsync, payload);
    yield put(deleteTranslationLanguageSuccess(result.data));
    yield put(getAllTranslationLanguages());
  } catch (error) {
    yield put(
      deleteTranslationLanguageError('Delete Translation Language Error !')
    );
  }
}

export function* watchGetAllLanguage() {
  yield takeEvery(GET_ALL_TRANSLATION_LANGUAGES, GetAllTranslationLanguages);
}
export function* watchCreateTranslationLanguage() {
  yield takeEvery(CREATE_TRANSLATION_LANGUAGE, CreateTranslationLanguage);
}
export function* watchUpdateTranslationLanguage() {
  yield takeEvery(UPDATE_TRANSLATION_LANGUAGE, UpdateTranslationLanguage);
}
export function* watchDeleteTranslationLanguage() {
  yield takeEvery(DELETE_TRANSLATION_LANGUAGE, DeleteTranslationLanguage);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllLanguage),
    fork(watchCreateTranslationLanguage),
    fork(watchUpdateTranslationLanguage),
    fork(watchDeleteTranslationLanguage),
  ]);
}
