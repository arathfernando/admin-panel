/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  DELETE_EXPERTISE_SUBMISSION,
  DELETE_EXPERT_MARKETPLACE,
  GET_EXPERTISE_SUBMISSIONS,
  GET_EXPERT_MARKETPLACES,
  GET_MARKETPLACE,
  SUBMIT_MARKETPLACE_FAQ,
  SUBMIT_MARKETPLACE_GALLERY,
  SUBMIT_MARKETPLACE_OVERVIEW,
  SUBMIT_MARKETPLACE_PRICING,
} from '../types/expert_marketplace/expert_marketplace_types';

import { axiosPut, del, get, post } from '../../ApiConfig';
import objectToFormData from '../../helpers/objectToFormData';
import {
  deleteExpertMarketplaceFailed,
  deleteExpertMarketplaceSuccessful,
  deleteExpertiseSubmissionFailed,
  deleteExpertiseSubmissionSuccessful,
  getExpertMarketplaces,
  getExpertMarketplacesFailed,
  getExpertMarketplacesSuccessful,
  getExpertiseSubmissions,
  getExpertiseSubmissionsFailed,
  getExpertiseSubmissionsSuccessful,
  getMarketplaceFailed,
  getMarketplaceSuccessful,
  submitMarketplaceFaqFailed,
  submitMarketplaceFaqSuccessful,
  submitMarketplaceGalleryFailed,
  submitMarketplaceGallerySuccessful,
  submitMarketplaceOverviewFailed,
  submitMarketplaceOverviewSuccessful,
  submitMarketplacePricingFailed,
  submitMarketplacePricingSuccessful,
} from './actions';

// get_expert_marketplaces
const getExpertMarketplacesAsync = () => {
  return get(
    `/admin/market-place`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true, notifyWarn: false }
  );
};
function* GetExpertMarketplaces() {
  try {
    const response = yield call(getExpertMarketplacesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getExpertMarketplacesSuccessful({ data: response.data?.data || [] })
      );
    } else {
      throw new Error('getExpertMarketplaces Response is not success!');
    }
  } catch (error) {
    yield put(getExpertMarketplacesFailed({ error, data: [] }));
  }
}

// delete_expert_marketplace
const deleteExpertMarketplaceAsync = (id) => {
  return del(`/admin/market-place/${id}`, {}, { notify: true });
};
// delete_expert_marketplace
function* DeleteExpertMarketplace({ payload }) {
  try {
    const response = yield call(deleteExpertMarketplaceAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteExpertMarketplaceSuccessful(response.data));
      yield put(getExpertMarketplaces());
    } else {
      throw new Error('deleteExpertMarketplace Response is not success!');
    }
  } catch (error) {
    yield put(deleteExpertMarketplaceFailed(error));
  }
}

// submit_marketplace_overview
const submitMarketplaceOverviewAsync = ({ id, ...payload }) => {
  if (id) {
    return axiosPut(
      `/admin/market-place/${id}`,
      { ...payload },
      {},
      { notify: true }
    );
  }
  return post('/admin/market-place', payload, {}, { notify: true });
};
function* SubmitMarketplaceOverview({ payload: { onSuccess, ...payload } }) {
  try {
    // const { id } = yield select(({ data }) => data?.submitMarketplaceOverview);
    const response = yield call(submitMarketplaceOverviewAsync, {
      ...payload,
      // id,
    });
    yield put(submitMarketplaceOverviewSuccessful(response?.data));
    onSuccess?.(response?.data);
    yield put(getExpertMarketplaces());
  } catch (error) {
    yield put(submitMarketplaceOverviewFailed(error));
  }
}

