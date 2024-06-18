/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_NATIONALITY,
  DELETE_NATIONALITY,
  GET_NATIONALITY,
  UPDATE_NATIONALITY,
} from '../../types/options/nationality';

import {
  createNationalitiesuccessful,
  createNationalityFailed,
  deleteNationalitiesuccessful,
  deleteNationalityFailed,
  getNationalities,
  getNationalitiesFailed,
  getNationalitiesSuccessful,
  updateNationalitiesuccessful,
  updateNationalityFailed,
} from './actions';

// get_nationality
const getNationalitiesAsync = () => {
  return get(`/admin/options/nationality`, {}, { notifyError: true });
};
function* GetNationalities() {
  try {
    const response = yield call(getNationalitiesAsync);
    yield put(getNationalitiesSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getNationalitiesFailed({ error, data: [] }));
  }
}

// create_nationality
const createNationalityAsync = ({ translate, ...payload }) => {
  return post(
    '/admin/options/nationality',
    payload,
    {},
    { notify: true, translate }
  );
};
function* CreateNationality({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createNationalityAsync, payload);
    yield put(createNationalitiesuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getNationalities());
  } catch (error) {
    yield put(createNationalityFailed(error));
  }
}

// update_nationality
const updateNationalityAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/options/nationality/${id}`,
    payload,
    {},
    { notify: true, translate }
  );
};
function* UpdateNationality({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateNationalityAsync, payload);
    yield put(updateNationalitiesuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getNationalities());
  } catch (error) {
    yield put(updateNationalityFailed(error));
  }
}

// delete_nationality
const deleteNationalityAsync = ({ id, translate }) => {
  return del(
    `/admin/options/nationality/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_nationality
function* DeleteNationality({ payload }) {
  try {
    const response = yield call(deleteNationalityAsync, payload);
    yield put(deleteNationalitiesuccessful(response.data));
    yield put(getNationalities());
  } catch (error) {
    yield put(deleteNationalityFailed(error));
  }
}

export default function* workspaceCategorySaga() {
  yield takeLatest(GET_NATIONALITY, GetNationalities);
  yield takeLatest(CREATE_NATIONALITY, CreateNationality);
  yield takeLatest(UPDATE_NATIONALITY, UpdateNationality);
  yield takeLatest(DELETE_NATIONALITY, DeleteNationality);
}
