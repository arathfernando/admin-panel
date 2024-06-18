import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_COMMUNITY,
  DELETE_COMMUNITY,
  GET_ALL_COMMUNITY,
  GET_ALL_COMMUNITY_ROLE,
  GET_COMMUNITY_LIST_BY_ROLE,
  GET_SINGLE_COMMUNITY,
  UPDATE_COMMUNITY,
} from '../../types/community/community-all';

import {
  createCommunityError,
  createCommunitySuccess,
  deleteCommunityError,
  deleteCommunitySuccess,
  getAllCommunity,
  getAllCommunityError,
  getAllCommunityRoleError,
  getAllCommunityRoleSuccess,
  getAllCommunitySuccess,
  getCommunityListByRoleError,
  getCommunityListByRoleSuccess,
  getSingleCommunityError,
  getSingleCommunitySuccess,
  updateCommunityError,
  updateCommunitySuccess,
} from './actions';

const getAllCommunityRoleAsync = async () =>
  /* eslint-disable */
  await api
    .get(`/community/role`)
    .then((res) => res)
    .catch((error) => error);
/* eslint-enable */

function* GetAllCommunityRole() {
  try {
    const result = yield call(getAllCommunityRoleAsync);
    if (result.status) {
      yield put(getAllCommunityRoleSuccess(result.data.data));
    } else {
      yield put(getAllCommunityRoleError('Failed to get all community roles!'));
    }
  } catch (error) {
    yield put(getAllCommunityRoleError('Failed to get all community roles!'));
  }
}

const getCommunityListByRoleAsync = async (payload) =>
  /* eslint-disable */
  await api
    .get(`/community/c-g-list-by-role/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
/* eslint-enable */

function* GetCommunityListByRole(payload) {
  try {
    const result = yield call(getCommunityListByRoleAsync, payload);
    if (result.status) {
      yield put(getCommunityListByRoleSuccess(result.data.data));
    } else {
      yield put(
        getCommunityListByRoleError('Failed to get community list by roles!')
      );
    }
  } catch (error) {
    yield put(
      getCommunityListByRoleError('Failed to get community list by roles!')
    );
  }
}

const getAllCommunityAsync = async (data) => {
  return api
    .get(`/admin/community?page=${data.page}&limit=${data.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllCommunity({ payload }) {
  try {
    const result = yield call(getAllCommunityAsync, { page: 1, limit: 1000 });
    if (result.status) {
      yield put(getAllCommunitySuccess(result.data));
    } else {
      yield put(
        getAllCommunityError('Get All Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllCommunityError('Get All Community Error !'));
  }
}

const getSingleCommunityAsync = async (payload) =>
  /* eslint-disable */
  await api
    .get(`/community/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
/* eslint-enable */

function* GetSingleCommunity(payload) {
  try {
    const result = yield call(getSingleCommunityAsync, payload);
    if (result.status) {
      yield put(getSingleCommunitySuccess(result.data.data));
    } else {
      yield put(
        getSingleCommunityError('Get Single Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleCommunityError('Get Single Community Error !'));
  }
}

const createCommunityAsync = async ({ payload }) =>
  /* eslint-disable */
  await api
    .post(`/admin/community`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
/* eslint-enable */

function* CreateCommunity(payload) {
  try {
    const result = yield call(createCommunityAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createCommunitySuccess(result.data));
      yield put(getAllCommunity({ page: 1, limit: 1000 }));
    } else {
      yield put(
        createCommunityError('Create Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(createCommunityError('Create Community Error !'));
  }
}

const updateCommunityAsync = async ({ id, payload }) =>
  /* eslint-disable */
  await api
    .put(`/admin/community/${id}`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
/* eslint-enable */

function* UpdateCommunity(payload) {
  try {
    payload.id = payload.payload.id;
    delete payload.payload.id;
    const result = yield call(updateCommunityAsync, payload);
    if (result.status) {
      yield put(updateCommunitySuccess(result.data.message));
      yield put(getAllCommunity({ page: 1, limit: 1000 }));
    } else {
      yield put(
        updateCommunityError('Update Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(updateCommunityError('Update Community Error !'));
  }
}

const deleteCommunityAsync = async ({ payload }) => {
  return api
    .delete(`/admin/community/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteCommunity(payload) {
  try {
    const result = yield call(deleteCommunityAsync, payload);
    if (result.status) {
      yield put(deleteCommunitySuccess(result.data));
      yield put(getAllCommunity({ page: 1, limit: 1000 }));
    } else {
      yield put(
        deleteCommunityError('Delete Community Response is not success!')
      );
    }
  } catch (error) {
    yield put(deleteCommunityError('Delete Community Error !'));
  }
}

export function* watchGetAllCommunityRole() {
  yield takeEvery(GET_ALL_COMMUNITY_ROLE, GetAllCommunityRole);
}
export function* watchGetCommunityListByRole() {
  yield takeEvery(GET_COMMUNITY_LIST_BY_ROLE, GetCommunityListByRole);
}
export function* watchGetAllCommunity() {
  yield takeEvery(GET_ALL_COMMUNITY, GetAllCommunity);
}
export function* watchCreateCommunity() {
  yield takeEvery(CREATE_COMMUNITY, CreateCommunity);
}
export function* watchGetSingleCommunity() {
  yield takeEvery(GET_SINGLE_COMMUNITY, GetSingleCommunity);
}
export function* watchUpdateCommunity() {
  yield takeEvery(UPDATE_COMMUNITY, UpdateCommunity);
}
export function* watchDeleteCommunity() {
  yield takeEvery(DELETE_COMMUNITY, DeleteCommunity);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCommunityRole),
    fork(watchGetCommunityListByRole),
    fork(watchGetAllCommunity),
    fork(watchCreateCommunity),
    fork(watchGetSingleCommunity),
    fork(watchUpdateCommunity),
    fork(watchDeleteCommunity),
  ]);
}
