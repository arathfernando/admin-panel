/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';

import {
  CREATE_CONTEST_CATEGORY,
  DELETE_CONTEST_CATEGORY,
  GET_ALL_CONTEST_CATEGORY,
  UPDATE_CONTEST_CATEGORY,
} from '../../types/options/contest-category';

import {
  createContestCategoryError,
  createContestCategorySuccess,
  deleteContestCategoryError,
  deleteContestCategorySuccess,
  getAllContestCategory,
  getAllContestCategoryError,
  getAllContestCategorySuccess,
  updateContestCategoryError,
  updateContestCategorySuccess,
} from './actions';

import objectToFormData from '../../../helpers/objectToFormData';

const getAllContestCategoryAsync = async () =>
  api
    .get(`/admin/options/contest-category/`)
    .then((res) => res)
    .catch((error) => error);

function* GetAllContestCategory() {
  try {
    const result = yield call(getAllContestCategoryAsync);
    if (result.status) {
      yield put(getAllContestCategorySuccess(result.data));
      yield put(getAllContestCategory());
    } else {
      yield put(
        getAllContestCategoryError('Get All Users Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllContestCategoryError('Get All Users Error !'));
  }
}

const createContestCategoryAsync = async ({ payload }) => {
  return api
    .post(`/admin/options/contest-category`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};

function* CreateContestCategory(data) {
  const result = yield call(createContestCategoryAsync, data);
  if (result.status === 201 && result.statusText === 'Created') {
    yield put(createContestCategorySuccess(result.data));
    yield put(getAllContestCategory());
  } else {
    yield put(
      createContestCategoryError('Create Contest Category is not success!')
    );
  }
}

const updateContestCategoryAsync = async ({
  payload: { id, image, ...payload },
}) => {
  if (typeof image !== 'string') {
    // eslint-disable-next-line no-param-reassign
    payload.image = image;
  }
  return api
    .put(`/admin/options/contest-category/${id}`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateContestCategory(data) {
  const result = yield call(updateContestCategoryAsync, data);
  if (result.status) {
    yield put(updateContestCategorySuccess(result.data));
    yield put(getAllContestCategory());
  } else {
    yield put(
      updateContestCategoryError('Update Contest Category is not success!')
    );
  }
}

const deleteContestCategoryAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/contest-category/${payload}`)
    .then((res) => res.data)
    .catch((error) => error);
};

function* DeleteContestCategory(data) {
  try {
    const result = yield call(deleteContestCategoryAsync, data);
    yield put(deleteContestCategorySuccess(data));
    yield put(getAllContestCategory());
  } catch (error) {
    deleteContestCategoryError('Delete Contest Category is not success!');
  }
}

export function* watchGetAllContestCategory() {
  yield takeEvery(GET_ALL_CONTEST_CATEGORY, GetAllContestCategory);
}
export function* watchCreateContestCategory() {
  yield takeEvery(CREATE_CONTEST_CATEGORY, CreateContestCategory);
}
export function* watchUpdateContestCategory() {
  yield takeEvery(UPDATE_CONTEST_CATEGORY, UpdateContestCategory);
}
export function* watchDeleteContestCategory() {
  yield takeEvery(DELETE_CONTEST_CATEGORY, DeleteContestCategory);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetAllContestCategory),
    fork(watchCreateContestCategory),
    fork(watchUpdateContestCategory),
    fork(watchDeleteContestCategory),
  ]);
}
