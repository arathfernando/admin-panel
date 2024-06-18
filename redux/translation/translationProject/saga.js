/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_TRANSLATION_PROJECT,
  DELETE_TRANSLATION_PROJECT,
  GET_TRANSLATION_PROJECT,
  UPDATE_TRANSLATION_PROJECT,
} from '../../types/translation/translation_project';

import {
  createTranslationProjectFailed,
  createTranslationProjectSuccessful,
  deleteTranslationProjectFailed,
  deleteTranslationProjectSuccessful,
  getTranslationProjects,
  getTranslationProjectsFailed,
  getTranslationProjectsSuccessful,
  updateTranslationProjectFailed,
  updateTranslationProjectSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_translation_projects
const getTranslationProjectsAsync = () => {
  return get(`/admin/options/translation-project`, {}, { notifyError: true });
};
function* GetTranslationProjects() {
  try {
    const response = yield call(getTranslationProjectsAsync);
    yield put(getTranslationProjectsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getTranslationProjectsFailed({ error, data: [] }));
  }
}

// create_translation_project
const createTranslationProjectAsync = (payload) => {
  return post(
    '/admin/options/translation-project',
    payload,
    {},
    { notify: true }
  );
};
function* CreateTranslationProject({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createTranslationProjectAsync, payload);
    yield put(createTranslationProjectSuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationProjects());
  } catch (error) {
    yield put(createTranslationProjectFailed(error));
  }
}

// update_translation_project
const updateTranslationProjectAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/translation-project/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateTranslationProject({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateTranslationProjectAsync, payload);
    yield put(updateTranslationProjectSuccessful(response.data));
    onSuccess?.(response);
    yield put(getTranslationProjects());
  } catch (error) {
    yield put(updateTranslationProjectFailed(error));
  }
}

// delete_translation_project
const deleteTranslationProjectAsync = (id) => {
  return del(`/admin/options/translation-project/${id}`, {}, { notify: true });
};
// delete_translation_project
function* DeleteTranslationProject({ payload }) {
  try {
    const response = yield call(deleteTranslationProjectAsync, payload);
    yield put(deleteTranslationProjectSuccessful(response.data));
    yield put(getTranslationProjects());
  } catch (error) {
    yield put(deleteTranslationProjectFailed(error));
  }
}

export function* watchGetTranslationProject() {
  yield takeLatest(GET_TRANSLATION_PROJECT, GetTranslationProjects);
  yield takeLatest(CREATE_TRANSLATION_PROJECT, CreateTranslationProject);
  yield takeLatest(UPDATE_TRANSLATION_PROJECT, UpdateTranslationProject);
  yield takeLatest(DELETE_TRANSLATION_PROJECT, DeleteTranslationProject);
}

export default function* rootSaga() {
  yield all([fork(watchGetTranslationProject)]);
}
