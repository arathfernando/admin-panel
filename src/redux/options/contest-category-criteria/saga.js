/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_CONTEST_CATEGORY_CRITERIA,
  DELETE_CONTEST_CATEGORY_CRITERIA,
  GET_CONTEST_CATEGORY_CRITERIA,
  UPDATE_CONTEST_CATEGORY_CRITERIA,
} from '../../types/options/contest-category-criteria';

import {
  createContestCategoryCriteriaFailed,
  createContestCategoryCriteriaSuccessful,
  deleteContestCategoryCriteriaFailed,
  deleteContestCategoryCriteriaSuccessful,
  getContestCategoryCriterias,
  getContestCategoryCriteriasFailed,
  getContestCategoryCriteriasSuccessful,
  updateContestCategoryCriteriaFailed,
  updateContestCategoryCriteriaSuccessful,
} from './actions';

import { del, get, post } from '../../../ApiConfig';

// get_contest_category_criterias
const getContestCategoryCriteriasAsync = () => {
  return get(
    `/admin/default-criteria/contest-category`,
    {},
    { notifyError: true }
  );
};
function* GetContestCategoryCriterias() {
  try {
    const response = yield call(getContestCategoryCriteriasAsync);
    yield put(getContestCategoryCriteriasSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getContestCategoryCriteriasFailed({ error, data: [] }));
  }
}

// create_contest_category_criteria
const createContestCategoryCriteriaAsync = (payload) => {
  return post('/admin/default-criteria', payload, {}, { notify: true });
};
function* CreateContestCategoryCriteria({
  payload: { onSuccess, ...payload },
}) {
  try {
    const response = yield call(createContestCategoryCriteriaAsync, payload);
    yield put(createContestCategoryCriteriaSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getContestCategoryCriterias());
  } catch (error) {
    yield put(createContestCategoryCriteriaFailed(error));
  }
}

// update_contest_category_criteria
const updateContestCategoryCriteriaAsync = ({ ...payload }) => {
  return post('/admin/default-criteria', payload, {}, { notify: true });
};
function* UpdateContestCategoryCriteria({
  payload: { onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateContestCategoryCriteriaAsync, payload);
    yield put(updateContestCategoryCriteriaSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getContestCategoryCriterias());
  } catch (error) {
    yield put(updateContestCategoryCriteriaFailed(error));
  }
}

// delete_contest_category_criteria
const deleteContestCategoryCriteriaAsync = (id) => {
  return del(`/admin/default-criteria/${id}`, {}, { notify: true });
};
// delete_contest_category_criteria
function* DeleteContestCategoryCriteria({ payload }) {
  try {
    const response = yield call(deleteContestCategoryCriteriaAsync, payload);
    yield put(deleteContestCategoryCriteriaSuccessful(response.data));
    yield put(getContestCategoryCriterias());
  } catch (error) {
    yield put(deleteContestCategoryCriteriaFailed(error));
  }
}

export function* watchGetContestCategoryCriteria() {
  yield takeLatest(GET_CONTEST_CATEGORY_CRITERIA, GetContestCategoryCriterias);
  yield takeLatest(
    CREATE_CONTEST_CATEGORY_CRITERIA,
    CreateContestCategoryCriteria
  );
  yield takeLatest(
    UPDATE_CONTEST_CATEGORY_CRITERIA,
    UpdateContestCategoryCriteria
  );
  yield takeLatest(
    DELETE_CONTEST_CATEGORY_CRITERIA,
    DeleteContestCategoryCriteria
  );
}

export default function* rootSaga() {
  yield all([fork(watchGetContestCategoryCriteria)]);
}
