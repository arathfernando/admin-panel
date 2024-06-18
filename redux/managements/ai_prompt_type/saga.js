/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_AI_PROMPT_TYPE,
  DELETE_AI_PROMPT_TYPE,
  GET_AI_PROMPT_TYPE,
  UPDATE_AI_PROMPT_TYPE,
} from '../../types/managements/ai_prompt_type';

import {
  createAIPromptTypeFailed,
  createAIPromptTypeSuccessful,
  deleteAIPromptTypeFailed,
  deleteAIPromptTypeSuccessful,
  getAIPromptTypes,
  getAIPromptTypesFailed,
  getAIPromptTypesSuccessful,
  updateAIPromptTypeFailed,
  updateAIPromptTypeSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_ai_prompt_types
const getAIPromptTypesAsync = () => {
  return get(
    `/admin/options/prompt-type`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetAIPromptTypes() {
  try {
    const response = yield call(getAIPromptTypesAsync);
    yield put(getAIPromptTypesSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getAIPromptTypesFailed({ error, data: [] }));
  }
}

// create_ai_prompt_type
const createAIPromptTypeAsync = (payload) => {
  return post('/admin/options/prompt-type', payload, {}, { notify: true });
};
function* CreateAIPromptType({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createAIPromptTypeAsync, payload);
    yield put(createAIPromptTypeSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAIPromptTypes());
  } catch (error) {
    yield put(createAIPromptTypeFailed(error));
  }
}

// update_ai_prompt_type
const updateAIPromptTypeAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/prompt-type/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateAIPromptType({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateAIPromptTypeAsync, payload);
    yield put(updateAIPromptTypeSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAIPromptTypes());
  } catch (error) {
    yield put(updateAIPromptTypeFailed(error));
  }
}

// delete_ai_prompt_type
const deleteAIPromptTypeAsync = (id) => {
  return del(`/admin/options/prompt-type/${id}`, {}, { notify: true });
};
// delete_ai_prompt_type
function* DeleteAIPromptType({ payload }) {
  try {
    const response = yield call(deleteAIPromptTypeAsync, payload);
    yield put(deleteAIPromptTypeSuccessful(response.data));
    yield put(getAIPromptTypes());
  } catch (error) {
    yield put(deleteAIPromptTypeFailed(error));
  }
}

export function* watchGetAIPromptType() {
  yield takeLatest(GET_AI_PROMPT_TYPE, GetAIPromptTypes);
  yield takeLatest(CREATE_AI_PROMPT_TYPE, CreateAIPromptType);
  yield takeLatest(UPDATE_AI_PROMPT_TYPE, UpdateAIPromptType);
  yield takeLatest(DELETE_AI_PROMPT_TYPE, DeleteAIPromptType);
}

export default function* rootSaga() {
  yield all([fork(watchGetAIPromptType)]);
}
