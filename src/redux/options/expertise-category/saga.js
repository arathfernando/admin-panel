import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import api, { axiosPut, del, post } from '../../../ApiConfig';
import objectToFormData from '../../../helpers/objectToFormData';

import {
  CREATE_EXPERTISE_CATEGORY,
  DELETE_EXPERTISE_CATEGORY,
  GET_ALL_EXPERTISE_CATEGORY,
  GET_ALL_SKILL,
  ORDER_EXPERTISE_CATEGORY,
  UPDATE_EXPERTISE_CATEGORY,
} from '../../types/options/expertise-category';

import {
  createExpertiseCategoryError,
  createExpertiseCategorySuccess,
  deleteExpertiseCategoryError,
  deleteExpertiseCategorySuccess,
  getAllExpertiseCategory,
  getAllExpertiseCategoryError,
  getAllExpertiseCategorySuccess,
  getAllSkillError,
  getAllSkillSuccess,
  orderExpertiseCategoryError,
  orderExpertiseCategorySuccess,
  updateExpertiseCategoryError,
  updateExpertiseCategorySuccess,
} from './actions';

const getAllExpertiseCategoryAsync = async () =>
  api
    .get(`/admin/options/expertise-category`)
    .then((res) => res.data)
    .catch((error) => error);

function* GetAllExpertiseCategory() {
  try {
    const result = yield call(getAllExpertiseCategoryAsync);
    if (result) {
      yield put(getAllExpertiseCategorySuccess(result));
    } else {
      yield put(
        getAllExpertiseCategoryError('Get All Users Response is not success!')
      );
    }
  } catch (error) {
    yield put(getAllExpertiseCategoryError('Get All Users Error !'));
  }
}

const getAllSkillAsync = async () =>
  api
    .get(`/expertise-category/skill`)
    .then((res) => res.data)
    .catch((error) => error);

function* GetAllSkill() {
  try {
    const result = yield call(getAllSkillAsync);
    if (result.success) {
      yield put(getAllSkillSuccess(result.data));
    } else {
      yield put(getAllSkillError('Get All Skills Response is not success!'));
    }
  } catch (error) {
    yield put(getAllSkillError('Get All Skills Error !'));
  }
}

const createExpertiseCategoryAsync = async ({
  payload: { translate, ...payload },
}) => {
  return post(
    `/admin/options/expertise-category`,
    objectToFormData(payload),
    {},
    { translate, notify: true }
  );
};

function* CreateExpertiseCategory(data) {
  try {
    const result = yield call(createExpertiseCategoryAsync, data);
    if (result) {
      yield put(createExpertiseCategorySuccess(result));
      yield put(getAllExpertiseCategory());
    } else {
      yield put(
        createExpertiseCategoryError(
          'Create Expertise Category is not success!'
        )
      );
    }
  } catch (error) {}
}

const updateExpertiseCategoryAsync = async ({
  id,
  payload: { translate, ...payload },
}) => {
  return axiosPut(
    `/admin/options/expertise-category/${id}`,
    objectToFormData(payload),
    {},
    { translate, notify: true }
  );
};

function* UpdateExpertiseCategory(data) {
  try {
    data.id = data.payload.id;
    delete data.payload.id;
    const result = yield call(updateExpertiseCategoryAsync, data);
    if (result) {
      yield put(updateExpertiseCategorySuccess(result));
      yield put(getAllExpertiseCategory());
    } else {
      yield put(
        updateExpertiseCategoryError(
          'Update Expertise Category is not success!'
        )
      );
    }
  } catch (error) {}
}

const deleteExpertiseCategoryAsync = async ({ payload: { id, translate } }) => {
  return del(
    `/admin/options/expertise-category/${id}`,
    {},
    { translate, notify: true }
  );
};

function* DeleteExpertiseCategory(data) {
  try {
    const result = yield call(deleteExpertiseCategoryAsync, data);
    if (result) {
      yield put(deleteExpertiseCategorySuccess(result));
      yield put(getAllExpertiseCategory());
    } else {
      yield put(
        deleteExpertiseCategoryError(
          'Delete Expertise Category is not success!'
        )
      );
    }
  } catch (error) {}
}

const orderExpertiseCategoryAsync = async ({ payload }) => {
  return api
    .get(`/expertise-category/${payload.id}/${payload.flag}`)
    .then((res) => res.data)
    .catch((error) => error);
};

function* OrderExpertiseCategory(data) {
  try {
    const result = yield call(orderExpertiseCategoryAsync, data);
    if (result.success) {
      yield put(orderExpertiseCategorySuccess(result));
      yield put(getAllExpertiseCategory());
    } else {
      yield put(
        orderExpertiseCategoryError('Order Expertise Category is not success!')
      );
    }
  } catch (error) {}
}

export function* watchGetAllExpertiseCategory() {
  yield takeEvery(GET_ALL_EXPERTISE_CATEGORY, GetAllExpertiseCategory);
}
export function* watchGetAllSkill() {
  yield takeEvery(GET_ALL_SKILL, GetAllSkill);
}
export function* watchCreateExpertiseCategory() {
  yield takeEvery(CREATE_EXPERTISE_CATEGORY, CreateExpertiseCategory);
}
export function* watchUpdateExpertiseCategory() {
  yield takeEvery(UPDATE_EXPERTISE_CATEGORY, UpdateExpertiseCategory);
}
export function* watchDeleteExpertiseCategory() {
  yield takeEvery(DELETE_EXPERTISE_CATEGORY, DeleteExpertiseCategory);
}
export function* watchOrderExpertiseCategory() {
  yield takeEvery(ORDER_EXPERTISE_CATEGORY, OrderExpertiseCategory);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllExpertiseCategory),
    fork(watchGetAllSkill),
    fork(watchCreateExpertiseCategory),
    fork(watchUpdateExpertiseCategory),
    fork(watchDeleteExpertiseCategory),
    fork(watchOrderExpertiseCategory),
  ]);
}
