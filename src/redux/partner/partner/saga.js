/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api, { get } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_PARTNER,
  DELETE_PARTNER,
  GET_ALL_PARTNER,
  GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY,
  GET_PARTNERS_BY_NAME,
  SEARCH_CONTESTS,
  SEARCH_PROJECTS,
  UPDATE_PARTNER,
} from '../../types/partner/partner';

import {
  createPartnerError,
  createPartnerSuccess,
  deletePartnerError,
  deletePartnerSuccess,
  getAllPartner,
  getAllPartnerError,
  getAllPartnerSuccess,
  getMarketplacesBySearchFilterSortbyFailed,
  getMarketplacesBySearchFilterSortbySuccessful,
  getPartnersByNameFailed,
  getPartnersByNameSuccessful,
  searchContestsFailed,
  searchContestsSuccessful,
  searchProjectsFailed,
  searchProjectsSuccessful,
  updatePartnerError,
  updatePartnerSuccess,
} from './actions';

const getAllPartnerAsync = async () => {
  return api
    .get(`/admin/users/users-partner/partners`, {
      params: { page: 1, limit: 1000 },
    })
    .then((res) => res)
    .catch((error) => error);
};
function* GetAllPartner() {
  try {
    const result = yield call(getAllPartnerAsync);
    if (result.status) {
      yield put(getAllPartnerSuccess(result.data));
    } else {
      yield put(getAllPartnerError('Get All Partner Response is not success!'));
    }
  } catch (error) {
    yield put(getAllPartnerError('Get All Partner Error !'));
  }
}

const createPartnerAsync = async ({ payload }) => {
  return api
    .post(`/admin/users/users-partner`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};
function* CreatePartner(payload) {
  try {
    const result = yield call(createPartnerAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createPartnerSuccess(result.data.data));
      yield put(getAllPartner());
    } else {
      yield put(createPartnerError('Create Partner Response is not success!'));
    }
  } catch (error) {
    yield put(createPartnerError('Create Partner Error !'));
  }
}

const updatePartnerAsync = async ({ payload: { id, ...payload } }) => {
  return api
    .put(`/admin/users/users-partner/${id}`, objectToFormData(payload))
    .then((res) => res)
    .catch((error) => error);
};
function* UpdatePartner(payload) {
  try {
    const result = yield call(updatePartnerAsync, payload);
    if (result.status) {
      yield put(updatePartnerSuccess(result.data.data));
      yield put(getAllPartner());
    } else {
      yield put(updatePartnerError('Update Partner Response is not success!'));
    }
  } catch (error) {
    yield put(updatePartnerError('Update Partner Error !'));
  }
}

const deletePartnerAsync = async (payload) => {
  return api
    .delete(`/admin/users/users-partner/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};
function* DeletePartner(payload) {
  try {
    const result = yield call(deletePartnerAsync, payload);
    if (result.status) {
      yield put(deletePartnerSuccess(result.data.data));
      yield put(getAllPartner());
    } else {
      yield put(deletePartnerError('Delete Partner Response is not success!'));
    }
  } catch (error) {
    yield put(deletePartnerError('Delete Partner Error !'));
  }
}

// get_partners_by_name
const getPartnersByName = (name) => {
  return api
    .get(`${`/partner/search/data`}?name=${name}`)
    .then((res) => res.data);
};
function* GetPartnersByName({ payload }) {
  try {
    const response = yield call(getPartnersByName, payload);
    yield put(getPartnersByNameSuccessful(response));
  } catch (error) {
    yield put(getPartnersByNameFailed(error));
  }
}

// get_marketplaces_by_search_filter_sortby
const getMarketplacesBySearchFilterSortby = (params = {}) => {
  return get(`/market-place/search/gig`, {
    params: { ...params, search: params?.search || undefined },
  });
};
function* GetMarketplacesBySearchFilterSortby({ payload }) {
  try {
    const response = yield call(
      getMarketplacesBySearchFilterSortby,
      payload || {}
    );
    yield put(
      getMarketplacesBySearchFilterSortbySuccessful({
        ...response?.data,
        searchKey: payload?.searchKey,
      })
    );
  } catch (error) {
    yield put(
      getMarketplacesBySearchFilterSortbyFailed({
        data: [],
        searchKey: payload,
        error,
      })
    );
  }
}

// search_projects
const searchProjectsAsync = ({ params = {} }) => {
  return get(`/project/open/search`, {
    params,
  });
};
function* SearchProjects({ payload }) {
  try {
    const response = yield call(searchProjectsAsync, payload);
    yield put(searchProjectsSuccessful({ ...payload, data: response?.data }));
  } catch (error) {
    yield put(searchProjectsFailed({ ...payload, data: [], error }));
  }
}

// search_contests
const searchContestsAsync = ({
  contest_filter,
  name,
  sort_by,
  contest_category,
  ...params
}) => {
  return get(`/contest/contest/dashboard/search`, {
    params: {
      contest_filter: contest_filter || 'ALL',
      sort_by: sort_by || undefined,
      name: name || undefined,
      contest_category: contest_category || undefined,
      ...params,
    },
  });
};
function* SearchContests({ payload }) {
  try {
    const response = yield call(searchContestsAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(searchContestsSuccessful({ ...payload, ...response.data }));
    } else {
      throw new Error('SearchContests Response is not success!');
    }
  } catch (error) {
    yield put(searchContestsFailed({ ...payload, error }));
  }
}

export function* watchGetAllPartner() {
  yield takeEvery(GET_ALL_PARTNER, GetAllPartner);
}
export function* watchGetMarketplacesBySearchFilterSortby() {
  yield takeLatest(
    GET_MARKETPLACES_BY_SEARCH_FILTER_SORTBY,
    GetMarketplacesBySearchFilterSortby
  );
}
export function* watchSearchProjects() {
  yield takeLatest(SEARCH_PROJECTS, SearchProjects);
}
export function* watchSearchContests() {
  yield takeLatest(SEARCH_CONTESTS, SearchContests);
}
export function* watchgetPartnersByName() {
  yield takeEvery(GET_PARTNERS_BY_NAME, GetPartnersByName);
}
export function* watchCreatePartner() {
  yield takeEvery(CREATE_PARTNER, CreatePartner);
}
export function* watchUpdatePartner() {
  yield takeEvery(UPDATE_PARTNER, UpdatePartner);
}
export function* watchDeletePartner() {
  yield takeEvery(DELETE_PARTNER, DeletePartner);
}

export default function* rootSaga() {
  yield all([
    fork(watchgetPartnersByName),
    fork(watchGetAllPartner),
    fork(watchCreatePartner),
    fork(watchUpdatePartner),
    fork(watchDeletePartner),
    fork(watchSearchProjects),
    fork(watchSearchContests),
    fork(watchGetMarketplacesBySearchFilterSortby),
  ]);
}
