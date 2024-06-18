import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';
import { getGoals } from '../../actions';

import {
  CREATE_GOAL,
  DELETE_GOAL,
  GET_ALL_GOALS,
  UPDATE_GOAL,
} from '../../types/options/goal';

import {
  createGoalError,
  createGoalSuccess,
  deleteGoalError,
  deleteGoalSuccess,
  getAllGoals,
  getAllGoalsSuccess,
  updateGoalError,
  updateUserGoalsuccess,
} from './actions';

const getAllGoalsAsync = async () => {
  return api
    .get(`/admin/options/goals`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllGoals() {
  try {
    const result = yield call(getAllGoalsAsync);
    if (result.status) {
      yield put(getAllGoalsSuccess(result.data));
    }
  } catch (error) {}
}

const createGoalAsync = async ({ payload: { translate, ...payload } }) => {
  return post(
    `/admin/options/goal`,
    objectToFormData(payload),
    {},
    {
      translate,
    }
  )
    .then((res) => res)
    .catch((error) => error);
};

function* CreateGoal(payload) {
  try {
    const result = yield call(createGoalAsync, payload);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createGoalSuccess(result.data));
      yield put(getGoals({ page: 1, limit: 1000 }));
    } else {
      yield put(createGoalError('Create Goal Response is not success!'));
    }
  } catch (error) {
    yield put(createGoalError('Create Goal Error !'));
  }
}

const updateGoalAsync = async ({ translate, ...payload }) => {
  const { id, goal_image, ...reqObj } = payload;
  if (typeof goal_image !== 'string') {
    reqObj.goal_image = goal_image;
  }

  return axiosPut(
    `/admin/options/goal/${id}`,
    objectToFormData(reqObj),
    {},
    {
      translate,
      notify: true,
    }
  );
};

function* UpdateGoal({ payload }) {
  try {
    const result = yield call(updateGoalAsync, payload);
    if (result.status) {
      yield put(updateUserGoalsuccess(result.data));
      yield put(getAllGoals());
    } else {
      yield put(updateGoalError('Update Goal Response is not success!'));
    }
  } catch (error) {
    yield put(updateGoalError('Update Goal Error !'));
  }
}

const deleteGoalAsync = async ({ payload }) => {
  return api
    .delete(`/admin/options/goal/${payload}`)
    .then((res) => res)
    .catch((error) => error);
};

function* DeleteGoal(payload) {
  try {
    const result = yield call(deleteGoalAsync, payload);
    if (result.status) {
      yield put(deleteGoalSuccess(result.data));
      yield put(getAllGoals());
    } else {
      yield put(deleteGoalError('Delete Goal Response is not success!'));
    }
  } catch (error) {
    yield put(deleteGoalError('Delete Goal Error !'));
  }
}

export function* watchGetAllLanguage() {
  yield takeEvery(GET_ALL_GOALS, GetAllGoals);
}
export function* watchCreateGoal() {
  yield takeEvery(CREATE_GOAL, CreateGoal);
}
export function* watchUpdateGoal() {
  yield takeEvery(UPDATE_GOAL, UpdateGoal);
}
export function* watchDeleteGoal() {
  yield takeEvery(DELETE_GOAL, DeleteGoal);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllLanguage),
    fork(watchCreateGoal),
    fork(watchUpdateGoal),
    fork(watchDeleteGoal),
  ]);
}
