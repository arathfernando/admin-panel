/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-as-default-member */
import { isEmpty } from 'lodash';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import api, { axiosPut, post } from '../../ApiConfig';
import objectToFormData from '../../helpers/objectToFormData';

import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USER,
  GET_BASIC_TYPES,
  GET_BASIC_TYPE_CATEGORIES,
  GET_GOALS,
  GET_SOCIALS,
  GET_USER,
  UPDATE_USER_EDUCATION,
  UPDATE_USER_GENERAL,
  UPDATE_USER_GOALS,
  UPDATE_USER_INTERESTS,
  UPDATE_USER_ROLE_PROFILES,
  UPDATE_USER_SOCIAL_MEDIA,
  UPDATE_USER_WORK_EXPRIENCE,
} from '../types/user';

import {
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  getAllUsers,
  getAllUsersError,
  getAllUsersSuccess,
  getBasicTypeCategoriesFailed,
  getBasicTypeCategoriesSuccessful,
  getBasicTypesFailed,
  getBasicTypesSuccessful,
  getGoalsFailed,
  getGoalsSuccessful,
  getSingleUser,
  getSocialsFailed,
  getSocialsSuccessful,
  getUsersError,
  getUsersSuccess,
  updateSingleUser,
  updateUserEducationFailed,
  updateUserEducationSuccessful,
  updateUserGeneralFailed,
  updateUserGeneralSuccessful,
  updateUserGoalsFailed,
  updateUserGoalsSuccessful,
  updateUserInterestsFailed,
  updateUserInterestsSuccessful,
  updateUserRoleProfilesFailed,
  updateUserRoleProfilesSuccessful,
  updateUserSocialMediaFailed,
  updateUserSocialMediaSuccessful,
  updateUserWorkExprienceFailed,
  updateUserWorkExprienceSuccessful,
} from './actions';

const getAllUsersAsync = async (payload) => {
  return api
    .get(`/admin/users?page=${payload.page}&limit=${payload.limit}`)
    .then((res) => res)
    .catch((error) => error);
};

function* GetAllUsers({ payload }) {
  try {
    const result = yield call(getAllUsersAsync, payload);
    if (result.status) {
      yield put(getAllUsersSuccess(result.data));
    } else {
      yield put(getAllUsersError('Get All Users Response is not success!'));
    }
  } catch (error) {
    localStorage.setItem('user-fetch-error', JSON.stringify(error));
    console.log('user-fetch-error', { error });
    yield put(getAllUsersError(error));
  }
}

export function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USER, GetAllUsers);
}

const getUsersAsync = async ({ id }) =>
  api
    .get(`/admin/users/profile/general/${id}`)
    .then((res) => res)
    .catch((error) => error);

function* getUser({ payload }) {
  try {
    const result = yield call(getUsersAsync, payload);
    if (result.status) {
      yield put(getUsersSuccess(result.data));
    } else {
      yield put(getUsersError('Get User Response is not success!'));
    }
  } catch (error) {
    yield put(getUsersError('Get User Error !'));
  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUser);
}

const createUserAsync = async ({ payload }) => {
  const { ...reqObj } = payload;
  return post(
    `/admin/users`,
    objectToFormData(reqObj),
    {},
    { notifyError: true }
  );
};

function* createUser(user) {
  try {
    const result = yield call(createUserAsync, user);
    if (result.status === 201 && result.statusText === 'Created') {
      yield put(createUserSuccess(result.data.result));
      yield put(getAllUsers({ page: 1, limit: 1000 }));
    } else {
      yield put(createUserError('Get User Response is not success!'));
    }
  } catch (error) {
    yield put(createUserError('Create User Error !'));
  }
}

export function* watchCreateUser() {
  yield takeEvery(CREATE_USER, createUser);
}

const deleteUserAsync = async (payload) => {
  return api
    .delete(`/admin/users/${payload.payload}`)
    .then((res) => res)
    .catch((error) => error);
};
function* DeleteUser(payload) {
  try {
    const result = yield call(deleteUserAsync, payload);
    if (result.status) {
      yield put(deleteUserSuccess(result.data.result));
      yield put(getAllUsers({ page: 1, limit: 1000 }));
    } else {
      yield put(deleteUserError('Delete User Response is not success!'));
    }
  } catch (error) {
    yield put(deleteUserError('Delete User Error !'));
  }
}

export function* watchdeleteUser() {
  yield takeEvery(DELETE_USER, DeleteUser);
}

// ------ //

