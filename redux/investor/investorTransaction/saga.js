/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-expressions */
import { isArray, uniqBy } from 'lodash';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';

import {
  DELETE_INVESTOR_ASSIGN_SHARE,
  DELETE_INVESTOR_SHARE_PRICE,
  GET_ALL_INVESTOR_USERS,
  GET_INVESTOR_TRANSACTIONS,
  GET_INVESTOR_TRANSACTIONS_OF_USER,
  GET_SHARE_PRICES,
  INVESTOR_ASSIGN_PRICE,
  INVESTOR_ASSIGN_SHARES,
  UPDATE_INVESTOR_ASSIGN_SHARE,
  UPDATE_INVESTOR_SHARE_PRICE,
} from '../../types/investor/investorTransaction';

import {
  deleteInvestorAssignShareFailed,
  deleteInvestorAssignShareSuccessful,
  deleteInvestorSharePriceFailed,
  deleteInvestorSharePriceSuccessful,
  getAllInvestorUsersFailed,
  getAllInvestorUsersSuccessful,
  getInvestorTransactions,
  getInvestorTransactionsFailed,
  getInvestorTransactionsOfUser,
  getInvestorTransactionsOfUserFailed,
  getInvestorTransactionsOfUserSuccessful,
  getInvestorTransactionsSuccessful,
  getSharePrices,
  getSharePricesFailed,
  getSharePricesSuccessful,
  investorAssignPriceFailed,
  investorAssignPriceSuccessful,
  investorAssignSharesFailed,
  investorAssignSharesSuccessful,
  updateInvestorAssignShareFailed,
  updateInvestorAssignShareSuccessful,
  updateInvestorSharePriceFailed,
  updateInvestorSharePriceSuccessful,
} from './actions';

// create_investor_investorTransaction
const investorAssignShares = (payload) => {
  return post('/admin/investor/assign-share', payload, {}, { notify: true });
};
function* InvestorAssignShares({ payload: { onSuccess, userId, ...payload } }) {
  try {
    const response = yield call(investorAssignShares, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(investorAssignSharesSuccessful(response.data));
      if (userId) {
        yield put(getInvestorTransactionsOfUser({ id: userId }));
      } else {
        yield put(getInvestorTransactions());
      }
      onSuccess?.();
    } else {
      throw new Error('Create investorTransaction Response is not success!');
    }
  } catch (error) {
    yield put(investorAssignSharesFailed(error));
  }
}

// get_investor_investorTransactions
const getInvestorTransactionsAsync = (search) => {
  return api.get(`/admin/investor/assign-share`, {
    params: {
      ...(search
        ? { search, page: 1, limit: 1000, filter: 'SUBAREA' }
        : { page: 1, limit: 1000 }),
    },
  });
};
function* GetInvestorTransactions({ payload }) {
  try {
    const response = yield call(
      getInvestorTransactionsAsync,
      payload?.searchKey
    );
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getInvestorTransactionsSuccessful({
          ...response?.data,
          data: isArray(response?.data?.data)
            ? response.data.data.map((data) => ({
                ...data,
                price_share: data.share_price?.price_share,
              }))
            : [],
        })
      );
    } else {
      throw new Error('get investorTransaction Response is not success!');
    }
  } catch (error) {
    yield put(getInvestorTransactionsFailed({ error, data: [] }));
  }
}

// investor_assign_price
const investorAssignPrice = (payload) => {
  return post('/admin/investor/assign-price', payload, {}, { notify: true });
};
function* InvestorAssignPrice({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(investorAssignPrice, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(investorAssignPriceSuccessful(response.data));
      yield put(getSharePrices());
      onSuccess?.();
    } else {
      throw new Error('Assign price Response is not success!');
    }
  } catch (error) {
    yield put(investorAssignPriceFailed(error));
  }
}

// get_share_prices
const getSharePricesAsync = (search) => {
  return api.get(`/admin/investor/assign-price`, {
    params: {
      ...(search ? { search, page: 1, limit: 1000 } : { page: 1, limit: 1000 }),
    },
  });
};
function* GetSharePrices({ payload }) {
  try {
    const response = yield call(getSharePricesAsync, payload?.searchKey);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getSharePricesSuccessful({
          data: isArray(response.data)
            ? response.data?.map?.((data) => ({
                ...data,
                no_of_share: data?.area_share?.amount_share,
              }))
            : [],
        })
      );
    } else {
      throw new Error('Create zone Response is not success!');
    }
  } catch (error) {
    yield put(getSharePricesFailed({ error, data: [] }));
  }
}

