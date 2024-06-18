/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import {
  CREATE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  EXCHANGE_PRODUCT_CATEORY_ORDER,
  GET_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_CATEGORY,
} from '../../types/options/product-category';

import {
  createProductCategoryFailed,
  createProductCategorySuccessful,
  deleteProductCategoryFailed,
  deleteProductCategorySuccessful,
  exchangeProductCateoryOrderFailed,
  exchangeProductCateoryOrderSuccessful,
  getProductCategories,
  getProductCategoriesFailed,
  getProductCategoriesSuccessful,
  updateProductCategoryFailed,
  updateProductCategorySuccessful,
} from './actions';

// get_product_categories
const getProductCategoriesAsync = () => {
  return get(`admin/product-launcher/all-product-category`, {
    params: { page: 1, limit: 1000 },
  });
};
function* GetProductCategories() {
  try {
    const response = yield call(getProductCategoriesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getProductCategoriesSuccessful({
          data: response.data?.sort((a, b) => a.order - b.order),
        })
      );
    } else {
      throw new Error('GetProductCategories Response is not success!');
    }
  } catch (error) {
    yield put(getProductCategoriesFailed({ error, data: [] }));
  }
}

// create_product_category
const createProductCategoryAsync = ({ translate, ...payload }) => {
  return post(
    'admin/product-launcher/product-category',
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* CreateProductCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createProductCategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductCategories());
    } else {
      throw new Error('CreateProductCategory Response is not success!');
    }
  } catch (error) {
    yield put(createProductCategoryFailed(error));
  }
}

// update_product_category
const updateProductCategoryAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `admin/product-launcher/product-category/${id}`,
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* UpdateProductCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateProductCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductCategories());
    } else {
      throw new Error('UpdateProductCategory Response is not success!');
    }
  } catch (error) {
    yield put(updateProductCategoryFailed(error));
  }
}

// delete_product_category
const deleteProductCategoryAsync = ({ id, translate }) => {
  return del(
    `admin/product-launcher/product-category/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_product_category
function* DeleteProductCategory({ payload }) {
  try {
    const response = yield call(deleteProductCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductCategorySuccessful(response.data));
      yield put(getProductCategories());
    } else {
      throw new Error('DeleteProductCategory Response is not success!');
    }
  } catch (error) {
    yield put(deleteProductCategoryFailed(error));
  }
}

// exchange_product_cateory_order
const exchangeProductCateoryOrderAsync = (payload) => {
  return post(
    `/admin/product-launcher/order`,
    {
      ...payload,
      update_order_for: 'PRODUCT_CATEGORY',
    },
    {},
    { successMsg: 'order updated successfully' }
  );
};
function* ExchangeProductCateoryOrder({ payload }) {
  try {
    const response = yield call(exchangeProductCateoryOrderAsync, payload);
    yield put(exchangeProductCateoryOrderSuccessful(response.data));
    yield put(getProductCategories());
  } catch (error) {
    yield put(exchangeProductCateoryOrderFailed(error));
  }
}

export default function* productCategorySaga() {
  yield takeLatest(GET_PRODUCT_CATEGORIES, GetProductCategories);
  yield takeLatest(CREATE_PRODUCT_CATEGORY, CreateProductCategory);
  yield takeLatest(UPDATE_PRODUCT_CATEGORY, UpdateProductCategory);
  yield takeLatest(DELETE_PRODUCT_CATEGORY, DeleteProductCategory);
  yield takeLatest(EXCHANGE_PRODUCT_CATEORY_ORDER, ExchangeProductCateoryOrder);
}
