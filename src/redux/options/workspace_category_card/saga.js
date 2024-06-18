/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import {
  CREATE_WORKSPACE_CATEGORY_CARD,
  DELETE_WORKSPACE_CATEGORY_CARD,
  GET_WORKSPACE_CATEGORY_CARDS,
  UPDATE_WORKSPACE_CATEGORY_CARD,
} from '../../types/options/workspace_category_card';

import {
  createWorkspaceCategoryCardFailed,
  createWorkspaceCategoryCardSuccessful,
  deleteWorkspaceCategoryCardFailed,
  deleteWorkspaceCategoryCardSuccessful,
  getWorkspaceCategoryCards,
  getWorkspaceCategoryCardsFailed,
  getWorkspaceCategoryCardsSuccessful,
  updateWorkspaceCategoryCardFailed,
  updateWorkspaceCategoryCardSuccessful,
} from './actions';

// get_workspace_category_cards
const getWorkspaceCategoryCardsAsync = () => {
  return get(
    `/admin/workspace/category-card`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetWorkspaceCategoryCards() {
  try {
    const response = yield call(getWorkspaceCategoryCardsAsync);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(getWorkspaceCategoryCardsSuccessful({ data: response.data }));
    } else {
      throw new Error('getWorkspaceCategoryCards Response is not success!');
    }
  } catch (error) {
    yield put(getWorkspaceCategoryCardsFailed({ error, data: [] }));
  }
}

// create_workspace_category_card
const createWorkspaceCategoryCardAsync = (payload) => {
  return post('/admin/workspace/category-card', payload, {}, { notify: true });
};
function* CreateWorkspaceCategoryCard({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createWorkspaceCategoryCardAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createWorkspaceCategoryCardSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getWorkspaceCategoryCards());
    } else {
      throw new Error('createWorkspaceCategoryCard Response is not success!');
    }
  } catch (error) {
    yield put(createWorkspaceCategoryCardFailed(error));
  }
}

// update_workspace_category_card
const updateWorkspaceCategoryCardAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/workspace/category-card/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdateWorkspaceCategoryCard({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateWorkspaceCategoryCardAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateWorkspaceCategoryCardSuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getWorkspaceCategoryCards());
    } else {
      throw new Error('updateWorkspaceCategoryCard  Response is not success!');
    }
  } catch (error) {
    yield put(updateWorkspaceCategoryCardFailed(error));
  }
}

// delete_workspace_category_card
const deleteWorkspaceCategoryCardAsync = (id) => {
  return del(`/admin/workspace/category-card/${id}`, {}, { notify: true });
};
// delete_workspace_category_card
function* DeleteWorkspaceCategoryCard({ payload }) {
  try {
    const response = yield call(deleteWorkspaceCategoryCardAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteWorkspaceCategoryCardSuccessful(response.data));
      yield put(getWorkspaceCategoryCards());
    } else {
      throw new Error('deleteWorkspaceCategoryCard Response is not success!');
    }
  } catch (error) {
    yield put(deleteWorkspaceCategoryCardFailed(error));
  }
}

export default function* workspaceCategoryCardSaga() {
  yield takeLatest(GET_WORKSPACE_CATEGORY_CARDS, GetWorkspaceCategoryCards);
  yield takeLatest(CREATE_WORKSPACE_CATEGORY_CARD, CreateWorkspaceCategoryCard);
  yield takeLatest(UPDATE_WORKSPACE_CATEGORY_CARD, UpdateWorkspaceCategoryCard);
  yield takeLatest(DELETE_WORKSPACE_CATEGORY_CARD, DeleteWorkspaceCategoryCard);
}
