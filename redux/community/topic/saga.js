import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  CREATE_TOPIC,
  DELETE_TOPIC,
  GET_ALL_TOPIC,
  GET_SINGLE_TOPIC,
  UPDATE_TOPIC,
} from '../../types/community/topic';

import {
  createTopicError,
  createTopicSuccess,
  deleteTopicError,
  deleteTopicSuccess,
  getAllTopics,
  getAllTopicsError,
  getAllTopicsSuccess,
  getSingleTopicError,
  getSingleTopicSuccess,
  updateTopicError,
  updateTopicSuccess,
} from './actions';

const getAllTopicsAsync = async ({ payload }) => {
  return api
    .get(`/admin/community-topics?page=${payload.page}&limit=${payload.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllTopics(payload) {
  try {
    const result = yield call(getAllTopicsAsync, payload);

    if (result.status) {
      yield put(getAllTopicsSuccess(result.data));
    } else {
      yield put(getAllTopicsError('Get All Topic Response is not success!'));
    }
  } catch (error) {
    yield put(getAllTopicsError('Get All Topic Error !'));
  }
}

const getSingleTopicAsync = async (payload) => {
  await api
    .get(`/community/topic/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleTopic(payload) {
  try {
    const result = yield call(getSingleTopicAsync, payload);
    if (result.status) {
      yield put(getSingleTopicSuccess(result.data.data));
    } else {
      yield put(
        getSingleTopicError('Get Single Topic Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleTopicError('Get Single Topic Error !'));
  }
}

const createTopicAsync = async ({ payload }) => {
  return post(`/admin/community-topics`, payload, {}, { notify: true });
};

function* CreateTopic(payload) {
  try {
    const result = yield call(createTopicAsync, payload);
    yield put(createTopicSuccess(result.data.data));
    yield put(getAllTopics({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(createTopicError('Create Topic Error !'));
  }
}

const updateTopicAsync = async ({ payload: { id, ...payload } }) => {
  return axiosPut(
    `/admin/community-topics/${id}`,
    payload,
    {},
    { notify: true }
  );
};

function* UpdateTopic(payload) {
  try {
    const result = yield call(updateTopicAsync, payload);
    yield put(updateTopicSuccess(result.data.data));
    yield put(getAllTopics({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(updateTopicError('Update Topic Error !'));
  }
}

const deleteTopicAsync = async (payload) => {
  return del(
    `/admin/community-topics/${payload.payload}`,
    {},
    { notify: true }
  );
};

function* DeleteTopic(payload) {
  try {
    const result = yield call(deleteTopicAsync, payload);
    yield put(deleteTopicSuccess(result.data.data));
    yield put(getAllTopics({ page: 1, limit: 1000 }));
  } catch (error) {
    yield put(deleteTopicError('Delete Topic Error !'));
  }
}

export function* watchGetAllTopics() {
  yield takeEvery(GET_ALL_TOPIC, GetAllTopics);
}
export function* watchCreateTopic() {
  yield takeEvery(CREATE_TOPIC, CreateTopic);
}
export function* watchGetSingleTopic() {
  yield takeEvery(GET_SINGLE_TOPIC, GetSingleTopic);
}
export function* watchUpdateTopic() {
  yield takeEvery(UPDATE_TOPIC, UpdateTopic);
}
export function* watchDeleteTopic() {
  yield takeEvery(DELETE_TOPIC, DeleteTopic);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllTopics),
    fork(watchGetSingleTopic),
    fork(watchUpdateTopic),
    fork(watchCreateTopic),
    fork(watchDeleteTopic),
  ]);
}
