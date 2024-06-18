/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  CREATE_COURSE_CATEGORY,
  DELETE_COURSE_CATEGORY,
  GET_COURSE_CATEGORYS,
  UPDATE_COURSE_CATEGORY,
} from '../../types/options/course';

import {
  createCourseCategoryError,
  createCourseCategorySuccess,
  deleteCourseCategoryError,
  deleteCourseCategorySuccess,
  getCourseCategorys,
  getCourseCategorysError,
  getCourseCategorysSuccess,
  updateCourseCategoryError,
  updateCourseCategorySuccess,
} from './actions';

const getAllCourseCategoryAsync = async () =>
  api
    .get(`/admin/options/course-category/`)
    .then((res) => res)
    .catch((error) => error);

function* GetAllCourseCategory() {
  try {
    const result = yield call(getAllCourseCategoryAsync);

    if (result.status) {
      yield put(getCourseCategorysSuccess(result.data));
    } else {
      yield put(getCourseCategorysError('Response is not success!'));
    }
  } catch (error) {
    yield put(getCourseCategorysError('Error !'));
  }
}

const createCourseCategoryAsync = async ({
  payload: { translate, ...payload },
}) => {
  return post(
    `/admin/options/course-category`,
    payload,
    {},
    { translate, notify: true }
  )
    .then((res) => res)
    .catch((error) => error);
};

function* CreateCourseCategory(data) {
  try {
    const result = yield call(createCourseCategoryAsync, data);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createCourseCategorySuccess(result.data));
      yield put(getCourseCategorys());
    } else {
      yield put(
        createCourseCategoryError('Create Contest Category is not success!')
      );
    }
  } catch (error) {}
}

const updateCourseCategoryAsync = async ({
  payload: { translate, ...payload },
}) => {
  const data = payload;
  const { id } = payload;
  delete data.id;
  return axiosPut(
    `/admin/options/course-category/${id}`,
    data,
    {},
    { notify: true, translate }
  );
};

function* UpdateCourseCategory(data) {
  try {
    const result = yield call(updateCourseCategoryAsync, data);
    if (result.status) {
      yield put(updateCourseCategorySuccess(result.data));
      yield put(getCourseCategorys());
    } else {
      yield put(
        updateCourseCategoryError('Update Contest Category is not success!')
      );
    }
  } catch (error) {}
}

const deleteCourseCategoryAsync = async ({ payload: { translate, id } }) => {
  return del(
    `/admin/options/course-category/${id}`,
    {},
    { notify: true, translate }
  );
};

function* DeleteCourseCategory(data) {
  try {
    const result = yield call(deleteCourseCategoryAsync, data);
    yield put(deleteCourseCategorySuccess(result));
    yield put(getCourseCategorys());
  } catch (error) {
    deleteCourseCategoryError('Delete Course Category is not success!');
  }
}

export function* watchGetAllCourseCategory() {
  yield takeEvery(GET_COURSE_CATEGORYS, GetAllCourseCategory);
}
export function* watchCreateCourseCategory() {
  yield takeEvery(CREATE_COURSE_CATEGORY, CreateCourseCategory);
}
export function* watchUpdateCourseCategory() {
  yield takeEvery(UPDATE_COURSE_CATEGORY, UpdateCourseCategory);
}
export function* watchDeleteCourseCategory() {
  yield takeEvery(DELETE_COURSE_CATEGORY, DeleteCourseCategory);
}
export default function* rootSaga() {
  yield all([
    fork(watchGetAllCourseCategory),
    fork(watchCreateCourseCategory),
    fork(watchUpdateCourseCategory),
    fork(watchDeleteCourseCategory),
  ]);
}
