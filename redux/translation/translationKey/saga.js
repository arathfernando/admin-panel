/* eslint-disable no-unused-expressions */
import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  CREATE_TRANSLATION_KEY,
  DELETE_TRANSLATION_KEY,
  GET_TRANSLATION_KEY,
  START_AUTO_TRANSLATION,
  UPDATE_TRANSLATION_KEY,
  UPDATE_TRANSLATION_TEXT,
} from '../../types/translation/translation_key';

import {
  createTranslationKeyFailed,
  createTranslationKeySuccessful,
  deleteTranslationKeyFailed,
  deleteTranslationKeySuccessful,
  getTranslationKeys,
  getTranslationKeysFailed,
  getTranslationKeysSuccessful,
  startAutoTranslationFailed,
  startAutoTranslationSuccessful,
  updateTranslationKeyFailed,
  updateTranslationKeySuccessful,
  updateTranslationTextFailed,
  updateTranslationTextSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';
import { getTranslationLanguages } from '../translationLanguage/actions';

// get_translation_keys
const getTranslationKeysAsync = (projectId) => {
  return get(
    `/admin/options/translation-project-key/translation-project/${projectId}`,
    {},
    { notifyError: true }
  );
};
function* GetTranslationKeys({ payload }) {
  const { projectId } = yield select(
    ({ translationKey }) => translationKey.translationKeys
  );
  try {
    const response = yield call(
      getTranslationKeysAsync,
      payload?.projectId || projectId
    );
    yield put(
      getTranslationKeysSuccessful({
        projectId: payload?.projectId || projectId,
        data: response.data,
      })
    );
  } catch (error) {
    yield put(
      getTranslationKeysFailed({
        projectId: payload?.projectId || projectId,
        error,
        data: [],
      })
    );
  }
}

// create_translation_key
const createTranslationKeyAsync = (payload) => {
  return post(
    '/admin/options/translation-project-key',
    payload,
    {},
    { notify: true }
  );
};
function* CreateTranslationKey({
  payload: { onSuccess, onError, ...payload },
}) {
  try {
    const response = yield call(createTranslationKeyAsync, payload);
    yield put(createTranslationKeySuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationKeys());
    yield put(getTranslationLanguages());
  } catch (error) {
    yield put(createTranslationKeyFailed(error));
    onError?.(error);
  }
}

// update_translation_key
const updateTranslationKeyAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/translation-project-key/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateTranslationKey({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateTranslationKeyAsync, payload);
    yield put(updateTranslationKeySuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationKeys());
  } catch (error) {
    yield put(updateTranslationKeyFailed(error));
  }
}

// delete_translation_key
const deleteTranslationKeyAsync = (id) => {
  return del(
    `/admin/options/translation-project-key/${id}`,
    {},
    { notify: true }
  );
};
// delete_translation_key
function* DeleteTranslationKey({ payload }) {
  try {
    const response = yield call(deleteTranslationKeyAsync, payload);
    yield put(deleteTranslationKeySuccessful(response.data));
    yield put(getTranslationKeys());
    yield put(getTranslationLanguages());
  } catch (error) {
    yield put(deleteTranslationKeyFailed(error));
  }
}

// start_auto_translation
const startAutoTranslationAsync = (payload) => {
  return post(
    '/admin/options/translation-project/add-all-translation',
    payload,
    {},
    { notify: true }
  );
};
function* StartAutoTranslation({
  payload: { onSuccess, onError, fetchAgainAfterComplete = true, ...payload },
}) {
  try {
    const response = yield call(startAutoTranslationAsync, payload);
    yield put(startAutoTranslationSuccessful({ ...response.data, ...payload }));
    onSuccess?.(response.data);
    if (fetchAgainAfterComplete) {
      yield put(getTranslationKeys());
      yield put(getTranslationLanguages());
    }
  } catch (error) {
    yield put(startAutoTranslationFailed({ ...error, ...payload }));
    onError?.(error);
  }
}

// update_translation_text
const updateTranslationTextAsync = ({ id, ...payload }) => {
  return post(
    `/admin/options/translation-project-value`,
    [payload],
    {},
    { notify: true }
  );
};
function* UpdateTranslationText({
  payload: { onSuccess, onError, ...payload },
}) {
  try {
    const response = yield call(updateTranslationTextAsync, payload);
    yield put(updateTranslationTextSuccessful(response.data));
    yield put(getTranslationLanguages());
    onSuccess?.(response.data);
  } catch (error) {
    yield put(updateTranslationTextFailed(error));
    onError?.(error);
  }
}

export function* watchGetTranslationKey() {
  yield takeLatest(GET_TRANSLATION_KEY, GetTranslationKeys);
  yield takeLatest(CREATE_TRANSLATION_KEY, CreateTranslationKey);
  yield takeLatest(UPDATE_TRANSLATION_KEY, UpdateTranslationKey);
  yield takeLatest(DELETE_TRANSLATION_KEY, DeleteTranslationKey);
  yield takeEvery(START_AUTO_TRANSLATION, StartAutoTranslation);
  yield takeLatest(UPDATE_TRANSLATION_TEXT, UpdateTranslationText);
}

export default function* rootSaga() {
  yield all([fork(watchGetTranslationKey)]);
}
