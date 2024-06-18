/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_PRODUCT_TECH_CATEGORY,
  DELETE_PRODUCT_TECH_CATEGORY,
  GET_PRODUCT_SUBCATEGORIES,
  UPDATE_PRODUCT_TECH_CATEGORY,
} from '../../types/options/product_tech_category';

import {
  createProductTechCategoryFailed,
  createProductTechCategorySuccessful,
  deleteProductTechCategoryFailed,
  deleteProductTechCategorySuccessful,
  getProductTechCategories,
  getProductTechCategoriesFailed,
  getProductTechCategoriesSuccessful,
  updateProductTechCategoryFailed,
  updateProductTechCategorySuccessful,
} from './actions';

// get_product_tech_categories
const getProductTechCategoriesAsync = () => {
  return get(
    `/admin/product-launcher/all-tech-category`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetProductTechCategories() {
  try {
    const response = yield call(getProductTechCategoriesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(getProductTechCategoriesSuccessful({ data: response.data }));
    } else {
      throw new Error('getProductTechCategories Response is not success!');
    }
  } catch (error) {
    yield put(getProductTechCategoriesFailed({ error, data: [] }));
  }
}

// create_product_tech_category
const createProductTechCategoryAsync = (payload) => {
  return post(
    '/admin/product-launcher/tech-category',
    payload,
    {},
    { notify: true }
  );
};
function* CreateProductTechCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createProductTechCategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductTechCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductTechCategories());
    } else {
      throw new Error('createProductTechCategory Response is not success!');
    }
  } catch (error) {
    yield put(createProductTechCategoryFailed(error));
  }
}

// update_product_tech_category
const updateProductTechCategoryAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/product-launcher/tech-category/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateProductTechCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateProductTechCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductTechCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductTechCategories());
    } else {
      throw new Error('updateProductTechCategory  Response is not success!');
    }
  } catch (error) {
    yield put(updateProductTechCategoryFailed(error));
  }
}

// delete_product_tech_category
const deleteProductTechCategoryAsync = (id) => {
  return del(
    `/admin/product-launcher/tech-category/${id}`,
    {},
    { notify: true }
  );
};
// delete_product_tech_category
function* DeleteProductTechCategory({ payload }) {
  try {
    const response = yield call(deleteProductTechCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductTechCategorySuccessful(response.data));
      yield put(getProductTechCategories());
    } else {
      throw new Error('deleteProductTechCategory Response is not success!');
    }
  } catch (error) {
    yield put(deleteProductTechCategoryFailed(error));
  }
}

export default function* productNnovationCategorySaga() {
  yield takeLatest(GET_PRODUCT_SUBCATEGORIES, GetProductTechCategories);
  yield takeLatest(CREATE_PRODUCT_TECH_CATEGORY, CreateProductTechCategory);
  yield takeLatest(UPDATE_PRODUCT_TECH_CATEGORY, UpdateProductTechCategory);
  yield takeLatest(DELETE_PRODUCT_TECH_CATEGORY, DeleteProductTechCategory);
}
