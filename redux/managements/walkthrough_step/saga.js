/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_WALKTHROUGH_STEP,
  DELETE_WALKTHROUGH_STEP,
  EXCHANGEWALKTHROUGHSTEPORDER,
  GET_WALKTHROUGH_STEP,
  UPDATE_WALKTHROUGH_STEP,
} from '../../types/managements/walkthrough_step';

import {
  createWalkthroughStepFailed,
  createWalkthroughStepSuccessful,
  deleteWalkthroughStepFailed,
  deleteWalkthroughStepSuccessful,
  exchangeWalkthroughStepOrderFailed,
  exchangeWalkthroughStepOrderSuccessful,
  getWalkthroughSteps,
  getWalkthroughStepsFailed,
  getWalkthroughStepsSuccessful,
  updateWalkthroughStepFailed,
  updateWalkthroughStepSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_walkthrough_steps
const getWalkthroughStepsAsync = () => {
  return get(
    `/admin/options/walkthrough-step`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetWalkthroughSteps() {
  try {
    const response = yield call(getWalkthroughStepsAsync);
    yield put(getWalkthroughStepsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getWalkthroughStepsFailed({ error, data: [] }));
  }
}

// create_walkthrough_step
const createWalkthroughStepAsync = (payload) => {
  return post('/admin/options/walkthrough-step', payload, {}, { notify: true });
};
function* CreateWalkthroughStep({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createWalkthroughStepAsync, payload);
    yield put(createWalkthroughStepSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getWalkthroughSteps());
  } catch (error) {
    yield put(createWalkthroughStepFailed(error));
  }
}

// update_walkthrough_step
const updateWalkthroughStepAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/walkthrough-step/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateWalkthroughStep({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateWalkthroughStepAsync, payload);
    yield put(updateWalkthroughStepSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getWalkthroughSteps());
  } catch (error) {
    yield put(updateWalkthroughStepFailed(error));
  }
}

// delete_walkthrough_step
const deleteWalkthroughStepAsync = (id) => {
  return del(`/admin/options/walkthrough-step/${id}`, {}, { notify: true });
};
// delete_walkthrough_step
function* DeleteWalkthroughStep({ payload }) {
  try {
    const response = yield call(deleteWalkthroughStepAsync, payload);
    yield put(deleteWalkthroughStepSuccessful(response.data));
    yield put(getWalkthroughSteps());
  } catch (error) {
    yield put(deleteWalkthroughStepFailed(error));
  }
}

// exchangewalkthroughsteporder
const exchangeWalkthroughStepOrderAsync = ({ id, ...payload }) => {
  return axiosPut(
    '/admin/options/walkthrough-step-order',
    payload,
    {},
    { notify: true }
  );
};
function* ExchangeWalkthroughStepOrder({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(exchangeWalkthroughStepOrderAsync, payload);
    yield put(exchangeWalkthroughStepOrderSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getWalkthroughSteps());
  } catch (error) {
    yield put(exchangeWalkthroughStepOrderFailed(error));
  }
}

export function* watchGetWalkthroughStep() {
  yield takeLatest(GET_WALKTHROUGH_STEP, GetWalkthroughSteps);
  yield takeLatest(CREATE_WALKTHROUGH_STEP, CreateWalkthroughStep);
  yield takeLatest(UPDATE_WALKTHROUGH_STEP, UpdateWalkthroughStep);
  yield takeLatest(DELETE_WALKTHROUGH_STEP, DeleteWalkthroughStep);
  yield takeLatest(EXCHANGEWALKTHROUGHSTEPORDER, ExchangeWalkthroughStepOrder);
}

export default function* rootSaga() {
  yield all([fork(watchGetWalkthroughStep)]);
}
