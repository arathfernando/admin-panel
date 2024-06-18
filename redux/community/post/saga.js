/* eslint-disable no-unused-expressions */
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  UPDATE_POST,
} from '../../types/community/post';

import {
  createPostFailed,
  createPostSuccessful,
  deletePostFailed,
  deletePostSuccessful,
  getPosts,
  getPostsFailed,
  getPostsSuccessful,
  updatePostFailed,
  updatePostSuccessful,
} from './actions';

import { axiosPut, del, get, post } from '../../../ApiConfig';

// get_post
const getPostsAsync = ({ id, ...params } = {}) => {
  return get(
    `/admin/community/community-post/community/${id || ','}`,
    { params: { post_location: 'ALL', ...params } },
    { notifyError: true }
  );
};
function* GetPosts({ payload }) {
  try {
    const response = yield call(getPostsAsync, payload);
    yield put(getPostsSuccessful({ data: response.data }));
  } catch (error) {
    yield put(getPostsFailed({ error, data: [] }));
  }
}

// create_post
const createPostAsync = (payload) => {
  return post('/admin/community/community-post', payload, {}, { notify: true });
};
function* CreatePost({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(createPostAsync, payload);
    yield put(getPosts());
    yield put(createPostSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(createPostFailed(error));
  }
}

// update_post
const updatePostAsync = ({ id, ...payload }) => {
  return axiosPut(
    `/admin/community/community-post/${id}`,
    payload,
    {},
    { notify: true }
  );
};
function* UpdatePost({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updatePostAsync, payload);
    yield put(getPosts());
    yield put(updatePostSuccessful(response.data));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(updatePostFailed(error));
  }
}

// delete_post
const deletePostAsync = (id) => {
  return del(`/admin/community/community-post/${id}`, {}, { notify: true });
};
// delete_post
function* DeletePost({ payload }) {
  try {
    const response = yield call(deletePostAsync, payload);
    yield put(deletePostSuccessful(response.data));
    yield put(getPosts());
  } catch (error) {
    yield put(deletePostFailed(error));
  }
}

export function* watchGetPost() {
  yield takeLatest(GET_POST, GetPosts);
  yield takeLatest(CREATE_POST, CreatePost);
  yield takeLatest(UPDATE_POST, UpdatePost);
  yield takeLatest(DELETE_POST, DeletePost);
}

export default function* rootSaga() {
  yield all([fork(watchGetPost)]);
}
