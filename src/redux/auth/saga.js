import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
  FORGOT_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
} from '../types/auth';

import {
  forgotPasswordError,
  forgotPasswordSuccess,
  loginUserError,
  loginUserSuccess,
  resetPasswordError,
  resetPasswordSuccess,
} from './actions';

import api, { axiosPut, post } from '../../ApiConfig';
import { removeSession, setCurrentUser } from '../../helpers/Utils';
import { getCurrentAdmin } from '../actions';

const loginWithEmailPasswordAsync = async (userInfo) =>
  api.post(`/admin/login`, userInfo);

function* loginWithEmailPassword({ payload: { onSuccess, payload } }) {
  try {
    const loginResult = yield call(loginWithEmailPasswordAsync, payload);
    if (loginResult.data) {
      const authUser = loginResult.data?.user;
      onSuccess(loginResult.data);
      yield put(loginUserSuccess(authUser));
      yield put(getCurrentAdmin());
    } else {
      yield put(loginUserError(loginResult.data?.message));
    }
  } catch (error) {
    yield put(loginUserError(error.message));
  }
}

function* logout() {
  setCurrentUser();
  removeSession();
}

const forgotPasswordAsync = async (email) => {
  return post(
    '/admin/forgot-password',
    { email },
    {},
    { notify: true, notificationTop: 0 }
  );
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

const resetPasswordAsync = async (payload) => {
  return axiosPut(
    `/admin/change-password`,
    payload,
    {},
    { notifyError: true, notificationTop: 0 }
  );
};

function* resetPassword({ payload: { onSuccess, ...payload } }) {
  try {
    const resetPasswordStatus = yield call(resetPasswordAsync, payload);
    if (resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
      onSuccess();
    }
  } catch (error) {
    yield put(resetPasswordError(`${error}`));
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
