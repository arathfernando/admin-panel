/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_PERMISSION,
  DELETE_PERMISSION,
  GET_PERMISSION,
  UPDATE_PERMISSION,
} from '../../types/managements/permission';

import {
  createPermissionFailed,
  createPermissionSuccessful,
  deletePermissionFailed,
  deletePermissionSuccessful,
  getPermissions,
  getPermissionsFailed,
  getPermissionsSuccessful,
  updatePermissionFailed,
  updatePermissionSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_permission
const getPermissionsAsync = () => {
  return get(
    `/admin/options/admin-role`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetPermissions() {
  try {
    const response = yield call(getPermissionsAsync);
    yield put(getPermissionsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getPermissionsFailed({ error, data: [] }));
  }
}

// create_permission
const createPermissionAsync = (payload) => {
  return post('/admin/options/admin-role', payload, {}, { notify: true });
};
function* CreatePermission({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createPermissionAsync, payload);
    yield put(createPermissionSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getPermissions());
  } catch (error) {
    yield put(createPermissionFailed(error));
  }
}

// update_permission
const updatePermissionAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/admin-role/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdatePermission({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updatePermissionAsync, payload);
    yield put(updatePermissionSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getPermissions());
  } catch (error) {
    yield put(updatePermissionFailed(error));
  }
}

// delete_permission
const deletePermissionAsync = (id) => {
  return del(`/admin/options/admin-role/${id}`, {}, { notify: true });
};
// delete_permission
function* DeletePermission({ payload }) {
  try {
    const response = yield call(deletePermissionAsync, payload);
    yield put(deletePermissionSuccessful(response.data));
    yield put(getPermissions());
  } catch (error) {
    yield put(deletePermissionFailed(error));
  }
}

export function* watchGetPermission() {
  yield takeLatest(GET_PERMISSION, GetPermissions);
  yield takeLatest(CREATE_PERMISSION, CreatePermission);
  yield takeLatest(UPDATE_PERMISSION, UpdatePermission);
  yield takeLatest(DELETE_PERMISSION, DeletePermission);
}

export default function* rootSaga() {
  yield all([fork(watchGetPermission)]);
}
