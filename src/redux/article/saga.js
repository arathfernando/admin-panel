/* eslint-disable camelcase */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE,
  UPDATE_ARTICLE,
} from '../types/article';

import { axiosPut, del, get, post } from '../../ApiConfig';
import objectToFormData from '../../helpers/objectToFormData';
import {
  createArticleFailed,
  createArticleSuccessful,
  deleteArticleFailed,
  deleteArticleSuccessful,
  getArticles,
  getArticlesFailed,
  getArticlesSuccessful,
  updateArticleFailed,
  updateArticleSuccessful,
} from './actions';
// get_article
const getArticlesAsync = () => {
  return get(
    `/admin/options/article`,
    { params: { page: 1, limit: 1000 } },
    { notifyError: true }
  );
};
function* GetArticles() {
  try {
    const response = yield call(getArticlesAsync);
    yield put(getArticlesSuccessful({ data: response.data?.data || [] }));
  } catch (error) {
    yield put(getArticlesFailed({ error, data: [] }));
  }
}

// create_article
const createArticleAsync = (payload) => {
  return post(
    '/admin/options/article',
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* CreateArticle({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createArticleAsync, payload);
    yield put(createArticleSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getArticles());
  } catch (error) {
    yield put(createArticleFailed(error));
  }
}

// update_article
const updateArticleAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/options/article/${id}`,
    objectToFormData(payload),
    {},
    { notify: true }
  );
};
function* UpdateArticle({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateArticleAsync, payload);
    yield put(updateArticleSuccessful(response.data));
    onSuccess?.(response.data);
    yield put(getArticles());
  } catch (error) {
    yield put(updateArticleFailed(error));
  }
}

// delete_article
const deleteArticleAsync = (id) => {
  return del(`/admin/options/article/${id}`, {}, { notify: true });
};
// delete_article
function* DeleteArticle({ payload }) {
  try {
    const response = yield call(deleteArticleAsync, payload);
    yield put(deleteArticleSuccessful(response.data));
    yield put(getArticles());
  } catch (error) {
    yield put(deleteArticleFailed(error));
  }
}

export function* watchArticle() {
  yield takeLatest(GET_ARTICLE, GetArticles);
  yield takeLatest(CREATE_ARTICLE, CreateArticle);
  yield takeLatest(UPDATE_ARTICLE, UpdateArticle);
  yield takeLatest(DELETE_ARTICLE, DeleteArticle);
}

export default function* rootSaga() {
  yield all([fork(watchArticle)]);
}
