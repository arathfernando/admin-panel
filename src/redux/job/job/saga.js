/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_JOB,
  DELETE_JOB,
  GET_JOB,
  UPDATE_JOB,
} from '../../types/job/job';

import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  createJobFailed,
  createJobSuccessful,
  deleteJobFailed,
  deleteJobSuccessful,
  getJobs,
  getJobsFailed,
  getJobsSuccessful,
  updateJobFailed,
  updateJobSuccessful,
} from './actions';

// get_job
const getJobsAsync = () => {
  return get(
    `/admin/job`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetJobs() {
  try {
    const response = yield call(getJobsAsync);
    yield put(getJobsSuccessful({ ...response.data }));
  } catch (error) {
    yield put(getJobsFailed({ error, data: [] }));
  }
}

// create_job
const createJobAsync = (payload) => {
  return post('/admin/job', payload, {}, { notify: true });
};
function* CreateJob({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createJobAsync, payload);
    yield put(createJobSuccessful(response.data));
    yield put(getJobs());
    onSuccess?.(response.data);
  } catch (error) {
    yield put(createJobFailed(error));
  }
}

// update_job
const updateJobAsync = ({ id, ...payload }) => {
  return axiosPut(`/admin/job/${id}`, payload, {}, { notify: true });
};
function* UpdateJob({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateJobAsync, payload);
    yield put(updateJobSuccessful(response.data));
    yield put(getJobs());
    onSuccess?.(response.data);
  } catch (error) {
    yield put(updateJobFailed(error));
  }
}

// delete_job
const deleteJobAsync = (id) => {
  return del(`/admin/job/${id}`, {}, { notify: true });
};
// delete_job
function* DeleteJob({ payload }) {
  try {
    const response = yield call(deleteJobAsync, payload);
    yield put(deleteJobSuccessful(response.data));
    yield put(getJobs());
  } catch (error) {
    yield put(deleteJobFailed(error));
  }
}

export function* watchGetJob() {
  yield takeLatest(GET_JOB, GetJobs);
  yield takeLatest(CREATE_JOB, CreateJob);
  yield takeLatest(UPDATE_JOB, UpdateJob);
  yield takeLatest(DELETE_JOB, DeleteJob);
}

export default function* rootSaga() {
  yield all([fork(watchGetJob)]);
}
