/* eslint-disable import/no-named-as-default-member */
import {
  all,
  call,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api, { del } from '../../../ApiConfig';

import {
  ADD_CONTEST_MEMBER,
  CONTEST_CONTESTANT_PERMISSION,
  GET_CONTEST_ACCEPTED_CONTESTANTS,
  GET_CONTEST_ACCEPTED_JUDGES,
  GET_CONTEST_PENDING_CONTESTANTS,
  GET_CONTEST_PENDING_JUDGES,
  REMOVE_COTESTANT_OR_JUDGE
} from '../../types/contest/contestType';

import {
  addContestMemberFailed,
  addContestMemberSuccessful,
  contestContestantPermissionFailed,
  contestContestantPermissionSuccessful,
  getContestAcceptedContestants as getAllContestAcceptedContestants,
  getContestAcceptedJudges as getAllContestAcceptedJudge,
  getContestPendingContestants as getAllContestPendingContestants,
  getContestPendingJudges as getAllContestPendingJudges,
  getContestAcceptedContestantsFailed,
  getContestAcceptedContestantsSuccessful,
  getContestAcceptedJudgesFailed,
  getContestAcceptedJudgesSuccessful,
  getContestPendingContestantsFailed,
  getContestPendingContestantsSuccessful,
  getContestPendingJudgesFailed,
  getContestPendingJudgesSuccessful,
  removeCotestantOrJudgeFailed, removeCotestantOrJudgeSuccessful,
} from './actions';

// get_contest_pending_contestants
const getContestPendingContestants = ({ id }) => {
  return api
    .get(`/admin/contest/contestant/contestants`, {
      params: { contest_id: id || '', role: 'CONTESTANT', status: 'PENDING' },
    })
    .then((res) => res.data);
};
function* GetContestPendingContestants({ payload }) {
  try {
    const response = yield call(getContestPendingContestants, payload);
    yield put(getContestPendingContestantsSuccessful(response));
  } catch (error) {
    yield put(getContestPendingContestantsFailed(error));
  }
}
// get_contest_accepted_contestants
const getContestAcceptedContestants = ({ id }) => {
  return api
    .get(`/admin/contest/contestant/contestants`, {
      params: { contest_id: id || '', role: 'CONTESTANT', status: 'ACCEPTED' },
    })
    .then((res) => res.data);
};
function* GetContestAcceptedContestants({ payload }) {
  try {
    const response = yield call(getContestAcceptedContestants, payload);
    yield put(getContestAcceptedContestantsSuccessful(response));
  } catch (error) {
    yield put(getContestAcceptedContestantsFailed(error));
  }
}
// get_contest_pending_judges
const getContestPendingJudges = ({ id }) => {
  return api
    .get(`/admin/contest/contestant/contestants`, {
      params: { contest_id: id || '', role: 'JUDGE', status: 'PENDING' },
    })
    .then((res) => res.data);
};
function* GetContestPendingJudges({ payload }) {
  try {
    const response = yield call(getContestPendingJudges, payload);
    yield put(getContestPendingJudgesSuccessful(response));
  } catch (error) {
    yield put(getContestPendingJudgesFailed(error));
  }
}
// get_contest_accepted_judges
const getContestAcceptedJudges = ({ id }) => {
  return api
    .get(`/admin/contest/contestant/contestants`, {
      params: { contest_id: id || '', role: 'JUDGE', status: 'ACCEPTED' },
    })
    .then((res) => res.data);
};
function* GetContestAcceptedJudges({ payload }) {
  try {
    const response = yield call(getContestAcceptedJudges, payload);
    yield put(getContestAcceptedJudgesSuccessful(response));
  } catch (error) {
    yield put(getContestAcceptedJudgesFailed(error));
  }
}

// add_contest_member
const addContestMember = (payload) => {
  return api
    .post('/admin/contest/contestant', payload, {}, { notify: true })
    .then((res) => res.data);
};
function* AddContestMember({ payload }) {
  try {
    const response = yield call(addContestMember, payload);
    yield put(addContestMemberSuccessful(response));
  } catch (error) {
    yield put(addContestMemberFailed(error));
  }
}
// contest_contestant_permission
const contestContestantPermission = ({ id, role, ...payload }) => {
  return api
    .put(
      `${`/admin/contest/contest-contestant/`}${id}`,
      payload,
      {},
      { notify: true }
    )
    .then((res) => res.data);
};
function* ContestContestantPermission({ payload }) {
  try {
    const response = yield call(contestContestantPermission, payload);
    yield put(contestContestantPermissionSuccessful(response));

    if (payload.role === 'CONTESTANT') {
      const contestPendingId = yield select(
        ({ contestMember }) => contestMember.contestPendingContestants.id
      );
      const contestAcceptedId = yield select(
        ({ contestMember }) => contestMember.contestAcceptedContestants.id
      );
      if (response) {
        yield put(getAllContestPendingContestants({ id: contestPendingId }));
        yield put(getAllContestAcceptedContestants({ id: contestAcceptedId }));
      }
    } else {
      const judgePendingId = yield select(
        ({ contestMember }) => contestMember.contestPendingJudges.id
      );
      const judgeAcceptedId = yield select(
        ({ contestMember }) => contestMember.contestAcceptedJudges.id
      );
      if (response) {
        yield put(getAllContestPendingJudges({ id: judgePendingId }));
        yield put(getAllContestAcceptedJudge({ id: judgeAcceptedId }));
      }
    }
  } catch (error) {
    yield put(contestContestantPermissionFailed(error));
  }
}

// remove_cotestant_or_judge
const removeCotestantOrJudgeAsync = (id) => {
  return del(`/admin/contest/contest-contestant/${id}`);
};
// remove_cotestant_or_judge
function* RemoveCotestantOrJudge({ payload }) {
  try {
    const response = yield call(removeCotestantOrJudgeAsync, payload.id);
    yield put(removeCotestantOrJudgeSuccessful(response.data));
    if (payload.role === 'CONTESTANT') {
      const contestPendingId = yield select(
        ({ contestMember }) => contestMember.contestPendingContestants.id
      );
      const contestAcceptedId = yield select(
        ({ contestMember }) => contestMember.contestAcceptedContestants.id
      );
      if (response) {
        yield put(getAllContestPendingContestants({ id: contestPendingId }));
        yield put(getAllContestAcceptedContestants({ id: contestAcceptedId }));
      }
    } else {
      const judgePendingId = yield select(
        ({ contestMember }) => contestMember.contestPendingJudges.id
      );
      const judgeAcceptedId = yield select(
        ({ contestMember }) => contestMember.contestAcceptedJudges.id
      );
      if (response) {
        yield put(getAllContestPendingJudges({ id: judgePendingId }));
        yield put(getAllContestAcceptedJudge({ id: judgeAcceptedId }));
      }
    }
  } catch (error) {
    yield put(removeCotestantOrJudgeFailed(error));

  }
}

export function* watchContest() {
  yield takeEvery(
    GET_CONTEST_PENDING_CONTESTANTS,
    GetContestPendingContestants
  );
  yield takeEvery(
    GET_CONTEST_ACCEPTED_CONTESTANTS,
    GetContestAcceptedContestants
  );
  yield takeEvery(GET_CONTEST_PENDING_JUDGES, GetContestPendingJudges);
  yield takeEvery(GET_CONTEST_ACCEPTED_JUDGES, GetContestAcceptedJudges);
  yield takeLatest(ADD_CONTEST_MEMBER, AddContestMember);
  yield takeLatest(CONTEST_CONTESTANT_PERMISSION, ContestContestantPermission);
  yield takeLatest(REMOVE_COTESTANT_OR_JUDGE, RemoveCotestantOrJudge);
}

export default function* rootSaga() {
  yield all([fork(watchContest)]);
}
