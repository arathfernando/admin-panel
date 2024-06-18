import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_MODULE_TYPE,
  DELETE_MODULE_TYPE,
  GET_ALL_MODULE_TYPE,
  UPDATE_MODULE_TYPE,
} from '../../types/module/moduleType';

import {
  createModuleTypeError,
  createModuleTypeSuccess,
  deleteModuleTypeError,
  deleteModuleTypeSuccess,
  getAllModuleType,
  getAllModuleTypeError,
  getAllModuleTypeSuccess,
  updateModuleTypeError,
  updateModuleTypeSuccess,
} from './actions';

const getAllModuleTypeAsync = async () => {
  return api
    .get(`/admin/options/module-type`)
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllModuleType() {
  try {
    const result = yield call(getAllModuleTypeAsync);
    if (result.status) {
      yield put(getAllModuleTypeSuccess(result.data));
    } else {
      yield put(
        getAllModuleTypeError('Get All Module Type Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllModuleTypeError('Get All Module Type Error !'));
  }
}

const createModuleTypeAsync = async ({ payload }) => {
  return api
    .post(`/admin/options/module-type`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};
function* CreateModuleType(payload) {
  try {
    const result = yield call(createModuleTypeAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createModuleTypeSuccess(result.data));
      yield put(getAllModuleType());
    } else {
      yield put(
        createModuleTypeError('Create Module Type Response is not success!')
      );
    }
  } catch (error) {
    yield put(createModuleTypeError('Create Module Type Error !'));
  }
}

const updateModuleTypeAsync = async ({
  payload: { id, image, ...payload },
}) => {
  if (image && typeof image !== 'string') {
    payload.image = image;
  }
  return api
    .put(`/admin/options/module-type/${id}`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};
function* UpdateModuleType(payload) {
  try {
    const result = yield call(updateModuleTypeAsync, payload);
    if (result.status) {
      yield put(updateModuleTypeSuccess(result.data));
      yield put(getAllModuleType());
    } else {
      yield put(
        updateModuleTypeError('Update Module Type Response is not success!')
      );
    }
  } catch (error) {
    yield put(updateModuleTypeError('Update Module Type Error !'));
  }
}

const deleteModuleTypeAsync = async (payload) => {
  return api
    .delete(`/admin/options/module-type/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};
function* DeleteModuleType(payload) {
  try {
    const result = yield call(deleteModuleTypeAsync, payload);
    if (result.status) {
      yield put(deleteModuleTypeSuccess(result.data));
      yield put(getAllModuleType());
    } else {
      yield put(
        deleteModuleTypeError('Delete Module Type Response is not success!')
      );
    }
  } catch (error) {
    yield put(deleteModuleTypeError('Delete Module Type Error !'));
  }
}

export function* watchGetAllModuleType() {
  yield takeEvery(GET_ALL_MODULE_TYPE, GetAllModuleType);
}
export function* watchCreateModuleType() {
  yield takeEvery(CREATE_MODULE_TYPE, CreateModuleType);
}
export function* watchUpdateModuleType() {
  yield takeEvery(UPDATE_MODULE_TYPE, UpdateModuleType);
}
export function* watchDeleteModuleType() {
  yield takeEvery(DELETE_MODULE_TYPE, DeleteModuleType);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllModuleType),
    fork(watchCreateModuleType),
    fork(watchUpdateModuleType),
    fork(watchDeleteModuleType),
  ]);
}
