/* eslint-disable camelcase */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api from '../../../ApiConfig';
import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_ALL_GROUP,
  UPDATE_GROUP,
} from '../../types/community/group';

import {
  createGroupError,
  createGroupSuccess,
  deleteGroupError,
  deleteGroupSuccess,
  getAllGroups,
  getAllGroupsError,
  getAllGroupsSuccess,
  updateGroupError,
  updateGroupSuccess,
} from './actions';

import objectToFormData from '../../../helpers/objectToFormData';

const getAllGroupsAsync = async ({ payload }) => {
  return api
    .get(`/admin/community-groups?page=${payload.page}&limit=${payload.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllGroups(payload) {
  try {
    const result = yield call(getAllGroupsAsync, payload);
    if (result.status) {
      yield put(getAllGroupsSuccess(result.data?.all_groups));
    } else {
      yield put(getAllGroupsError('Get All Group Response is not success!'));
    }
  } catch (error) {
    yield put(getAllGroupsError('Get All Group Error !'));
  }
}

const createGroupAsync = async ({ payload }) => {
  const { community_id, invited_members, topics, ...reqObj } = payload;
  if (community_id) {
    reqObj.community_id = community_id;
  }
  if (invited_members?.length) {
    reqObj.invited_members = invited_members.reduce(
      (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
      ''
    );
  }
  if (topics?.length) {
    reqObj.topics = topics.reduce(
      (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
      ''
    );
  }

  return api
    .post(`/admin/community-groups`, objectToFormData(reqObj))
    .then((res) => res)
    .catch((error) => error);
};

function* CreateGroup(payload) {
  try {
    const result = yield call(createGroupAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createGroupSuccess(result.data.data));
      yield put(getAllGroups({ page: 1, limit: 1000 }));
    } else {
      yield put(createGroupError('Create Group Response is not success!'));
    }
  } catch (error) {
    yield put(createGroupError('Create Group Error !'));
  }
}

const updateGroupAsync = async ({ payload }) => {
  const { community_id, cover_page, topics, id, ...reqObj } = payload;
  if (community_id) {
    reqObj.community_id = community_id;
  }
  if (typeof cover_page !== 'string') {
    reqObj.cover_page = cover_page;
  }
  if (topics?.length) {
    reqObj.topics = topics.reduce(
      (prevVal, crntVal) => `${prevVal ? `${prevVal},` : ''}${crntVal}`,
      ''
    );
  }

  return api
    .put(`/admin/community-groups/${id}`, objectToFormData(reqObj))
    .then((res) => res)
    .catch((error) => error);
};

function* UpdateGroup(payload) {
  try {
    const result = yield call(updateGroupAsync, payload);
    if (result.status) {
      yield put(updateGroupSuccess(result.data.data));
      yield put(getAllGroups({ page: 1, limit: 1000 }));
    } else {
      yield put(updateGroupError('Update Group Response is not success!'));
    }
  } catch (error) {
    yield put(updateGroupError('Update Group Error !'));
  }
}

const deleteGroupAsync = async ({ payload }) => {
  return api
    .delete(`/admin/community-groups/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteGroup(payload) {
  try {
    const result = yield call(deleteGroupAsync, payload);
    if (result.status) {
      yield put(deleteGroupSuccess(result.data.data));
      yield put(getAllGroups({ page: 1, limit: 1000 }));
    } else {
      yield put(deleteGroupError('Delete Group Response is not success!'));
    }
  } catch (error) {
    yield put(deleteGroupError('Delete Group Error !'));
  }
}

export function* watchGetAllGroups() {
  yield takeEvery(GET_ALL_GROUP, GetAllGroups);
}
export function* watchCreateGroup() {
  yield takeEvery(CREATE_GROUP, CreateGroup);
}
export function* watchUpdateGroup() {
  yield takeEvery(UPDATE_GROUP, UpdateGroup);
}
export function* watchDeleteGroup() {
  yield takeEvery(DELETE_GROUP, DeleteGroup);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllGroups),
    fork(watchUpdateGroup),
    fork(watchCreateGroup),
    fork(watchDeleteGroup),
  ]);
}
