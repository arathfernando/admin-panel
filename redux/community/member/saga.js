/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, post } from '../../../ApiConfig';
import {
  CREATE_MEMBER,
  DELETE_MEMBER,
  GET_ALL_MEMBER,
  GET_MEMBER_LIST_BY_COMMUNITY,
  UPDATE_MEMBER,
} from '../../types/community/member';
import { getAllCommunity } from '../all/actions';

import {
  createMemberError,
  createMemberSuccess,
  deleteMemberError,
  deleteMemberSuccess,
  getAllMemberError,
  getAllMemberSuccess,
  getMemberListByCommunity,
  getMemberListByCommunityError,
  getMemberListByCommunitySuccess,
  updateMemberError,
  updateMemberSuccess,
} from './actions';

const getMemberListByCommunityAsync = async ({ payload }) => {
  return api.get(`/admin/community/members/${payload}`, {
    params: { page: 1, limit: 1000 },
  });
};

function* GetMemberListByCommunity(payload) {
  try {
    const result = yield call(getMemberListByCommunityAsync, payload);
    if (result.status) {
      yield put(
        getMemberListByCommunitySuccess({
          data: result.data?.all_members || [],
          communityId: payload.payload,
        })
      );
    } else {
      yield put(
        getMemberListByCommunityError('Failed to get members by community!')
      );
    }
  } catch (error) {
    yield put(
      getMemberListByCommunityError('Failed to get members by community!')
    );
  }
}

const getAllMemberAsync = async ({ payload }) => {
  return api
    .get(`/admin/community-members?page=${payload.page}&limit=${payload.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllMember(payload) {
  try {
    const result = yield call(getAllMemberAsync, payload);
    if (result.status) {
      yield put(getAllMemberSuccess(result.data));
    } else {
      yield put(getAllMemberError('Get All Members Response is not success!'));
    }
  } catch (error) {
    yield put(getAllMemberError('Get All Members Error !'));
  }
}

const createMemberAsync = async (payload) => {
  return post(
    `/admin/community/community/members`,
    {
      ...payload,
    },
    {},
    { notify: true }
  );
};

function* CreateMember({ payload }) {
  try {
    const result = yield call(createMemberAsync, payload);
    yield put(createMemberSuccess(result.data));
    if (payload.community_id) {
      yield put(getMemberListByCommunity(payload.community_id));
    } else {
      yield put(getAllCommunity({ page: 1, limit: 1000 }));
    }
  } catch (error) {
    yield put(createMemberError('Create Member Error !'));
  }
}

const updateMemberAsync = async ({ id, ...payload }) => {
  return axiosPut(
    `/admin/community/community/members/${id}`,
    {
      ...payload,
    },
    {},
    { notify: true }
  );
};

function* UpdateMember({ payload }) {
  try {
    const result = yield call(updateMemberAsync, payload);
    if (result.status) {
      yield put(updateMemberSuccess(result.data));
      if (payload.community_id) {
        yield put(getMemberListByCommunity(payload.community_id));
      } else {
        yield put(getAllCommunity({ page: 1, limit: 1000 }));
      }
    } else {
      yield put(updateMemberError('Update Member Response is not success!'));
    }
  } catch (error) {
    yield put(updateMemberError('Update Member Error !'));
  }
}

const deleteMemberAsync = async (payload) => {
  return api
    .delete(`/admin/community-members/${payload.payload.id}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteMember(payload) {
  try {
    const result = yield call(deleteMemberAsync, payload);
    if (result.status) {
      yield put(deleteMemberSuccess(result.data));
      // yield put(getMemberListByCommunity(payload.payload.community?.id));
      const communityId = yield select(({ member }) => member.communityId);
      if (communityId) {
        yield put(getMemberListByCommunity(communityId));
      } else {
        yield put(getAllCommunity({ page: 1, limit: 1000 }));
      }
    } else {
      yield put(deleteMemberError('Delete Member Response is not success!'));
    }
  } catch (error) {
    yield put(deleteMemberError('Delete Member Error !'));
  }
}

export function* watchGetMemberListByCommunity() {
  yield takeEvery(GET_MEMBER_LIST_BY_COMMUNITY, GetMemberListByCommunity);
}
export function* watchGetAllMember() {
  yield takeEvery(GET_ALL_MEMBER, GetAllMember);
}
export function* watchCreateMember() {
  yield takeEvery(CREATE_MEMBER, CreateMember);
}
export function* watchUpdateMember() {
  yield takeEvery(UPDATE_MEMBER, UpdateMember);
}
export function* watchDeleteMember() {
  yield takeEvery(DELETE_MEMBER, DeleteMember);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetMemberListByCommunity),
    fork(watchGetAllMember),
    fork(watchCreateMember),
    fork(watchUpdateMember),
    fork(watchDeleteMember),
  ]);
}
