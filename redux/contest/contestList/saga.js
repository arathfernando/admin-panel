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
import api from '../../../ApiConfig';

import {
  CREATE_CONTEST_CRITERIA,
  CREATE_CONTEST_GENERAL,
  CREATE_CONTEST_IDENTITY,
  CREATE_CONTEST_RULES,
  DELETE_CONTEST,
  GET_ACTIVE_CONTESESTS,
  GET_ALL_CONTESTS,
  GET_COMPLETED_CONTESTS,
  GET_CONTEST,
  GET_CONTEST_CATEGORIES,
  GET_CONTEST_CRITERIA,
  GET_CONTEST_GENERAL,
  GET_CONTEST_IDENTITY,
  GET_CONTEST_RULES,
  GET_DRAFTED_CONTESTS,
  GET_ONGOING_CONTESTS,
  GET_PENDING_CONTESESTS,
  UPDATE_CONTEST_CRITERIA,
  UPDATE_CONTEST_GENERAL,
  UPDATE_CONTEST_IDENTITY,
  UPDATE_CONTEST_RULES,
} from '../../types/contest/contestType';

import {
  createContestCriteriaFailed,
  createContestCriteriaSuccessful,
  createContestGeneralFailed,
  createContestGeneralSuccessful,
  createContestIdentityFailed,
  createContestIdentitySuccessful,
  createContestRulesFailed,
  createContestRulesSuccessful,
  deleteContestFailed,
  deleteContestSuccessful,
  getActiveContestss as getActiveContestsData,
  getActiveContestssFailed,
  getActiveContestssSuccessful,
  getAllContestsFailed,
  getAllContestsSuccessful,
  getCompletedContests as getCompletedContestsData,
  getCompletedContestsFailed,
  getCompletedContestsSuccessful,
  getContestCategiesFailed,
  getContestCategiesSuccessful,
  getContestCriteria,
  getContest as getContestData,
  getContestFailed,
  getContestGeneral,
  getContestIdentity,
  getContestRevissionsuccessful,
  getContestRules,
  getDraftedContests as getDraftedContestsData,
  getDraftedContestsFailed,
  getDraftedContestsSuccessful,
  getOngoingContests as getOngoingContestsData,
  getOngoingContestsFailed,
  getOngoingContestsSuccessful,
  getPendingContestss as getPendingContestsData,
  getPendingContestssFailed,
  getPendingContestssSuccessful,
  updateContestCriteriaFailed,
  updateContestCriteriaSuccessful,
  updateContestGeneralFailed,
  updateContestGeneralSuccessful,
  updateContestIdentityFailed,
  updateContestIdentitySuccessful,
  updateContestRulesFailed,
  updateContestRulesSuccessful,
} from './actions';

import objectToFormData from '../../../helpers/objectToFormData';

