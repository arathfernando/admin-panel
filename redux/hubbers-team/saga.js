/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../ApiConfig';

import {
  CREATE_HUBBERS_TEAM,
  DELETE_HUBBERS_TEAM,
  GET_ALL_HUBBERS_TEAM,
  ORDER_HUBBERS_TEAM,
  UPDATE_HUBBERS_TEAM,
} from '../types/hubbers-team';

import {
  createHubbersTeamError,
  createHubbersTeamSuccess,
  deleteHubbersTeamError,
  deleteHubbersTeamSuccess,
  getAllHubbersTeam,
  getAllHubbersTeamError,
  getAllHubbersTeamSuccess,
  orderHubbersTeamError,
  orderHubbersTeamSuccess,
  updateHubbersTeamError,
  updateHubbersTeamSuccess,
} from './actions';

const getAllHubbersTeamAsync = async () => {
  return api
    .get(`/admin/users/hubber-team-profile/get-all`, {
      params: { page: 1, limit: 1000 },
    })
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllHubbersTeam() {
  try {
    const result = yield call(getAllHubbersTeamAsync);
    if (result.status) {
      yield put(getAllHubbersTeamSuccess(result.data));
    } else {
      yield put(
        getAllHubbersTeamError('Get All HubbersTeam Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllHubbersTeamError('Get All HubbersTeam Error !'));
  }
}

const createHubbersTeamAsync = async ({ translate, ...payload }) => {
  return post(
    `/admin/users/hubber-team-profile`,
    {
      ...payload,
    },
    {},
    { translate, notify: true }
  );
};
function* CreateHubbersTeam({ payload }) {
  try {
    const result = yield call(createHubbersTeamAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createHubbersTeamSuccess(result.data.data));
      yield put(getAllHubbersTeam());
    } else {
      yield put(
        createHubbersTeamError('Create HubbersTeam Response is not success!')
      );
    }
  } catch (error) {
    yield put(createHubbersTeamError('Create HubbersTeam Error !'));
  }
}

const updateHubbersTeamAsync = async ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/users/hubber-team-profile/${id}`,
    {
      ...payload,
    },
    {},
    { translate, notify: true }
  );
};
function* UpdateHubbersTeam({ payload }) {
  try {
    const result = yield call(updateHubbersTeamAsync, payload);
    if (result.status) {
      yield put(updateHubbersTeamSuccess(result.data.data));
      yield put(getAllHubbersTeam());
    } else {
      yield put(
        updateHubbersTeamError('Update HubbersTeam Response is not success!')
      );
    }
  } catch (error) {
    yield put(updateHubbersTeamError('Update HubbersTeam Error !'));
  }
}

const deleteHubbersTeamAsync = async (payload) => {
  return del(
    `/admin/users/hubber-team-profile/remove/${payload.payload}`,
    {},
    { notify: true }
  );
};
function* DeleteHubbersTeam(payload) {
  try {
    const result = yield call(deleteHubbersTeamAsync, payload);
    if (result.status) {
      yield put(deleteHubbersTeamSuccess(result.data.data));
      yield put(getAllHubbersTeam());
    } else {
      yield put(
        deleteHubbersTeamError('Delete HubbersTeam Response is not success!')
      );
    }
  } catch (error) {
    yield put(deleteHubbersTeamError('Delete HubbersTeam Error !'));
  }
}

const orderHubbersTeamAsync = async (payload) => {
  return axiosPut(
    `/admin/users/hubber-team-profile/order`,
    payload,
    {},
    { notify: true }
  );
};
function* OrderHubbersTeam({ payload }) {
  try {
    const result = yield call(orderHubbersTeamAsync, payload);
    if (result.status) {
      yield put(
        orderHubbersTeamSuccess({
          orderUpId: payload.orderUpId,
          orderDownId: payload.orderDownId,
        })
      );
      yield put(getAllHubbersTeam());
    } else {
      yield put(
        orderHubbersTeamError('Order HubbersTeam Response is not success!')
      );
    }
  } catch (error) {
    yield put(orderHubbersTeamError('Order HubbersTeam Error !'));
  }
}

export function* watchGetAllHubbersTeam() {
  yield takeEvery(GET_ALL_HUBBERS_TEAM, GetAllHubbersTeam);
}
export function* watchCreateHubbersTeam() {
  yield takeEvery(CREATE_HUBBERS_TEAM, CreateHubbersTeam);
}
export function* watchUpdateHubbersTeam() {
  yield takeEvery(UPDATE_HUBBERS_TEAM, UpdateHubbersTeam);
}
export function* watchDeleteHubbersTeam() {
  yield takeEvery(DELETE_HUBBERS_TEAM, DeleteHubbersTeam);
}
export function* watchOrderHubbersTeam() {
  yield takeEvery(ORDER_HUBBERS_TEAM, OrderHubbersTeam);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllHubbersTeam),
    fork(watchCreateHubbersTeam),
    fork(watchUpdateHubbersTeam),
    fork(watchDeleteHubbersTeam),
    fork(watchOrderHubbersTeam),
  ]);
}