// get_investor_transactions_of_user
const getInvestorTransactionsOfUserAsync = ({ search, id }) => {
  return api.get(`/admin/investor/assign-share/user/${id}`, {
    params: {
      ...(search ? { search, filter: 'SUBAREA' } : { filter: 'SUBAREA' }),
    },
  });
};
function* GetInvestorTransactionsOfUser({ payload }) {
  try {
    const response = yield call(getInvestorTransactionsOfUserAsync, {
      ...payload,
      search: payload?.searchKey,
    });
    yield put(
      getInvestorTransactionsOfUserSuccessful({
        ...payload,
        ...response?.data,
        data: isArray(response?.data?.data) ? response.data.data : [],
      })
    );
  } catch (error) {
    yield put(
      getInvestorTransactionsOfUserFailed({ ...payload, error, data: [] })
    );
  }
}

// update_investor_share_price
const updateInvestorSharePrice = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/investor/assign-price/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateInvestorSharePrice({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateInvestorSharePrice, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateInvestorSharePriceSuccessful(response.data));
      onSuccess?.();
      yield put(getSharePrices());
    } else {
      throw new Error('Update InvestorSharePrice Response is not success!');
    }
  } catch (error) {
    yield put(updateInvestorSharePriceFailed(error));
  }
}

// delete_investor_share_price
const deleteInvestorSharePrice = (id) => {
  return del(`/admin/investor/assign-price/${id}`, {}, { notify: true });
};
// delete_investor_share_price
function* DeleteInvestorSharePrice({ payload }) {
  try {
    const response = yield call(deleteInvestorSharePrice, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteInvestorSharePriceSuccessful(response.data));
      yield put(getSharePrices());
    } else {
      throw new Error('Delete eInvestorSharePrice Response is not success!');
    }
  } catch (error) {
    yield put(deleteInvestorSharePriceFailed(error));
  }
}

// update_investor_assign_share
const updateInvestorAssignShareAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/investor/assign-share/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateInvestorAssignShare({
  payload: { onSuccess, userId, ...payload },
}) {
  try {
    const response = yield call(updateInvestorAssignShareAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateInvestorAssignShareSuccessful(response.data));
      onSuccess?.(response.data);
      if (userId) {
        yield put(getInvestorTransactionsOfUser({ id: userId }));
      } else {
        yield put(getInvestorTransactions());
      }
    } else {
      throw new Error('UpdateInvestorAssignShare Response is not success!');
    }
  } catch (error) {
    yield put(updateInvestorAssignShareFailed(error));
  }
}

// delete_investor_assign_share
const deleteInvestorAssignShareAsync = ({ id }) => {
  return del(`/admin/investor/assign-share/${id}`, {}, { notify: true });
};
// delete_investor_assign_share
function* DeleteInvestorAssignShare({ payload: { userId, ...payload } }) {
  try {
    const response = yield call(deleteInvestorAssignShareAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteInvestorAssignShareSuccessful(response.data));
      if (userId) {
        yield put(getInvestorTransactionsOfUser({ id: userId }));
      } else {
        yield put(getInvestorTransactions());
      }
    } else {
      throw new Error('DeleteInvestorAssignShare Response is not success!');
    }
  } catch (error) {
    yield put(deleteInvestorAssignShareFailed(error));
  }
}

// get_all_investor_users
const getAllInvestorUsersAsync = () => {
  return api.get(`/admin/investor/assign-share`, {
    params: { page: 1, limit: 1000 },
  });
};
function* GetAllInvestorUsers() {
  try {
    const response = yield call(getAllInvestorUsersAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(
        getAllInvestorUsersSuccessful({
          ...response?.data,
          data: isArray(response?.data?.data)
            ? uniqBy(response.data.data, ({ user }) => user?.id).map(
                (data) => ({
                  ...data,
                  price_share: data.share_price?.price_share,
                })
              )
            : [],
        })
      );
    } else {
      throw new Error('GetAllInvestorUsers Response is not success!');
    }
  } catch (error) {
    yield put(getAllInvestorUsersFailed({ error, data: [] }));
  }
}

export function* watchInvestorTransaction() {
  yield takeLatest(INVESTOR_ASSIGN_SHARES, InvestorAssignShares);
  yield takeLatest(GET_INVESTOR_TRANSACTIONS, GetInvestorTransactions);
  yield takeLatest(INVESTOR_ASSIGN_PRICE, InvestorAssignPrice);
  yield takeLatest(GET_SHARE_PRICES, GetSharePrices);
  yield takeLatest(
    GET_INVESTOR_TRANSACTIONS_OF_USER,
    GetInvestorTransactionsOfUser
  );
  yield takeLatest(UPDATE_INVESTOR_SHARE_PRICE, UpdateInvestorSharePrice);
  yield takeLatest(DELETE_INVESTOR_SHARE_PRICE, DeleteInvestorSharePrice);
  yield takeLatest(UPDATE_INVESTOR_ASSIGN_SHARE, UpdateInvestorAssignShare);
  yield takeLatest(DELETE_INVESTOR_ASSIGN_SHARE, DeleteInvestorAssignShare);
  yield takeLatest(GET_ALL_INVESTOR_USERS, GetAllInvestorUsers);
}

export default function* rootSaga() {
  yield all([fork(watchInvestorTransaction)]);
}
