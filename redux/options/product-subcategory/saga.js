/* eslint-disable no-unused-expressions */
import { isArray } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import {
  CREATE_PRODUCT_SUBCATEGORY,
  DELETE_PRODUCT_SUBCATEGORY,
  EXCHANGE_PRODUCT_SUBCATEORY_ORDER,
  GET_PRODUCT_SUBCATEGORIES,
  UPDATE_PRODUCT_SUBCATEGORY,
} from '../../types/options/product-subcategory';

import {
  createProductSubcategoryFailed,
  createProductSubcategorySuccessful,
  deleteProductSubcategoryFailed,
  deleteProductSubcategorySuccessful,
  exchangeProductSubcateoryOrderFailed,
  exchangeProductSubcateoryOrderSuccessful,
  getProductSubCategories,
  getProductSubCategoriesFailed,
  getProductSubCategoriesSuccessful,
  updateProductSubcategoryFailed,
  updateProductSubcategorySuccessful,
} from './actions';

// get_product_subcategories
const getProductSubCategoriesAsync = () => {
  return get(
    `/admin/product-launcher/all-product-subcategory`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true, notifyWarn: false }
  ).then((res) => res);
};
function* GetProductSubCategories() {
  try {
    const response = yield call(getProductSubCategoriesAsync);
    yield put(
      getProductSubCategoriesSuccessful({
        data: isArray(response.data)
          ? response.data?.sort((a, b) => a.order - b.order)
          : [],
      })
    );
  } catch (error) {
    yield put(getProductSubCategoriesFailed({ error, data: [] }));
  }
}

// create_product_subcategory
const createProductSubcategoryAsync = ({ translate, ...payload }) => {
  return post(
    '/admin/product-launcher/product-subcategory',
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* createProductSubcategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createProductSubcategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductSubcategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductSubCategories());
    } else {
      throw new Error('createProductSubcategory Response is not success!');
    }
  } catch (error) {
    yield put(createProductSubcategoryFailed(error));
  }
}

// update_product_subcategory
const updateProductSubcategoryAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/product-launcher/product-subcategory/${id}`,
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* updateProductSubcategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateProductSubcategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductSubcategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductSubCategories());
    } else {
      throw new Error('updateProductSubcategory  Response is not success!');
    }
  } catch (error) {
    yield put(updateProductSubcategoryFailed(error));
  }
}

// delete_product_subcategory
const deleteProductSubcategoryAsync = ({ translate, id }) => {
  return del(
    `/admin/product-launcher/product-subcategory/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_product_subcategory
function* deleteProductSubcategory({ payload }) {
  try {
    const response = yield call(deleteProductSubcategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductSubcategorySuccessful(response.data));
      yield put(getProductSubCategories());
    } else {
      throw new Error('deleteProductSubcategory Response is not success!');
    }
  } catch (error) {
    yield put(deleteProductSubcategoryFailed(error));
  }
}

// exchange_product_subcateory_order
const exchangeProductSubcateoryOrderAsync = (payload) => {
  return post(
    `/admin/product-launcher/order`,
    {
      ...payload,
      update_order_for: 'PRODUCT_SUB_CATEGORY',
    },
    {},
    { successMsg: 'order updated successfully' }
  );
};
function* ExchangeProductSubcateoryOrder({ payload }) {
  try {
    const response = yield call(exchangeProductSubcateoryOrderAsync, payload);
    yield put(exchangeProductSubcateoryOrderSuccessful(response.data));
    yield put(getProductSubCategories());
  } catch (error) {
    yield put(exchangeProductSubcateoryOrderFailed(error));
  }
}

export default function* productSubcategorySaga() {
  yield takeLatest(GET_PRODUCT_SUBCATEGORIES, GetProductSubCategories);
  yield takeLatest(CREATE_PRODUCT_SUBCATEGORY, createProductSubcategory);
  yield takeLatest(UPDATE_PRODUCT_SUBCATEGORY, updateProductSubcategory);
  yield takeLatest(DELETE_PRODUCT_SUBCATEGORY, deleteProductSubcategory);
  yield takeLatest(
    EXCHANGE_PRODUCT_SUBCATEORY_ORDER,
    ExchangeProductSubcateoryOrder
  );
}
