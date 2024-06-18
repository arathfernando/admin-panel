/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  DELETE_WALKTHROUGH_CATEGORY,
  GET_WALKTHROUGH_CATEGORY,
  SUBMIT_WALKTHROUGH_CATEGORY,
} from '../../types/managements/walkthrough_category';

import {
  deleteWalkthroughCategoryFailed,
  deleteWalkthroughCategorySuccessful,
  getWalkthroughCategorys,
  getWalkthroughCategorysFailed,
  getWalkthroughCategorysSuccessful,
  submitWalkthroughCategoryFailed,
  submitWalkthroughCategorySuccessful,
} from './actions';

import { del, get, post } from '../../../ApiConfig';

// get_walkthrough_categorys
const getWalkthroughCategorysAsync = () => {
  return get(
    `/admin/options/walkthrough-category`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetWalkthroughCategorys() {
  try {
    const response = yield call(getWalkthroughCategorysAsync);
    yield put(getWalkthroughCategorysSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getWalkthroughCategorysFailed({ error, data: [] }));
  }
}

// submit_walkthrough_category
const submitWalkthroughCategoryAsync = ({ id, ...payload }) => {
  return post(
    `/admin/options/walkthrough-category`,
    payload,
    {},
    { notify: true }
  );
};
function* SubmitWalkthroughCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(submitWalkthroughCategoryAsync, payload);
    yield put(submitWalkthroughCategorySuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getWalkthroughCategorys());
  } catch (error) {
    yield put(submitWalkthroughCategoryFailed(error));
  }
}

// delete_walkthrough_category
const deleteWalkthroughCategoryAsync = (id) => {
  return del(`/admin/options/walkthrough-category/${id}`, {}, { notify: true });
};
// delete_walkthrough_category
function* DeleteWalkthroughCategory({ payload }) {
  try {
    const response = yield call(deleteWalkthroughCategoryAsync, payload);
    yield put(deleteWalkthroughCategorySuccessful(response.data));
    yield put(getWalkthroughCategorys());
  } catch (error) {
    yield put(deleteWalkthroughCategoryFailed(error));
  }
}

export function* watchGetWalkthroughCategory() {
  yield takeLatest(GET_WALKTHROUGH_CATEGORY, GetWalkthroughCategorys);
  yield takeLatest(SUBMIT_WALKTHROUGH_CATEGORY, SubmitWalkthroughCategory);
  yield takeLatest(DELETE_WALKTHROUGH_CATEGORY, DeleteWalkthroughCategory);
}

export default function* rootSaga() {
  yield all([fork(watchGetWalkthroughCategory)]);
}
