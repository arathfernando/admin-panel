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
  CREATE_JOB_REVIEW,
  DELETE_JOB_REVIEW,
  GET_JOB_REVIEW,
  UPDATE_JOB_REVIEW,
} from '../../types/job/jobReviewTypes';
import {
  createJobReviewFailed,
  createJobReviewSuccessful,
  deleteJobReviewFailed,
  deleteJobReviewSuccessful,
  getJobReviews,
  getJobReviewsFailed,
  getJobReviewsSuccessful,
  updateJobReviewFailed,
  updateJobReviewSuccessful,
} from './actions';

// get_job_review
const getJobReviewsAsync = () => {
  return get(
    `/admin/job/all/user-expertise-review`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetJobReviews() {
  try {
    const response = yield call(getJobReviewsAsync);
    yield put(getJobReviewsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getJobReviewsFailed({ error, data: [] }));
  }
}

// create_job_review
const createJobReviewAsync = (payload) => {
  return post(
    '/admin/job/user-expertise-review',
    payload,
    {},
    { notify: true }
  );
};
function* CreateJobReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createJobReviewAsync, payload);
    yield put(createJobReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getJobReviews());
  } catch (error) {
    yield put(createJobReviewFailed(error));
  }
}

// update_job_review
const updateJobReviewAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/job/user-expertise-review/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateJobReview({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateJobReviewAsync, payload);
    yield put(updateJobReviewSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getJobReviews());
  } catch (error) {
    yield put(updateJobReviewFailed(error));
  }
}

// delete_job_review
const deleteJobReviewAsync = (id) => {
  return del(`/admin/job/user-expertise-review/${id}`, {}, { notify: true });
};
// delete_job_review
function* DeleteJobReview({ payload }) {
  try {
    const response = yield call(deleteJobReviewAsync, payload);
    yield put(deleteJobReviewSuccessful(response.data));
    yield put(getJobReviews());
  } catch (error) {
    yield put(deleteJobReviewFailed(error));
  }
}

export function* watchJob() {
  yield takeLatest(GET_JOB_REVIEW, GetJobReviews);
  yield takeLatest(CREATE_JOB_REVIEW, CreateJobReview);
  yield takeLatest(UPDATE_JOB_REVIEW, UpdateJobReview);
  yield takeLatest(DELETE_JOB_REVIEW, DeleteJobReview);
}

export default function* rootSaga() {
  yield all([fork(watchJob)]);
}