// submit_marketplace_pricing
const submitMarketplacePricingAsync = ({ gig_id, id, packages }) => {
  if (id) {
    return axiosPut(
      `/admin/market-place/gig/{gig_id}/package/{id}`,
      packages,
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/market-place/gig/${gig_id}/package`,
    packages,
    {},
    { notify: true }
  );
};
function* SubmitMarketplacePricing({ payload: { onSuccess, ...payload } }) {
  try {
    // const { id } = yield select(({ data }) => data?.submitMarketplacePricing);
    const response = yield call(submitMarketplacePricingAsync, {
      ...payload,
      // id,
    });
    yield put(submitMarketplacePricingSuccessful(response?.data));
    onSuccess?.(response?.data);
    yield put(getExpertMarketplaces());
  } catch (error) {
    yield put(submitMarketplacePricingFailed(error));
  }
}

// submit_marketplace_faq
const submitMarketplaceFaqAsync = ({ id, faq }) => {
  if (id) {
    return axiosPut(`/admin/market-place/gig/faq`, faq, {}, { notify: true });
  }
  return post(`/admin/market-place/gig/faq`, faq, {}, { notify: true });
};
function* SubmitMarketplaceFaq({ payload: { onSuccess, ...payload } }) {
  try {
    // const { id } = yield select(({ data }) => data?.submitMarketplaceFaq);
    const response = yield call(submitMarketplaceFaqAsync, {
      ...payload,
      // id,
    });
    yield put(submitMarketplaceFaqSuccessful(response?.data));
    onSuccess?.(response?.data);
    yield put(getExpertMarketplaces());
  } catch (error) {
    yield put(submitMarketplaceFaqFailed(error));
  }
}

// submit_marketplace_gallery
const submitMarketplaceGalleryAsync = ({ gig_id, id, image, ...payload }) => {
  if (typeof image !== 'string') {
    payload.image = image;
  }
  if (id) {
    return axiosPut(
      `/admin/market-place/gig/${gig_id}/gallery/${id}`,
      objectToFormData(payload),
      {},
      { notify: true }
    );
  }
  return post(
    `/admin/market-place/gig/${gig_id}/gallery`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* SubmitMarketplaceGallery({ payload: { onSuccess, ...payload } }) {
  try {
    // const { id } = yield select(({ data }) => data?.submitMarketplaceGallery);
    const response = yield call(submitMarketplaceGalleryAsync, {
      ...payload,
      // id,
    });
    yield put(submitMarketplaceGallerySuccessful(response?.data));
    onSuccess?.(response?.data);
    yield put(getExpertMarketplaces());
  } catch (error) {
    yield put(submitMarketplaceGalleryFailed(error));
  }
}

// get_expertise_submissions
const getExpertiseSubmissionsAsync = ({ gig_id, search }) => {
  return get(`/market-place/gig/${gig_id}/request/filter`, {
    params: { serach: search || undefined },
  });
};
function* GetExpertiseSubmissions({ payload }) {
  try {
    const response = yield call(getExpertiseSubmissionsAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getExpertiseSubmissionsSuccessful({ ...payload, data: response.data })
      );
    } else {
      throw new Error('GetExpertiseSubmissions Response is not success!');
    }
  } catch (error) {
    yield put(getExpertiseSubmissionsFailed({ ...payload, error }));
  }
}

// delete_expertise_submission
const deleteExpertiseSubmissionAsync = ({ id }) => {
  return del(`/admin/market-place/gig/request/${id}`);
};
// delete_expertise_submission
function* DeleteExpertiseSubmission({
  payload: { onSuccess, gig_id, search, ...payload },
}) {
  try {
    const response = yield call(deleteExpertiseSubmissionAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteExpertiseSubmissionSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getExpertiseSubmissions({ gig_id, search }));
    } else {
      throw new Error('DeleteExpertiseSubmission Response is not success!');
    }
  } catch (error) {
    yield put(deleteExpertiseSubmissionFailed(error));
  }
}
// get_marketplace
const getMarketplaceAsync = (id) => {
  return get(`/market-place/${id}`);
};
function* GetMarketplace({ payload }) {
  try {
    if (!payload) {
      yield put(getMarketplaceSuccessful({ data: {} }));
    } else {
      const response = yield call(getMarketplaceAsync, payload);
      yield put(getMarketplaceSuccessful({ ...payload, data: response?.data }));
    }
  } catch (error) {
    yield put(getMarketplaceFailed({ ...payload, data: [], error }));
  }
}

export function* watchExpert_marketplace() {
  yield takeLatest(GET_EXPERT_MARKETPLACES, GetExpertMarketplaces);
  yield takeLatest(DELETE_EXPERT_MARKETPLACE, DeleteExpertMarketplace);
  yield takeLatest(SUBMIT_MARKETPLACE_OVERVIEW, SubmitMarketplaceOverview);
  yield takeLatest(SUBMIT_MARKETPLACE_PRICING, SubmitMarketplacePricing);
  yield takeLatest(SUBMIT_MARKETPLACE_FAQ, SubmitMarketplaceFaq);
  yield takeLatest(SUBMIT_MARKETPLACE_GALLERY, SubmitMarketplaceGallery);
  yield takeLatest(GET_EXPERTISE_SUBMISSIONS, GetExpertiseSubmissions);
  yield takeLatest(DELETE_EXPERTISE_SUBMISSION, DeleteExpertiseSubmission);
  yield takeLatest(GET_MARKETPLACE, GetMarketplace);
}

export default function* rootSaga() {
  yield all([fork(watchExpert_marketplace)]);
}
