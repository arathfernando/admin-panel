/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_SKILL,
  DELETE_SKILL,
  GET_SKILL,
  UPDATE_SKILL,
} from '../../types/options/skill';

import {
  createSkillFailed,
  createSkillSuccessful,
  deleteSkillFailed,
  deleteSkillSuccessful,
  getSkills,
  getSkillsFailed,
  getSkillsSuccessful,
  updateSkillFailed,
  updateSkillSuccessful,
} from './actions';

// get_skill
const getSkillsAsync = () => {
  return get(
    `/admin/job/all-job/skill`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetSkills() {
  try {
    const response = yield call(getSkillsAsync);
    yield put(getSkillsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getSkillsFailed({ error, data: [] }));
  }
}

// create_skill
const createSkillAsync = ({ translate, ...payload }) => {
  return post('/admin/job/skill', payload, {}, { notify: true, translate });
};
function* CreateSkill({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createSkillAsync, payload);
    yield put(createSkillSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getSkills());
  } catch (error) {
    yield put(createSkillFailed(error));
  }
}

// update_skill
const updateSkillAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/job/skill/${id}`,
    payload,
    {},
    { notify: true, translate }
  );
};
function* UpdateSkill({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateSkillAsync, payload);
    yield put(updateSkillSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getSkills());
  } catch (error) {
    yield put(updateSkillFailed(error));
  }
}

// delete_skill
const deleteSkillAsync = ({ id, translate }) => {
  return del(`/admin/job/skill/${id}`, {}, { notify: true, translate });
};
// delete_skill
function* DeleteSkill({ payload }) {
  try {
    const response = yield call(deleteSkillAsync, payload);
    yield put(deleteSkillSuccessful(response.data));
    yield put(getSkills());
  } catch (error) {
    yield put(deleteSkillFailed(error));
  }
}

export default function* workspaceCategorySaga() {
  yield takeLatest(GET_SKILL, GetSkills);
  yield takeLatest(CREATE_SKILL, CreateSkill);
  yield takeLatest(UPDATE_SKILL, UpdateSkill);
  yield takeLatest(DELETE_SKILL, DeleteSkill);
}
