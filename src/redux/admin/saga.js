/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api, { axiosPut, del, get, post } from '../../ApiConfig';

import {
  CHANGE_ADMIN_PASSWORD,
  CREATE_ADMIN,
  DELETE_ADMIN,
  GET_ALL_PAGINATION_ADMIN,
  GET_CURRENT_ADMIN,
  UPDATE_ADMIN,
  UPDATE_CURRENT_ADMIN,
} from '../types/admin';

import {
  changeAdminPasswordFailed,
  changeAdminPasswordSuccessful,
  createAdminError,
  createAdminSuccess,
  deleteAdminError,
  deleteAdminSuccess,
  getAdminsByPagenation,
  getAdminsByPagenationErr,
  getAdminsByPagenationSuccess,
  getCurrentAdmin,
  getCurrentAdminFailed,
  getCurrentAdminSuccessful,
  updateAdminError,
  updateAdminSuccess,
  updateCurrentAdminData,
  updateCurrentAdminFailed,
  updateCurrentAdminSuccessful,
} from './actions';

import objectToFormData from '../../helpers/objectToFormData';

const createAdminAsync = async ({ payload }) => {
  return post(`/admin/admins`, objectToFormData(payload), {}, { notify: true });
};
function* CreateAdmin(payload) {
  try {
    const result = yield call(createAdminAsync, payload);
    yield put(createAdminSuccess(result.data));
    yield put(getAdminsByPagenation({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(createAdminError('Create Admin Error !'));
  }
}

const updateAdminAsync = async ({
  id,
  adminData: { profile_image, ...adminData },
}) => {
  if (profile_image && typeof profile_image !== 'string') {
    adminData.profile_image = profile_image;
  }
  return axiosPut(
    `/admin/admins/${id}`,
    objectToFormData(adminData),
    {},
    { notify: true }
  );
};
function* UpdateAdmin({ payload }) {
  try {
    const result = yield call(updateAdminAsync, payload);
    if (result.status) {
      yield put(updateAdminSuccess(result.data));
      yield put(getAdminsByPagenation({ page: 1, limit: 1000 }));
      if (result) {
        yield put(getCurrentAdmin());
      }
    } else {
      yield put(updateAdminError('Update Admin Response is not success!'));
    }
  } catch (error) {
    yield put(updateAdminError('Update Admin Error !'));
  }
}

const deleteAdminAsync = async (payload) => {
  return del(`/admin/admins/${payload}`, {}, { notify: true })
    .then((res) => res)
    .catch((error) => error);
};
function* DeleteAdmin({ payload }) {
  try {
    const result = yield call(deleteAdminAsync, payload);
    yield put(deleteAdminSuccess(result.data));
    yield put(getAdminsByPagenation({ page: 1, limit: 1000 }));
    if (result) {
      yield put(getCurrentAdmin());
    }
  } catch (error) {
    yield put(deleteAdminError('Delete Admin Error !'));
  }
}

const getAllAdminPaginationAsync = async (data) => {
  return api
    .get(`/admin/admins?page=${data.page}&limit=${data.limit}`)
    .then((res) => res)
    .catch((error) => error);
};
function* GetAdminsByPagenation({ payload }) {
  try {
    const result = yield call(getAllAdminPaginationAsync, payload);
    if (result.status) {
      yield put(getAdminsByPagenationSuccess(result.data));
    } else {
      yield put(
        getAdminsByPagenationErr('Get All Admin Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAdminsByPagenationErr('Get All Admin Error !'));
  }
}

// ------ current_admin ------
const getCurrentAdminAsync = () => {
  return get(`/admin/admin-users`);
};
function* getCurrentAdminData() {
  try {
    const response = yield call(getCurrentAdminAsync);
    yield put(getCurrentAdminSuccessful(response.data));
  } catch (error) {
    yield put(getCurrentAdminFailed(error));
  }
}

// update_user_data
const updateCurrentAdminAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/admin-users/${id}`,
    payload,
    {},
    { notifyError: true }
  );
};
function* UpdateUserData({ payload: { onSuccess, id, ...payload } }) {
  try {
    const response = yield call(updateCurrentAdminAsync, { id, ...payload });
    yield put(updateCurrentAdminSuccessful(response));
    onSuccess?.(response);
    yield put(updateCurrentAdminData(payload));
  } catch (error) {
    yield put(updateCurrentAdminFailed(error));
  }
}

// change_admin_password
const changeAdminPasswordAsync = ({ ...payload }) => {
  return axiosPut(`/admin/update-password`, payload, {}, { notify: true });
};
function* ChangeAdminPassword({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(changeAdminPasswordAsync, payload);
    yield put(changeAdminPasswordSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(changeAdminPasswordFailed(error));
  }
}

export function* watchGetAllAdminPagination() {
  yield takeEvery(GET_ALL_PAGINATION_ADMIN, GetAdminsByPagenation);
}
export function* watchCreateAdmin() {
  yield takeEvery(CREATE_ADMIN, CreateAdmin);
}
export function* watchUpdateAdmin() {
  yield takeEvery(UPDATE_ADMIN, UpdateAdmin);
}
export function* watchDeleteAdmin() {
  yield takeEvery(DELETE_ADMIN, DeleteAdmin);
}
export function* watchUserCurrentAdmin() {
  yield takeEvery(GET_CURRENT_ADMIN, getCurrentAdminData);
}
export function* watchChangeAdminPassword() {
  yield takeLatest(CHANGE_ADMIN_PASSWORD, ChangeAdminPassword);
}
export function* watchAdmin() {
  yield takeLatest(UPDATE_CURRENT_ADMIN, UpdateUserData);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllAdminPagination),
    fork(watchCreateAdmin),
    fork(watchUpdateAdmin),
    fork(watchDeleteAdmin),
    fork(watchUserCurrentAdmin),
    fork(watchChangeAdminPassword),
    fork(watchAdmin),
  ]);
}
