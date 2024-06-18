/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { isArray } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  CREATE_INVESTOR_AREA,
  DELETE_INVESTOR_AREA,
  GET_INVESTOR_WORDWIDESHARES,
  UPDATE_INVESTOR_AREA,
} from '../../types/investor/worldwideShare';

import {
  createInvestorAreaFailed,
  createInvestorAreaSuccessful,
  deleteInvestorAreaFailed,
  deleteInvestorAreaSuccessful,
  getInvestorWorldwideShares,
  getInvestorWorldwideSharesFailed,
  getInvestorWorldwideSharesSuccessful,
  updateInvestorAreaFailed,
  updateInvestorAreaSuccessful,
} from './actions';

// create_investor_area
const createInvestorArea = (payload) => {
  return post('/admin/investor/share-area', payload, {}, { notify: true });
};
function* CreateInvestorArea({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createInvestorArea, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createInvestorAreaSuccessful(response.data));
      yield put(getInvestorWorldwideShares());
      onSuccess?.();
    } else {
      throw new Error('Create worldwideShare Response is not success!');
    }
  } catch (error) {
    yield put(createInvestorAreaFailed(error));
  }
}

// get_investor_worldwideShares
const getInvestorWorldwideSharesAsync = () => {
  return api.get(`/admin/investor/share-area`);
};
function* GetInvestorWorldwideShares() {
  const response = yield call(getInvestorWorldwideSharesAsync);
  try {
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getInvestorWorldwideSharesSuccessful({
          data: isArray(response.data) ? response.data : [],
        })
      );
    } else {
      throw new Error('Create worldwideShare Response is not success!');
    }
  } catch (error) {
    yield put(getInvestorWorldwideSharesFailed({ error, data: [] }));
  }
}

// update_investor_area
const updateInvestorAreaAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/investor/share-area/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateInvestorArea({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateInvestorAreaAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateInvestorAreaSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getInvestorWorldwideShares());
    } else {
      throw new Error('UpdateInvestorArea Response is not success!');
    }
  } catch (error) {
    yield put(updateInvestorAreaFailed(error));
  }
}

// delete_investor_area
const deleteInvestorAreaAsync = (id) => {
  return del(`/admin/investor/share-area/${id}`, {}, { notify: true });
};
// delete_investor_area
function* DeleteInvestorArea({ payload }) {
  try {
    const response = yield call(deleteInvestorAreaAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteInvestorAreaSuccessful(response.data));
      yield put(getInvestorWorldwideShares());
    } else {
      throw new Error('DeleteInvestorArea Response is not success!');
    }
  } catch (error) {
    yield put(deleteInvestorAreaFailed(error));
  }
}

export function* watchWorldwideShare() {
  yield takeLatest(CREATE_INVESTOR_AREA, CreateInvestorArea);
  yield takeLatest(GET_INVESTOR_WORDWIDESHARES, GetInvestorWorldwideShares);
  yield takeLatest(UPDATE_INVESTOR_AREA, UpdateInvestorArea);
  yield takeLatest(DELETE_INVESTOR_AREA, DeleteInvestorArea);
}

export default function* rootSaga() {
  yield all([fork(watchWorldwideShare)]);
}
