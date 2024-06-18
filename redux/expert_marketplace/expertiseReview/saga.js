/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_EXPERTISE_REVIEW,
  DELETE_EXPERTISE_REVIEW,
  GET_EXPERTISE_REVIEW,
  UPDATE_EXPERTISE_REVIEW,
} from '../../types/expert_marketplace/expertiseReviewTypes';
import {
  createExpertiseReviewFailed,
  createExpertiseReviewSuccessful,
  deleteExpertiseReviewFailed,
  deleteExpertiseReviewSuccessful,
  getExpertiseReviews,
  getExpertiseReviewsFailed,
  getExpertiseReviewsSuccessful,
  updateExpertiseReviewFailed,
  updateExpertiseReviewSuccessful,
} from './actions';

// get_expertise_review
const getExpertiseReviewsAsync = () => {
  return get(
    `/admin/market-place/all/feedback`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true, notifyWarn: false }
  );
};
function* GetExpertiseReviews() {
  try {
    const response = yield call(getExpertiseReviewsAsync);
    yield put(getExpertiseReviewsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getExpertiseReviewsFailed({ error, data: [] }));
  }
}

// create_expertise_review
const createExpertiseReviewAsync = (payload) => {
  return post(
    '/admin/market-place/gig/{gig_id}/feedback',
    payload,
    {},
    { notify: true }
  );
};
function* CreateExpertiseReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createExpertiseReviewAsync, payload);
    yield put(createExpertiseReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getExpertiseReviews());
  } catch (error) {
    yield put(createExpertiseReviewFailed(error));
  }
}

// update_expertise_review
const updateExpertiseReviewAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/market-place/gig/{gig_id}/feedback/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateExpertiseReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateExpertiseReviewAsync, payload);
    yield put(updateExpertiseReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getExpertiseReviews());
  } catch (error) {
    yield put(updateExpertiseReviewFailed(error));
  }
}

// delete_expertise_review
const deleteExpertiseReviewAsync = (id) => {
  return del(`/admin/market-place/gig/feedback/${id}`, {}, { notify: true });
};
// delete_expertise_review
function* DeleteExpertiseReview({ payload }) {
  try {
    const response = yield call(deleteExpertiseReviewAsync, payload);
    yield put(deleteExpertiseReviewSuccessful(response.data));
    yield put(getExpertiseReviews());
  } catch (error) {
    yield put(deleteExpertiseReviewFailed(error));
  }
}

export function* watchExpertise() {
  yield takeLatest(GET_EXPERTISE_REVIEW, GetExpertiseReviews);
  yield takeLatest(CREATE_EXPERTISE_REVIEW, CreateExpertiseReview);
  yield takeLatest(UPDATE_EXPERTISE_REVIEW, UpdateExpertiseReview);
  yield takeLatest(DELETE_EXPERTISE_REVIEW, DeleteExpertiseReview);
}

export default function* rootSaga() {
  yield all([fork(watchExpertise)]);
}
