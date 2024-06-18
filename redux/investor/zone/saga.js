/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { isArray } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  CREATE_INVESTOR_ZONE,
  DELETE_INVESTOR_ZONE,
  GET_INVESTOR_ZONES,
  UPDATE_INVESTOR_ZONE,
} from '../../types/investor/zone';

import {
  createInvestorZoneFailed,
  createInvestorZoneSuccessful,
  deleteInvestorZoneFailed,
  deleteInvestorZoneSuccessful,
  getInvestorZones,
  getInvestorZonesFailed,
  getInvestorZonesSuccessful,
  updateInvestorZoneFailed,
  updateInvestorZoneSuccessful,
} from './actions';

// create_investor_zone
const createInvestorZone = (payload) => {
  return post('/admin/investor/zone', payload, {}, { notify: true });
};
function* CreateInvestorZone({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createInvestorZone, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createInvestorZoneSuccessful(response.data));
      yield put(getInvestorZones());
      onSuccess?.();
    } else {
      throw new Error('Create zone Response is not success!');
    }
  } catch (error) {
    yield put(createInvestorZoneFailed(error));
  }
}

// get_investor_zones
const getInvestorZonesAsync = () => {
  return api.get(`/admin/investor/zone`);
};
function* GetInvestorZones() {
  const response = yield call(getInvestorZonesAsync);
  try {
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getInvestorZonesSuccessful({
          data: isArray(response.data) ? response.data : [],
        })
      );
    } else {
      throw new Error('Create zone Response is not success!');
    }
  } catch (error) {
    yield put(getInvestorZonesFailed({ error, data: [] }));
  }
}

// delete_investor_zone
const deleteInvestorZone = (id) => {
  return del(`/admin/investor/zone/${id}`, {}, { notify: true });
};
function* DeleteInvestorZone({ payload }) {
  try {
    const response = yield call(deleteInvestorZone, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteInvestorZoneSuccessful(response.data));
      yield put(getInvestorZones());
    } else {
      throw new Error('Delete zone Response is not success!');
    }
  } catch (error) {
    yield put(deleteInvestorZoneFailed(error));
  }
}

// update_investor_zone
const updateInvestorZoneAsync = ({ id, ...payload }) => {
  return axiosPut(`/admin/investor/zone/${id}`, payload, {}, { notify: true });
};
function* UpdateInvestorZone({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateInvestorZoneAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateInvestorZoneSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getInvestorZones());
    } else {
      throw new Error('UpdateInvestorZone Response is not success!');
    }
  } catch (error) {
    yield put(updateInvestorZoneFailed(error));
  }
}

export function* watchZone() {
  yield takeLatest(CREATE_INVESTOR_ZONE, CreateInvestorZone);
  yield takeLatest(GET_INVESTOR_ZONES, GetInvestorZones);
  yield takeLatest(DELETE_INVESTOR_ZONE, DeleteInvestorZone);
  yield takeLatest(UPDATE_INVESTOR_ZONE, UpdateInvestorZone);
}

export default function* rootSaga() {
  yield all([fork(watchZone)]);
}
