/* eslint-disable no-unused-expressions */
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';

import {
  ADD_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE,
  GET_TRANSLATION_LANGUAGE,
  TRANSLATE_TRANSLATION_KEYS,
} from '../../types/translation/translation_language';

import {
  addTranslationLanguageFailed,
  addTranslationLanguageSuccessful,
  deleteTranslationLanguageFailed,
  deleteTranslationLanguageSuccessful,
  getTranslationLanguages,
  getTranslationLanguagesFailed,
  getTranslationLanguagesSuccessful,
  translateTranslationKeyFailed,
  translateTranslationKeySuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_translation_languages
const getTranslationLanguagesAsync = (projectId) => {
  return get(
    `/admin/options/translation-project-language/project/${projectId}`,
    {},
    { notifyError: true }
  );
};
function* GetTranslationLanguages({ payload }) {
  const { projectId } = yield select(
    ({ transLanguage }) => transLanguage.translationLanguages
  );
  try {
    const response = yield call(
      getTranslationLanguagesAsync,
      payload?.projectId || projectId
    );
    yield put(
      getTranslationLanguagesSuccessful({
        projectId: payload?.projectId || projectId,
        data: response.data,
      })
    );
  } catch (error) {
    yield put(
      getTranslationLanguagesFailed({
        projectId: payload?.projectId || projectId,
        error,
        data: [],
      })
    );
  }
}

// add_translation_language
const addTranslationLanguageAsync = (payload) => {
  return post(
    '/admin/options/translation-project-language',
    payload,
    {},
    { notify: true }
  );
};
function* AddTranslationLanguage({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(addTranslationLanguageAsync, payload);
    yield put(addTranslationLanguageSuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationLanguages());
  } catch (error) {
    yield put(addTranslationLanguageFailed(error));
  }
}

// translate_translation_keys
const translateTranslationKeyAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/translation-project-language/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* TranslateTranslationKey({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(translateTranslationKeyAsync, payload);
    yield put(translateTranslationKeySuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationLanguages());
  } catch (error) {
    yield put(translateTranslationKeyFailed(error));
  }
}

// delete_translation_language
const deleteTranslationLanguageAsync = (id) => {
  return del(
    `/admin/options/translation-project-language/${id}`,
    {},
    { notify: true }
  );
};
// delete_translation_language
function* DeleteTranslationLanguage({ payload }) {
  try {
    const response = yield call(deleteTranslationLanguageAsync, payload);
    yield put(deleteTranslationLanguageSuccessful(response.data));
    yield put(getTranslationLanguages());
  } catch (error) {
    yield put(deleteTranslationLanguageFailed(error));
  }
}

export function* watchGetTranslationLanguage() {
  yield takeLatest(GET_TRANSLATION_LANGUAGE, GetTranslationLanguages);
  yield takeLatest(ADD_TRANSLATION_LANGUAGE, AddTranslationLanguage);
  yield takeLatest(TRANSLATE_TRANSLATION_KEYS, TranslateTranslationKey);
  yield takeLatest(DELETE_TRANSLATION_LANGUAGE, DeleteTranslationLanguage);
}

export default function* rootSaga() {
  yield all([fork(watchGetTranslationLanguage)]);
}
