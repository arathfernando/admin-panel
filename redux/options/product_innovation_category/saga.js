/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_PRODUCT_INNOVATION_CATEGORY,
  DELETE_PRODUCT_INNOVATION_CATEGORY,
  GET_PRODUCT_SUBCATEGORIES,
  UPDATE_PRODUCT_INNOVATION_CATEGORY,
} from '../../types/options/product_innovation_category';

import {
  createProductInnovationCategoryFailed,
  createProductInnovationCategorySuccessful,
  deleteProductInnovationCategoryFailed,
  deleteProductInnovationCategorySuccessful,
  getProductInnovationCategories,
  getProductInnovationCategoriesFailed,
  getProductInnovationCategoriesSuccessful,
  updateProductInnovationCategoryFailed,
  updateProductInnovationCategorySuccessful,
} from './actions';

// get_product_innovation_categories
const getProductInnovationCategoriesAsync = () => {
  return get(
    `/admin/product-launcher/all-innovation-category`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetProductInnovationCategories() {
  try {
    const response = yield call(getProductInnovationCategoriesAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getProductInnovationCategoriesSuccessful({ data: response.data })
      );
    } else {
      throw new Error(
        'getProductInnovationCategories Response is not success!'
      );
    }
  } catch (error) {
    yield put(getProductInnovationCategoriesFailed({ error, data: [] }));
  }
}

// create_product_innovation_category
const createProductInnovationCategoryAsync = (payload) => {
  return post(
    '/admin/product-launcher/innovation-category',
    payload,
    {},
    { notify: true }
  );
};
function* createProductInnovationCategory({
  payload: { onSuccess, ...payload },
}) {
  try {
    const response = yield call(createProductInnovationCategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createProductInnovationCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductInnovationCategories());
    } else {
      throw new Error(
        'createProductInnovationCategory Response is not success!'
      );
    }
  } catch (error) {
    yield put(createProductInnovationCategoryFailed(error));
  }
}

// update_product_innovation_category
const updateProductInnovationCategoryAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/product-launcher/innovation-category/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* updateProductInnovationCategory({
  payload: { onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateProductInnovationCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateProductInnovationCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getProductInnovationCategories());
    } else {
      throw new Error(
        'updateProductInnovationCategory  Response is not success!'
      );
    }
  } catch (error) {
    yield put(updateProductInnovationCategoryFailed(error));
  }
}

// delete_product_innovation_category
const deleteProductInnovationCategoryAsync = (id) => {
  return del(
    `/admin/product-launcher/innovation-category/${id}`,
    {},
    { notify: true }
  );
};
// delete_product_innovation_category
function* deleteProductInnovationCategory({ payload }) {
  try {
    const response = yield call(deleteProductInnovationCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteProductInnovationCategorySuccessful(response.data));
      yield put(getProductInnovationCategories());
    } else {
      throw new Error(
        'deleteProductInnovationCategory Response is not success!'
      );
    }
  } catch (error) {
    yield put(deleteProductInnovationCategoryFailed(error));
  }
}

export default function* productNnovationCategorySaga() {
  yield takeLatest(GET_PRODUCT_SUBCATEGORIES, GetProductInnovationCategories);
  yield takeLatest(
    CREATE_PRODUCT_INNOVATION_CATEGORY,
    createProductInnovationCategory
  );
  yield takeLatest(
    UPDATE_PRODUCT_INNOVATION_CATEGORY,
    updateProductInnovationCategory
  );
  yield takeLatest(
    DELETE_PRODUCT_INNOVATION_CATEGORY,
    deleteProductInnovationCategory
  );
}