// update_user_general
const updateUserGeneral = async ({
  id,
  avatar,
  is_hubber_team,
  status,
  email,
  profile_types,
  ...payload
}) => {
  if (avatar && typeof avatar !== 'string') {
    payload.avatar = avatar;
  }
  const userRes = api.put(
    `/admin/users/${id}`,
    objectToFormData(
      {
        email,
        status,
        is_hubber_team,
        profile_types: profile_types?.toString?.(),
      },
      { dontAppendKeyForEmptyValue: true }
    )
  );

  const userGeneralRes = axiosPut(
    `/admin/users/general/${id}`,
    objectToFormData(payload),
    {},
    { notify: true }
  );

  // eslint-disable-next-line no-unused-vars
  return Promise.all([userRes, userGeneralRes]).then(([_, { data }]) => ({
    data,
  }));
};
function* UpdateUserGeneral({ payload }) {
  try {
    const response = yield call(updateUserGeneral, payload);
    yield put(updateUserGeneralSuccessful(response?.data));
  } catch (error) {
    yield put(updateUserGeneralFailed(error));
  }
}

// update_user_work_exprience
const updateUserWorkExprience = ({ id, successMsg, ...payload }) => {
  return axiosPut(
    `/admin/users/work-experience/${id}`,
    payload,
    {},
    { notify: true, successMsg }
  );
};
function* UpdateUserWorkExprience({
  payload: { submitType, onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateUserWorkExprience, payload);
    yield put(updateUserWorkExprienceSuccessful(response));
    // update user data
    yield put(updateSingleUser({ work_experience: response.data }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response);
  } catch (error) {
    yield put(updateUserWorkExprienceFailed(error));
  }
}

// update_user_education
const updateUserEducation = ({ id, successMsg, ...payload }) => {
  return axiosPut(
    `/admin/users/education/${id}`,
    payload,
    {},
    { notify: true, successMsg }
  );
};
function* UpdateUserEducation({
  payload: { submitType, onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateUserEducation, payload);
    yield put(updateUserEducationSuccessful(response));
    // update user data
    yield put(updateSingleUser({ education: response.data }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response);
  } catch (error) {
    yield put(updateUserEducationFailed(error));
  }
}

// get_socials
const getSocials = () => {
  return api.get(`/admin/options/social`);
};
function* GetSocials() {
  try {
    const response = yield call(getSocials);
    yield put(getSocialsSuccessful(response));
  } catch (error) {
    yield put(getSocialsFailed(error));
  }
}

// update_user_social_media
const updateUserSocialMedia = ({ id, successMsg, ...payload }) => {
  return axiosPut(
    `/admin/users/social-media/${id}`,
    payload,
    {},
    { notify: true, successMsg }
  );
};
function* UpdateUserSocialMedia({
  payload: { submitType, onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateUserSocialMedia, payload);
    yield put(updateUserSocialMediaSuccessful(response));
    // update user data
    yield put(updateSingleUser({ social_media: response.data }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response);
  } catch (error) {
    yield put(updateUserSocialMediaFailed(error));
  }
}

// get_goals
const getGoals = () => {
  return api.get(`/admin/options/goals`);
};
function* GetGoals() {
  try {
    const response = yield call(getGoals);
    yield put(
      getGoalsSuccessful(
        response.data?.sort((a, b) => a.goal_number - b.goal_number)
      )
    );
  } catch (error) {
    yield put(getGoalsFailed(error));
  }
}

// update_user_goals
const updateUserGoals = ({ id, successMsg, ...payload }) => {
  return axiosPut(
    `/admin/users/goal/${id}`,
    payload,
    {},
    { notify: true, successMsg }
  );
};
function* UpdateUserGoals({ payload: { submitType, onSuccess, ...payload } }) {
  try {
    const response = yield call(updateUserGoals, payload);
    yield put(updateUserGoalsSuccessful(response));
    // update user data
    yield put(updateSingleUser({ profile_goal: response.data?.profile_goal }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response);
  } catch (error) {
    yield put(updateUserGoalsFailed(error));
  }
}

// get_basic_type_categories
const getBasicTypeCategories = () => {
  return api.get(`/admin/options/basic-type-category`);
};
function* GetBasicTypeCategories() {
  try {
    const response = yield call(getBasicTypeCategories);
    yield put(getBasicTypeCategoriesSuccessful(response));
  } catch (error) {
    yield put(getBasicTypeCategoriesFailed(error));
  }
}

// get_basic_types
const getBasicTypes = () => {
  return api.get(`/admin/options/basic-type`);
};
function* GetBasicTypes() {
  try {
    const response = yield call(getBasicTypes);
    yield put(getBasicTypesSuccessful(response));
  } catch (error) {
    yield put(getBasicTypesFailed(error));
  }
}

// update_user_interests
const updateUserInterests = ({ id, successMsg, ...payload }) => {
  return axiosPut(
    `/admin/users/user-interest/${id}`,
    payload,
    {},
    { notify: true, successMsg }
  );
};
function* UpdateUserInterests({
  payload: { submitType, onSuccess, ...payload },
}) {
  try {
    const response = yield call(updateUserInterests, payload);
    yield put(updateUserInterestsSuccessful(response));
    // update user data
    yield put(updateSingleUser({ interest: response.data }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response);
  } catch (error) {
    yield put(updateUserInterestsFailed(error));
  }
}

// update_user_role_profiles
const updateUserRoleProfilesAsync = async ({
  id,
  profile_types,
  experience_in_role,
  role,
  creator_profile,
  expert_profile,
  investor_profile,
  teacher_profile,
  hubbers_team_profile,
}) => {
  axiosPut(
    `/admin/users/general/${id}`,
    objectToFormData({ role, experience_in_role }),
    {},
    { notify: true, successMsg: 'Updated user role successfully!' }
  );
  const allRes = await axiosPut(
    `/admin/users/${id}`,
    objectToFormData(
      {
        profile_types: profile_types?.toString?.(),
      },
      { dontAppendKeyForEmptyValue: true }
    ),
    {},
    { notifyError: true }
  ).then(async () => {
    if (isEmpty(experience_in_role)) {
      return {};
    }

    // update creator profile
    const creator_profile_res = isEmpty(creator_profile)
      ? null
      : axiosPut(`/admin/profile/creator/profile/${id}`, creator_profile);

    // update expert profile
    const expert_profile_res = isEmpty(expert_profile)
      ? null
      : axiosPut(`/admin/profile/expert/profile/${id}`, expert_profile);

    // update investor profile
    const investor_profile_res = isEmpty(investor_profile)
      ? null
      : axiosPut(`/admin/profile/investor/profile/${id}`, investor_profile);

    // update teacher profile
    const teacher_profile_res = isEmpty(teacher_profile)
      ? null
      : axiosPut(`/admin/profile/teacher/profile/${id}`, teacher_profile);

    // update hubbers-team profile
    const hubbers_team_profile_res = isEmpty(hubbers_team_profile)
      ? null
      : axiosPut(
          `/admin/profile/hubber-team/profile/${id}`,
          objectToFormData(hubbers_team_profile),
          {},
          { successMsg: 'Hubbers team profile is updated successfully' }
        );

    return Promise.all([
      creator_profile_res,
      expert_profile_res,
      investor_profile_res,
      teacher_profile_res,
      hubbers_team_profile_res,
    ]).then((role_profiles) => ({ role_profiles }));
  });

  return allRes;
};
function* UpdateUserRoleProfiles({ payload: { onSuccess, ...payload } }) {
  try {
    const response = yield call(updateUserRoleProfilesAsync, payload);
    yield put(updateUserRoleProfilesSuccessful({ ...payload, ...response }));
    // refetch user data
    yield put(getSingleUser({ id: payload.id, isRefetching: true }));
    onSuccess?.(response.data);
  } catch (error) {
    yield put(updateUserRoleProfilesFailed({ ...payload, data: [], error }));
  }
}

export function* watchUser() {
  yield takeLatest(UPDATE_USER_GENERAL, UpdateUserGeneral);
  yield takeLatest(UPDATE_USER_WORK_EXPRIENCE, UpdateUserWorkExprience);
  yield takeLatest(UPDATE_USER_EDUCATION, UpdateUserEducation);
  yield takeLatest(GET_SOCIALS, GetSocials);
  yield takeLatest(UPDATE_USER_SOCIAL_MEDIA, UpdateUserSocialMedia);
  yield takeLatest(GET_GOALS, GetGoals);
  yield takeLatest(UPDATE_USER_GOALS, UpdateUserGoals);
  yield takeLatest(GET_BASIC_TYPE_CATEGORIES, GetBasicTypeCategories);
  yield takeLatest(GET_BASIC_TYPES, GetBasicTypes);
  yield takeLatest(UPDATE_USER_INTERESTS, UpdateUserInterests);
  yield takeLatest(UPDATE_USER_ROLE_PROFILES, UpdateUserRoleProfiles);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetAllUsers),
    fork(watchGetUser),
    fork(watchCreateUser),
    fork(watchdeleteUser),
    fork(watchUser),
  ]);
}
