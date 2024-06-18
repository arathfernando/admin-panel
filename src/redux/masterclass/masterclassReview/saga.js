/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_MASTERCLASS_REVIEW,
  DELETE_MASTERCLASS_REVIEW,
  GET_MASTERCLASS_REVIEW,
  UPDATE_MASTERCLASS_REVIEW,
} from '../../types/masterclass/masterclassReviewTypes';

import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  createMasterclassReviewFailed,
  createMasterclassReviewSuccessful,
  deleteMasterclassReviewFailed,
  deleteMasterclassReviewSuccessful,
  getMasterclassReviews,
  getMasterclassReviewsFailed,
  getMasterclassReviewsSuccessful,
  updateMasterclassReviewFailed,
  updateMasterclassReviewSuccessful,
} from './actions';

// get_masterclass_review
const getMasterclassReviewsAsync = () => {
  return get(
    `/admin/course/all/course/rating`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetMasterclassReviews() {
  try {
    const response = yield call(getMasterclassReviewsAsync);
    yield put(getMasterclassReviewsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getMasterclassReviewsFailed({ error, data: [] }));
  }
}

// create_masterclass_review
const createMasterclassReviewAsync = (payload) => {
  return post('/admin/course/course/rating', payload, {}, { notify: true });
};
function* CreateMasterclassReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createMasterclassReviewAsync, payload);
    yield put(createMasterclassReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getMasterclassReviews());
  } catch (error) {
    yield put(createMasterclassReviewFailed(error));
  }
}

// update_masterclass_review
const updateMasterclassReviewAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/course/course/rating/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateMasterclassReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateMasterclassReviewAsync, payload);
    yield put(updateMasterclassReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getMasterclassReviews());
  } catch (error) {
    yield put(updateMasterclassReviewFailed(error));
  }
}

// delete_masterclass_review
const deleteMasterclassReviewAsync = (id) => {
  return del(`/admin/course/course/rating/${id}`, {}, { notify: true });
};
// delete_masterclass_review
function* DeleteMasterclassReview({ payload }) {
  try {
    const response = yield call(deleteMasterclassReviewAsync, payload);
    yield put(deleteMasterclassReviewSuccessful(response.data));
    yield put(getMasterclassReviews());
  } catch (error) {
    yield put(deleteMasterclassReviewFailed(error));
  }
}

export function* watchMasterclass() {
  yield takeLatest(GET_MASTERCLASS_REVIEW, GetMasterclassReviews);
  yield takeLatest(CREATE_MASTERCLASS_REVIEW, CreateMasterclassReview);
  yield takeLatest(UPDATE_MASTERCLASS_REVIEW, UpdateMasterclassReview);
  yield takeLatest(DELETE_MASTERCLASS_REVIEW, DeleteMasterclassReview);
}

export default function* rootSaga() {
  yield all([fork(watchMasterclass)]);
}
