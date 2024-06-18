/* eslint-disable import/no-named-as-default-member */
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_CONTEST_TEMPLATE,
  DELETE_TEMPLATE,
  GET_CONTEST_TEMPLATES,
  UPDATE_CONTEST_TEMPLATE,
} from '../../types/contest/contestType';

import {
  createContestTemplateFailed,
  createContestTemplateSuccessful,
  deleteTemplateFailed,
  deleteTemplateSuccessful,
  getContestTemplates as getAllContestTemplates,
  getContestTemplatesFailed,
  getContestTemplatesSuccessful,
  updateContestTwmplateFailed,
  updateContestTwmplateSuccessful,
} from './actions';

// get_contest_templates
const getContestTemplates = () => {
  return api
    .get(`/admin/contest/all/contest-template`, {
      params: { page: 1, limit: 1000 },
    })
    .then((res) => res.data);
};
function* GetContestTemplates() {
  try {
    const response = yield call(getContestTemplates);
    yield put(getContestTemplatesSuccessful(response));
  } catch (error) {
    yield put(getContestTemplatesFailed(error));
  }
}

// create_contest_template
const createContestTemplate = (payload) => {
  return api.post(
    '/admin/contest/contest-template',
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateContestTemplate({ payload }) {
  try {
    const response = yield call(createContestTemplate, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(getAllContestTemplates());
    }
    yield put(createContestTemplateSuccessful(response.data));
  } catch (error) {
    yield put(createContestTemplateFailed(error));
  }
}

// update_contest_template
const updateContestTwmplate = ({ id, ...payload }) => {
  return api
    .put(
      `${`/admin/contest/contest-template/`}${id}`,
      objectToFormData(payload),
      {},
      { notify: true }
    )
    .then((res) => res.data);
};
function* UpdateContestTwmplate({ payload }) {
  try {
    const response = yield call(updateContestTwmplate, payload);
    yield put(updateContestTwmplateSuccessful(response));
    if (response) {
      yield put(getAllContestTemplates());
    }
  } catch (error) {
    yield put(updateContestTwmplateFailed(error));
  }
}

// delete_template
const deleteTemplate = (id) => {
  return api.delete(`/admin/contest/contest-template/${id}`);
};
function* DeleteTemplate({ payload }) {
  try {
    const response = yield call(deleteTemplate, payload);
    yield put(deleteTemplateSuccessful(response.data));
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(getAllContestTemplates());
    }
  } catch (error) {
    yield put(deleteTemplateFailed(error));
  }
}

export function* watchTemplate() {
  yield takeEvery(GET_CONTEST_TEMPLATES, GetContestTemplates);
  yield takeLatest(CREATE_CONTEST_TEMPLATE, CreateContestTemplate);
  yield takeLatest(UPDATE_CONTEST_TEMPLATE, UpdateContestTwmplate);
  yield takeLatest(DELETE_TEMPLATE, DeleteTemplate);
}

export default function* rootSaga() {
  yield all([fork(watchTemplate)]);
}
