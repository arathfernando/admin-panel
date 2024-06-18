import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';
import { createSocialSuccess } from '../../actions';

import {
  CREATE_SOCIAL,
  DELETE_SOCIAL,
  GET_ALL_SOCIAL,
  UPDATE_SOCIAL,
} from '../../types/social/social';

import {
  createSocialError,
  deleteSocialError,
  deleteSocialSuccess,
  getAllSocial,
  getAllSocialError,
  getAllSocialSuccess,
  updateSocialError,
  updateSocialSuccess,
} from './actions';

import objectToFormData from '../../../helpers/objectToFormData';

const getAllSocialAsync = async () => {
  return api
    .get(`/admin/options/social`)
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllSocial() {
  try {
    const result = yield call(getAllSocialAsync);
    if (result.status) {
      yield put(getAllSocialSuccess(result.data));
    } else {
      yield put(getAllSocialError('Faild to get all social!'));
    }
  } catch (error) {
    yield put(getAllSocialError('Faild to get all social!'));
  }
}

export function* watchGetAllSocial() {
  yield takeEvery(GET_ALL_SOCIAL, GetAllSocial);
}
const createSocialAsync = async ({ payload }) => {
  return post(`/admin/options/social`, objectToFormData(payload));
};

function* CreateSocial(payload) {
  try {
    const result = yield call(createSocialAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createSocialSuccess(result.data));
      yield put(getAllSocial());
    } else {
      yield put(createSocialError('Create Social Response is not success!'));
    }
  } catch (error) {
    yield put(createSocialError('Create Social Error !'));
  }
}

const updateSocialAsync = async ({ id, image, ...payload }) => {
  if (typeof image !== 'string') {
    payload.image = image;
  }
  return axiosPut(`/admin/options/social/${id}`, objectToFormData(payload));
};

function* UpdateSocial({ payload }) {
  try {
    const result = yield call(updateSocialAsync, payload);
    if (result.status) {
      yield put(updateSocialSuccess(result.data.data));
      yield put(getAllSocial());
    } else {
      yield put(updateSocialError('Update Social Response is not success!'));
    }
  } catch (error) {
    yield put(updateSocialError('Update Social Error !'));
  }
}

const deleteSocialAsync = async ({ payload }) => {
  return del(`/admin/options/social/${payload}`);
};

function* DeleteSocial(payload) {
  try {
    const result = yield call(deleteSocialAsync, payload);
    console.log('result =>', result);
    if (result.status) {
      yield put(deleteSocialSuccess(result.data.message));
      yield put(getAllSocial());
    } else {
      yield put(deleteSocialError('Delete Social Response is not success!'));
    }
  } catch (error) {
    yield put(deleteSocialError('Delete Social Error !'));
  }
}

export function* watchCreateSocial() {
  yield takeEvery(CREATE_SOCIAL, CreateSocial);
}
export function* watchUpdateSocial() {
  yield takeEvery(UPDATE_SOCIAL, UpdateSocial);
}
export function* watchDeleteSocial() {
  yield takeEvery(DELETE_SOCIAL, DeleteSocial);
}

export default function* rootSaga() {
  yield all([fork(watchGetAllSocial)]);
  yield all([fork(watchCreateSocial)]);
  yield all([fork(watchUpdateSocial)]);
  yield all([fork(watchDeleteSocial)]);
}
