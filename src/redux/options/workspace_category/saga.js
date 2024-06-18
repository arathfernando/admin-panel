/* eslint-disable no-unused-expressions */
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosPut, del, get, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import {
  CREATE_WORKSPACE_CATEGORY,
  DELETE_WORKSPACE_CATEGORY,
  GET_WORKSPACE_CATEGORIES,
  UPDATE_WORKSPACE_CATEGORY,
} from '../../types/options/workspace_category';

import {
  createWorkspaceCategoryFailed,
  createWorkspaceCategorySuccessful,
  deleteWorkspaceCategoryFailed,
  deleteWorkspaceCategorySuccessful,
  getWorkspaceCategories,
  getWorkspaceCategoriesFailed,
  getWorkspaceCategoriesSuccessful,
  updateWorkspaceCategoryFailed,
  updateWorkspaceCategorySuccessful,
} from './actions';

// get_workspace_categories
const getWorkspaceCategoriesAsync = () => {
  return get(
    `/admin/workspace/category`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true, notifyWarn: false }
  );
};
function* GetWorkspaceCategories() {
  try {
    const response = yield call(getWorkspaceCategoriesAsync);
    yield put(getWorkspaceCategoriesSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getWorkspaceCategoriesFailed({ error, data: [] }));
  }
}

// create_workspace_category
const createWorkspaceCategoryAsync = ({ translate, ...payload }) => {
  return post(
    '/admin/workspace/category',
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* CreateWorkspaceCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createWorkspaceCategoryAsync, payload);
    if (response.status === 201 && response.statusText === 'Created') {
      yield put(createWorkspaceCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getWorkspaceCategories());
    } else {
      throw new Error('createWorkspaceCategory Response is not success!');
    }
  } catch (error) {
    yield put(createWorkspaceCategoryFailed(error));
  }
}

// update_workspace_category
const updateWorkspaceCategoryAsync = ({ id, translate, ...payload }) => {
  return axiosPut(
    `/admin/workspace/category/${id}`,
    objectToFormData(payload),
    {},
    { notify: true, translate }
  );
};
function* UpdateWorkspaceCategory({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateWorkspaceCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(updateWorkspaceCategorySuccessful(response.data));
      onSuccess?.(response.data);
      yield put(getWorkspaceCategories());
    } else {
      throw new Error('updateWorkspaceCategory  Response is not success!');
    }
  } catch (error) {
    yield put(updateWorkspaceCategoryFailed(error));
  }
}

// delete_workspace_category
const deleteWorkspaceCategoryAsync = ({ id, translate }) => {
  return del(
    `/admin/workspace/category/${id}`,
    {},
    { notify: true, translate }
  );
};
// delete_workspace_category
function* DeleteWorkspaceCategory({ payload }) {
  try {
    const response = yield call(deleteWorkspaceCategoryAsync, payload);
    if (response.status === 200 && response.statusText === 'OK') {
      yield put(deleteWorkspaceCategorySuccessful(response.data));
      yield put(getWorkspaceCategories());
    } else {
      throw new Error('deleteWorkspaceCategory Response is not success!');
    }
  } catch (error) {
    yield put(deleteWorkspaceCategoryFailed(error));
  }
}

export default function* workspaceCategorySaga() {
  yield takeLatest(GET_WORKSPACE_CATEGORIES, GetWorkspaceCategories);
  yield takeLatest(CREATE_WORKSPACE_CATEGORY, CreateWorkspaceCategory);
  yield takeLatest(UPDATE_WORKSPACE_CATEGORY, UpdateWorkspaceCategory);
  yield takeLatest(DELETE_WORKSPACE_CATEGORY, DeleteWorkspaceCategory);
}
