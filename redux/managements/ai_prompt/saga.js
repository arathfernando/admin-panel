/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_AI_PROMPT,
  DELETE_AI_PROMPT,
  GET_AI_PROMPT,
  UPDATE_AI_PROMPT,
} from '../../types/managements/ai_prompt';

import {
  createAiPromptFailed,
  createAiPromptSuccessful,
  deleteAiPromptFailed,
  deleteAiPromptSuccessful,
  getAIPrompts,
  getAIPromptsFailed,
  getAIPromptsSuccessful,
  updateAiPromptFailed,
  updateAiPromptSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_ai_prompts
const getAIPromptsAsync = () => {
  return get(
    `/admin/options/prompt`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetAIPrompts() {
  try {
    const response = yield call(getAIPromptsAsync);
    yield put(getAIPromptsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getAIPromptsFailed({ error, data: [] }));
  }
}

// create_ai_prompt
const createAiPromptAsync = (payload) => {
  return post('/admin/options/prompt', payload, {}, { notify: true });
};
function* CreateAiPrompt({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createAiPromptAsync, payload);
    yield put(createAiPromptSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAIPrompts());
  } catch (error) {
    yield put(createAiPromptFailed(error));
  }
}

// update_ai_prompt
const updateAiPromptAsync = ({ id, ...payload }) => {
  return axiosPut(`/admin/options/prompt/${id}`, payload, {}, { notify: true });
};
function* UpdateAiPrompt({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateAiPromptAsync, payload);
    yield put(updateAiPromptSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getAIPrompts());
  } catch (error) {
    yield put(updateAiPromptFailed(error));
  }
}

// delete_ai_prompt
const deleteAiPromptAsync = (id) => {
  return del(`/admin/options/prompt/${id}`, {}, { notify: true });
};
// delete_ai_prompt
function* DeleteAiPrompt({ payload }) {
  try {
    const response = yield call(deleteAiPromptAsync, payload);
    yield put(deleteAiPromptSuccessful(response.data));
    yield put(getAIPrompts());
  } catch (error) {
    yield put(deleteAiPromptFailed(error));
  }
}

export function* watchGetAIPrompt() {
  yield takeLatest(GET_AI_PROMPT, GetAIPrompts);
  yield takeLatest(CREATE_AI_PROMPT, CreateAiPrompt);
  yield takeLatest(UPDATE_AI_PROMPT, UpdateAiPrompt);
  yield takeLatest(DELETE_AI_PROMPT, DeleteAiPrompt);
}

export default function* rootSaga() {
  yield all([fork(watchGetAIPrompt)]);
}
