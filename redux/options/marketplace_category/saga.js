/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import {
  CREATE_MARKETPLACE_CATEGORY,
  DELETE_MARKETPLACE_CATEGORY,
  GET_MARKETPLACE_CATEGORIES,
  UPDATE_MARKETPLACE_CATEGORY,
} from '../../types/options/marketplace_category';

import {
  createMarketplaceCategoryFailed,
  createMarketplaceCategorySuccessful,
  deleteMarketplaceCategoryFailed,
  deleteMarketplaceCategorySuccessful,
  getMarketplaceCategories,
  getMarketplaceCategoriesFailed,
  getMarketplaceCategoriesSuccessful,
  updateMarketplaceCategoryFailed,
  updateMarketplaceCategorySuccessful,
} from './actions';

// get_marketplace_categories
const getMarketplaceCategoriesAsync = () => {
  return get(
    `/admin/market-place/category`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetMarketplaceCategories() {
  try {
    const response = yield call(getMarketplaceCategoriesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(getMarketplaceCategoriesSuccessful({ data: response.data }));
    } else {
      throw new Error('getMarketplaceCategories Response is not success!');
    }
  } catch (error) {
    yield put(getMarketplaceCategoriesFailed({ error, data: [] }));
  }
}

// create_marketplace_category
const createMarketplaceCategoryAsync = ({ translate, ...payload }) => {
  return post(
    '/admin/market-place/category',
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* CreateMarketplaceCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createMarketplaceCategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createMarketplaceCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getMarketplaceCategories());
    } else {
      throw new Error('createMarketplaceCategory Response is not success!');
    }
  } catch (error) {
    yield put(createMarketplaceCategoryFailed(error));
  }
}

// update_marketplace_category
const updateMarketplaceCategoryAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/market-place/category/${id}`,
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* UpdateMarketplaceCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateMarketplaceCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateMarketplaceCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getMarketplaceCategories());
    } else {
      throw new Error('updateMarketplaceCategory  Response is not success!');
    }
  } catch (error) {
    yield put(updateMarketplaceCategoryFailed(error));
  }
}

// delete_marketplace_category
const deleteMarketplaceCategoryAsync = ({ id, translate }) => {
  return del(
    `/admin/market-place/category/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_marketplace_category
function* DeleteMarketplaceCategory({ payload }) {
  try {
    const response = yield call(deleteMarketplaceCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteMarketplaceCategorySuccessful(response.data));
      yield put(getMarketplaceCategories());
    } else {
      throw new Error('deleteMarketplaceCategory Response is not success!');
    }
  } catch (error) {
    yield put(deleteMarketplaceCategoryFailed(error));
  }
}

export default function* marketplaceCategorySaga() {
  yield takeLatest(GET_MARKETPLACE_CATEGORIES, GetMarketplaceCategories);
  yield takeLatest(CREATE_MARKETPLACE_CATEGORY, CreateMarketplaceCategory);
  yield takeLatest(UPDATE_MARKETPLACE_CATEGORY, UpdateMarketplaceCategory);
  yield takeLatest(DELETE_MARKETPLACE_CATEGORY, DeleteMarketplaceCategory);
}
