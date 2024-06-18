import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  CREATE_CURRENCY,
  DELETE_CURRENCY,
  GET_ALL_CURRENCY,
  GET_SINGLE_CURRENCY,
  UPDATE_CURRENCY,
} from '../../types/options/currency';

import {
  createCurrencyError,
  createCurrencySuccess,
  deleteCurrencyError,
  deleteCurrencySuccess,
  getAllCurrency,
  getAllCurrencyError,
  getAllCurrencySuccess,
  getSingleCurrencyError,
  getSingleCurrencySuccess,
  updateCurrencyError,
  updateCurrencySuccess,
} from './actions';

const getAllCurrencyAsync = async () => {
  return api
    .get(`/admin/options/currency`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllCurrency() {
  try {
    const result = yield call(getAllCurrencyAsync);
    if (result.status) {
      yield put(getAllCurrencySuccess(result.data));
    } else {
      yield put(
        getAllCurrencyError('Get All Currency Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllCurrencyError('Get All Currency Error !'));
  }
}

const getSingleCurrencyAsync = async (payload) => {
  await api
    .get(`/admin/options/currency/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetSingleCurrency(payload) {
  try {
    const result = yield call(getSingleCurrencyAsync, payload);
    if (result.status) {
      yield put(getSingleCurrencySuccess(result.data.result));
    } else {
      yield put(
        getSingleCurrencyError('Get Single Currency Response is not success!')
      );
    }
  } catch (error) {
    yield put(getSingleCurrencyError('Get Single Currency Error !'));
  }
}

const createCurrencyAsync = async ({ payload: { translate, ...payload } }) => {
  payload.is_crypto = payload.is_crypto === true ? 'TRUE' : 'FALSE';
  return post(
    `/admin/options/currency`,
    {
      ...payload,
    },
    {},
    { translate, notify: true }
  );
};

function* CreateCurrency(payload) {
  try {
    const result = yield call(createCurrencyAsync, payload);

    yield put(createCurrencySuccess(result.data));
    yield put(getAllCurrency());
  } catch (error) {
    yield put(createCurrencyError('Create Currency Error !'));
  }
}

const updateCurrencyAsync = async ({ payload: { translate, ...payload } }) => {
  const reqObj = {
    name: payload.name,
    name_plural: payload.name_plural,
    symbol: payload.symbol,
    symbol_native: payload.symbol_native,
    currency_code: payload.currency_code,
    decimal_digit: payload.decimal_digit,
    rounding: payload.rounding,
    is_crypto: payload.is_crypto === true ? 'TRUE' : 'FALSE',
  };
  return axiosPut(
    `/admin/options/currency/${payload.id}`,
    reqObj,
    {},
    { translate, notify: true }
  );
};

function* UpdateCurrency(payload) {
  try {
    const result = yield call(updateCurrencyAsync, payload);
    yield put(updateCurrencySuccess(result.data));
    yield put(getAllCurrency());
  } catch (error) {
    yield put(updateCurrencyError('Update Currency Error !'));
  }
}

const deleteCurrencyAsync = async ({ payload: { translate, id } }) => {
  return del(`/admin/options/currency/${id}`, {}, { translate, notify: true });
};

function* DeleteCurrency(payload) {
  try {
    const result = yield call(deleteCurrencyAsync, payload);
    yield put(deleteCurrencySuccess(result.data));
    yield put(getAllCurrency());
  } catch (error) {
    yield put(deleteCurrencyError('Delete Currency Error !'));
  }
}

export function* watchGetAllCurrency() {
  yield takeEvery(GET_ALL_CURRENCY, GetAllCurrency);
}
export function* watchCreateCurrency() {
  yield takeEvery(CREATE_CURRENCY, CreateCurrency);
}
export function* watchGetSingleCurrency() {
  yield takeEvery(GET_SINGLE_CURRENCY, GetSingleCurrency);
}
export function* watchUpdateCurrency() {
  yield takeEvery(UPDATE_CURRENCY, UpdateCurrency);
}
export function* watchDeleteCurrency() {
  yield takeEvery(DELETE_CURRENCY, DeleteCurrency);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllCurrency),
    fork(watchGetSingleCurrency),
    fork(watchCreateCurrency),
    fork(watchUpdateCurrency),
    fork(watchDeleteCurrency),
  ]);
}