// create_contest_general
const createContestGeneral = (payload) => {
  return api.post(
    `admin/contest`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateContestGeneral({ payload }) {
  try {
    const response = yield call(createContestGeneral, payload);
    yield put(createContestGeneralSuccessful(response));
    yield put(getContestData(response.data.id));
  } catch (error) {
    yield put(createContestGeneralFailed(error));
  }
}
// //get_contest_general
// const getContestGeneral = (id) => {
//   return get(`${API.CONTEST_GENERAL}/${id}`);
// };
// function* GetContestGeneral({ payload }) {
//   try {
//     const response = yield call(getContestGeneral, payload);
//     yield put(getContestGeneralSuccessful(response));
//   } catch (error) {
//     yield put(getContestGeneralFailed(error));
//   }
// }
// update_contest_general
const updateContestGeneral = ({ id, ...payload }) => {
  return api.put(
    `${`admin/contest`}/${id}`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* UpdateContestGeneral({ payload }) {
  try {
    const response = yield call(updateContestGeneral, payload);
    yield put(updateContestGeneralSuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(updateContestGeneralFailed(error));
  }
}

// create_contest_identity
const createContestIdentity = (payload) => {
  return api.post(
    `/admin/contest/customer-identity`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateContestIdentity({ payload }) {
  try {
    const response = yield call(createContestIdentity, payload);
    yield put(createContestIdentitySuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(createContestIdentityFailed(error));
  }
}
// //get_contest_identity
// const getContestIdentity = (id) => {
//   return get(`${API.CONTEST_IDENTITY}/${id}`);
// };
// function* GetContestIdentity({ payload }) {
//   try {
//     const response = yield call(getContestIdentity, payload);
//     yield put(getContestIdentitySuccessful(response));
//   } catch (error) {
//     yield put(getContestIdentityFailed(error));
//   }
// }
// update_contest_identity
const updateContestIdentity = ({ id, ...payload }) => {
  return api.put(
    `${`/admin/contest/customer-identity`}/${id}`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* UpdateContestIdentity({ payload }) {
  try {
    const response = yield call(updateContestIdentity, payload);
    yield put(updateContestIdentitySuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(updateContestIdentityFailed(error));
  }
}

// create_contest_criteria
const createContestCriteria = (payload) => {
  return api.post(
    `/admin/contest/contest-criteria`,
    payload,
    {},
    { notify: true }
  );
};
function* CreateContestCriteria({ payload }) {
  try {
    const response = yield call(createContestCriteria, payload);
    yield put(createContestCriteriaSuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(createContestCriteriaFailed(error));
  }
}
// //get_contest_criteria
// const getContestCriteria = (id) => {
//   return get(`${API.CONTEST_CRITERIA}/${id}`);
// };
// function* GetContestCriteria({ payload }) {
//   try {
//     const response = yield call(getContestCriteria, payload);
//     yield put(getContestCriteriaSuccessful(response));
//   } catch (error) {
//     yield put(getContestCriteriaFailed(error));
//   }
// }
// update_contest_criteria
const updateContestCriteria = ({ id, ...payload }) => {
  return api.put(
    `${'/admin/contest/contest-criteria'}/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateContestCriteria({ payload }) {
  try {
    const response = yield call(updateContestCriteria, payload);
    yield put(updateContestCriteriaSuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(updateContestCriteriaFailed(error));
  }
}

// create_contest_rules
const createContestRules = (payload) => {
  return api.post(
    `/admin/contest/contest-rules`,
    payload,
    {},
    { notify: true }
  );
};
function* CreateContestRules({ payload }) {
  try {
    const response = yield call(createContestRules, payload);
    yield put(createContestRulesSuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(createContestRulesFailed(error));
  }
}
// get_contest_rules
// const getContestRules = (id) => {
//   return get(`${API.CONTEST_RULES}/${id}`);
// };
// function* GetContestRules({ payload }) {
//   try {
//     const response = yield call(getContestRules, payload);
//     yield put(getContestRulesSuccessful(response));
//   } catch (error) {
//     yield put(getContestRulesFailed(error));
//   }
// }
// update_contest_rules
const updateContestRules = ({ id, ...payload }) => {
  return api.put(
    `${`/admin/contest/contest-rules`}/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateContestRules({ payload }) {
  try {
    const response = yield call(updateContestRules, payload);
    yield put(updateContestRulesSuccessful(response));
    if (response) yield put(getContestData());
  } catch (error) {
    yield put(updateContestRulesFailed(error));
  }
}

// get_contest
const getContest = (id) => {
  return api.get(`${`/contest/contest`}/${id}`).then((res) => res.data);
};
function* GetContest({ payload }) {
  try {
    const cntestId = yield select(
      ({ contest }) => contest.contestData.data?.id
    );
    const response = yield call(getContest, payload || cntestId);
    yield put(getContestRevissionsuccessful(response));
  } catch (error) {
    yield put(getContestFailed(error));
  }
}

// get_contest_categories
const getContestCategies = () => {
  return api.get(`/admin/options/contest-category`);
};
function* GetContestCategies() {
  try {
    const response = yield call(getContestCategies);
    yield put(getContestCategiesSuccessful(response));
  } catch (error) {
    yield put(getContestCategiesFailed(error));
  }
}

// get_active_contesests
const getActiveContestss = () => {
  return api
    .get(`/admin/contest/contest/state?state=ACTIVE`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetActiveContestss() {
  try {
    const response = yield call(getActiveContestss);
    yield put(getActiveContestssSuccessful(response?.data));
  } catch (error) {
    yield put(getActiveContestssFailed(error));
  }
}
// get_pending_contesests
const getPendingContestss = () => {
  return api
    .get(`/admin/contest/contest/state?state=PENDING`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetPendingContestss() {
  try {
    const response = yield call(getPendingContestss);
    yield put(getPendingContestssSuccessful(response?.data));
  } catch (error) {
    yield put(getPendingContestssFailed(error));
  }
}
// get_completed_contests
const getCompletedContests = () => {
  return api
    .get(`/admin/contest/contest/state?state=COMPLETED`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetCompletedContests({ payload }) {
  try {
    const response = yield call(getCompletedContests, payload);
    yield put(getCompletedContestsSuccessful(response?.data));
  } catch (error) {
    yield put(getCompletedContestsFailed(error));
  }
}
// get_ongoing_contests
const getOngoingContests = () => {
  return api
    .get(`/admin/contest/contest/state?state=ONGOING`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetOngoingContests({ payload }) {
  try {
    const response = yield call(getOngoingContests, payload);
    yield put(getOngoingContestsSuccessful(response?.data));
  } catch (error) {
    yield put(getOngoingContestsFailed(error));
  }
}
// get_drafted_contests
const getDraftedContests = () => {
  return api
    .get(`/admin/contest/contest/state?state=DRAFTED`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetDraftedContests({ payload }) {
  try {
    const response = yield call(getDraftedContests, payload);
    yield put(getDraftedContestsSuccessful(response?.data));
  } catch (error) {
    yield put(getDraftedContestsFailed(error));
  }
}
// get_all_contests
const getAllContests = () => {
  return api
    .get(`/admin/contest/contest/state?state=ALL`, {
      params: { page: 1, limit: 1000, contest_role: 'ALL' },
    })
    .then((res) => res.data);
};
function* GetAllContests({ payload }) {
  try {
    const response = yield call(getAllContests, payload);
    yield put(getAllContestsSuccessful(response?.data));
  } catch (error) {
    yield put(getAllContestsFailed(error));
  }
}

// delete_contest
const deleteContest = ({ id }) => {
  return api
    .delete(`/admin/contest/${id}`, {}, { notify: true })
    .then((res) => res.data);
};
function* DeleteContest({ payload }) {
  try {
    const response = yield call(deleteContest, payload);
    yield put(deleteContestSuccessful(response));
    if (response) {
      switch (payload.status) {
        case 'PENDING':
          yield put(getPendingContestsData());
          break;
        case 'ACTIVE':
          yield put(getActiveContestsData());
          break;
        case 'COMPLETED':
          yield put(getCompletedContestsData());
          break;
        case 'ONGOING':
          yield put(getOngoingContestsData());
          break;
        case 'DRAFTED':
          yield put(getDraftedContestsData());
          break;
        default:
          break;
      }
    }
  } catch (error) {
    yield put(deleteContestFailed(error));
  }
}

export function* watchContest() {
  yield takeLatest(CREATE_CONTEST_GENERAL, CreateContestGeneral);
  yield takeEvery(GET_CONTEST_GENERAL, getContestGeneral);
  yield takeLatest(UPDATE_CONTEST_GENERAL, UpdateContestGeneral);
  yield takeLatest(CREATE_CONTEST_IDENTITY, CreateContestIdentity);
  yield takeEvery(GET_CONTEST_IDENTITY, getContestIdentity);
  yield takeLatest(UPDATE_CONTEST_IDENTITY, UpdateContestIdentity);
  yield takeLatest(CREATE_CONTEST_CRITERIA, CreateContestCriteria);
  yield takeEvery(GET_CONTEST_CRITERIA, getContestCriteria);
  yield takeLatest(UPDATE_CONTEST_CRITERIA, UpdateContestCriteria);
  yield takeLatest(CREATE_CONTEST_RULES, CreateContestRules);
  yield takeEvery(GET_CONTEST_RULES, getContestRules);
  yield takeLatest(UPDATE_CONTEST_RULES, UpdateContestRules);
  yield takeEvery(GET_CONTEST, GetContest);
  yield takeEvery(GET_CONTEST_CATEGORIES, getContestCategies);
  yield takeEvery(GET_CONTEST_CATEGORIES, GetContestCategies);
  yield takeEvery(GET_ACTIVE_CONTESESTS, GetActiveContestss);
  yield takeEvery(GET_PENDING_CONTESESTS, GetPendingContestss);
  yield takeEvery(GET_COMPLETED_CONTESTS, GetCompletedContests);
  yield takeEvery(GET_ONGOING_CONTESTS, GetOngoingContests);
  yield takeEvery(GET_DRAFTED_CONTESTS, GetDraftedContests);
  yield takeEvery(GET_ALL_CONTESTS, GetAllContests);
  yield takeLatest(DELETE_CONTEST, DeleteContest);
}

export default function* rootSaga() {
  yield all([fork(watchContest)]);
}
