/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_PRODUCT_SUBCATEGORY_FAQ,
  DELETE_PRODUCT_SUBCATEGORY_FAQ,
  EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER,
  GET_PRODUCT_SUBCATEGORY_FAQ,
  UPDATE_PRODUCT_SUBCATEGORY_FAQ,
} from '../../types/options/product_subcategory_faq';

import {
  createProductSubcategoryFaqFailed,
  createProductSubcategoryFaqSuccessful,
  deleteProductSubcategoryFaqFailed,
  deleteProductSubcategoryFaqSuccessful,
  exchangeProductSubcateoryFaqOrderFailed,
  exchangeProductSubcateoryFaqOrderSuccessful,
  getProductSubCategoryFAQ,
  getProductSubCategoryFAQFailed,
  getProductSubCategoryFAQSuccessful,
  updateProductSubcategoryFaqFailed,
  updateProductSubcategoryFaqSuccessful,
} from './actions';

// get_product_subcategory_faq
const getProductSubCategoryFAQAsync = () => {
  return get(
    `/admin/product-launcher/all-product-subcategory-faq`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true, notifyWarn: false }
  );
};
function* GetProductSubCategoryFAQ() {
  try {
    const response = yield call(getProductSubCategoryFAQAsync);

    yield put(
      getProductSubCategoryFAQSuccessful({
        data: response.data?.sort((a, b) => a.order - b.order),
      })
    );
  } catch (error) {
    yield put(getProductSubCategoryFAQFailed({ error, data: [] }));
  }
}

// create_product_subcategory_faq
const createProductSubcategoryFaqAsync = ({ translate, ...payload }) => {
  return post(
    '/admin/product-launcher/product-subcategory-faq',
    payload,
    {},
    { notify: true, translate }
  );
};
function* CreateProductSubcategoryFaq({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createProductSubcategoryFaqAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductSubcategoryFaqSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductSubCategoryFAQ());
    } else {
      throw new Error('createProductSubcategoryFaq Response is not success!');
    }
  } catch (error) {
    yield put(createProductSubcategoryFaqFailed(error));
  }
}

// update_product_subcategory_faq
const updateProductSubcategoryFaqAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/product-launcher/product-subcategory-faq/${id}`,
    payload,
    {},
    { notify: true, translate }
  );
};
function* UpdateProductSubcategoryFaq({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateProductSubcategoryFaqAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductSubcategoryFaqSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductSubCategoryFAQ());
    } else {
      throw new Error('updateProductSubcategoryFaq  Response is not success!');
    }
  } catch (error) {
    yield put(updateProductSubcategoryFaqFailed(error));
  }
}

// delete_product_subcategory_faq
const deleteProductSubcategoryFaqAsync = ({ id, translate }) => {
  return del(
    `/admin/product-launcher/product-subcategory-faq/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_product_subcategory_faq
function* DeleteProductSubcategoryFaq({ payload }) {
  try {
    const response = yield call(deleteProductSubcategoryFaqAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductSubcategoryFaqSuccessful(response.data));
      yield put(getProductSubCategoryFAQ());
    } else {
      throw new Error('deleteProductSubcategoryFaq Response is not success!');
    }
  } catch (error) {
    yield put(deleteProductSubcategoryFaqFailed(error));
  }
}

// exchange_product_subcateory_faq_order
const exchangeProductSubcateoryFaqOrderAsync = (payload) => {
  return post(
    `/admin/product-launcher/order`,
    {
      ...payload,
      update_order_for: 'PRODUCT_SUB_CATEGORY_FAQ',
    },
    {},
    { successMsg: 'order updated successfully' }
  );
};
function* ExchangeProductSubcateoryFaqOrder({ payload }) {
  try {
    const response = yield call(
      exchangeProductSubcateoryFaqOrderAsync,
      payload
    );
    yield put(exchangeProductSubcateoryFaqOrderSuccessful(response.data));

    yield put(getProductSubCategoryFAQ());
  } catch (error) {
    yield put(exchangeProductSubcateoryFaqOrderFailed(error));
  }
}

export default function* productSubCategoryFAQSaga() {
  yield takeLatest(GET_PRODUCT_SUBCATEGORY_FAQ, GetProductSubCategoryFAQ);
  yield takeLatest(CREATE_PRODUCT_SUBCATEGORY_FAQ, CreateProductSubcategoryFaq);
  yield takeLatest(UPDATE_PRODUCT_SUBCATEGORY_FAQ, UpdateProductSubcategoryFaq);
  yield takeLatest(DELETE_PRODUCT_SUBCATEGORY_FAQ, DeleteProductSubcategoryFaq);
  yield takeLatest(
    EXCHANGE_PRODUCT_SUBCATEORY_FAQ_ORDER,
    ExchangeProductSubcateoryFaqOrder
  );
}
