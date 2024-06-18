import {
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_ALL_USER,
  GET_ALL_USER_ERROR,
  GET_ALL_USER_SUCCESS,
  GET_BASIC_TYPES,
  GET_BASIC_TYPES_FAILED,
  GET_BASIC_TYPES_SUCCESSFUL,
  GET_BASIC_TYPE_CATEGORIES,
  GET_BASIC_TYPE_CATEGORIES_FAILED,
  GET_BASIC_TYPE_CATEGORIES_SUCCESSFUL,
  GET_GOALS,
  GET_GOALS_FAILED,
  GET_GOALS_SUCCESSFUL,
  GET_SOCIALS,
  GET_SOCIALS_FAILED,
  GET_SOCIALS_SUCCESSFUL,
  GET_USER,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  UPDATE_SINGLE_USER,
  UPDATE_USER_EDUCATION,
  UPDATE_USER_EDUCATION_FAILED,
  UPDATE_USER_EDUCATION_SUCCESSFUL,
  UPDATE_USER_GENERAL,
  UPDATE_USER_GENERAL_FAILED,
  UPDATE_USER_GENERAL_SUCCESSFUL,
  UPDATE_USER_GOALS,
  UPDATE_USER_GOALS_FAILED,
  UPDATE_USER_GOALS_SUCCESSFUL,
  UPDATE_USER_INTERESTS,
  UPDATE_USER_INTERESTS_FAILED,
  UPDATE_USER_INTERESTS_SUCCESSFUL,
  UPDATE_USER_ROLE_PROFILES,
  UPDATE_USER_ROLE_PROFILES_FAILED,
  UPDATE_USER_ROLE_PROFILES_SUCCESSFUL,
  UPDATE_USER_SOCIAL_MEDIA,
  UPDATE_USER_SOCIAL_MEDIA_FAILED,
  UPDATE_USER_SOCIAL_MEDIA_SUCCESSFUL,
  UPDATE_USER_WORK_EXPRIENCE,
  UPDATE_USER_WORK_EXPRIENCE_FAILED,
  UPDATE_USER_WORK_EXPRIENCE_SUCCESSFUL,
} from '../types/user';

// update_user_general
export const updateUserGeneral = (payload) => {
  return {
    type: UPDATE_USER_GENERAL,
    payload,
  };
};
export const updateUserGeneralSuccessful = (payload) => {
  return {
    type: UPDATE_USER_GENERAL_SUCCESSFUL,
    payload,
  };
};
export const updateUserGeneralFailed = (payload) => {
  return {
    type: UPDATE_USER_GENERAL_FAILED,
    payload,
  };
};

// update_user_work_exprience
export const updateUserWorkExprience = (payload) => {
  return {
    type: UPDATE_USER_WORK_EXPRIENCE,
    payload,
  };
};
export const updateUserWorkExprienceSuccessful = (payload) => {
  return {
    type: UPDATE_USER_WORK_EXPRIENCE_SUCCESSFUL,
    payload,
  };
};
export const updateUserWorkExprienceFailed = (payload) => {
  return {
    type: UPDATE_USER_WORK_EXPRIENCE_FAILED,
    payload,
  };
};

// update_user_education
export const updateUserEducation = (payload) => {
  return {
    type: UPDATE_USER_EDUCATION,
    payload,
  };
};
export const updateUserEducationSuccessful = (payload) => {
  return {
    type: UPDATE_USER_EDUCATION_SUCCESSFUL,
    payload,
  };
};
export const updateUserEducationFailed = (payload) => {
  return {
    type: UPDATE_USER_EDUCATION_FAILED,
    payload,
  };
};

// get_socials
export const getSocials = () => {
  return {
    type: GET_SOCIALS,
  };
};
export const getSocialsSuccessful = (payload) => {
  return {
    type: GET_SOCIALS_SUCCESSFUL,
    payload,
  };
};
export const getSocialsFailed = (payload) => {
  return {
    type: GET_SOCIALS_FAILED,
    payload,
  };
};

// update_user_social_media
export const updateUserSocialMedia = (payload) => {
  return {
    type: UPDATE_USER_SOCIAL_MEDIA,
    payload,
  };
};
export const updateUserSocialMediaSuccessful = (payload) => {
  return {
    type: UPDATE_USER_SOCIAL_MEDIA_SUCCESSFUL,
    payload,
  };
};
export const updateUserSocialMediaFailed = (payload) => {
  return {
    type: UPDATE_USER_SOCIAL_MEDIA_FAILED,
    payload,
  };
};

// get_goals
export const getGoals = () => {
  return {
    type: GET_GOALS,
  };
};
export const getGoalsSuccessful = (payload) => {
  return {
    type: GET_GOALS_SUCCESSFUL,
    payload,
  };
};
export const getGoalsFailed = (payload) => {
  return {
    type: GET_GOALS_FAILED,
    payload,
  };
};

// update_user_goals
export const updateUserGoals = (payload) => {
  return {
    type: UPDATE_USER_GOALS,
    payload,
  };
};
export const updateUserGoalsSuccessful = (payload) => {
  return {
    type: UPDATE_USER_GOALS_SUCCESSFUL,
    payload,
  };
};
export const updateUserGoalsFailed = (payload) => {
  return {
    type: UPDATE_USER_GOALS_FAILED,
    payload,
  };
};

// get_basic_type_categories
export const getBasicTypeCategories = () => {
  return {
    type: GET_BASIC_TYPE_CATEGORIES,
  };
};
export const getBasicTypeCategoriesSuccessful = (payload) => {
  return {
    type: GET_BASIC_TYPE_CATEGORIES_SUCCESSFUL,
    payload,
  };
};
export const getBasicTypeCategoriesFailed = (payload) => {
  return {
    type: GET_BASIC_TYPE_CATEGORIES_FAILED,
    payload,
  };
};

// get_basic_types
export const getBasicTypes = () => {
  return {
    type: GET_BASIC_TYPES,
  };
};
export const getBasicTypesSuccessful = (payload) => {
  return {
    type: GET_BASIC_TYPES_SUCCESSFUL,
    payload,
  };
};
export const getBasicTypesFailed = (payload) => {
  return {
    type: GET_BASIC_TYPES_FAILED,
    payload,
  };
};

// update_user_interests
export const updateUserInterests = (payload) => {
  return {
    type: UPDATE_USER_INTERESTS,
    payload,
  };
};
export const updateUserInterestsSuccessful = (payload) => {
  return {
    type: UPDATE_USER_INTERESTS_SUCCESSFUL,
    payload,
  };
};
export const updateUserInterestsFailed = (payload) => {
  return {
    type: UPDATE_USER_INTERESTS_FAILED,
    payload,
  };
};
// ---- //

export const getAllUsers = (data) => ({
  type: GET_ALL_USER,
  payload: data,
});

export const getAllUsersSuccess = (data) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: data,
});

export const getAllUsersError = (data) => ({
  type: GET_ALL_USER_ERROR,
  payload: data,
});

export const getSingleUser = (id) => ({
  type: GET_USER,
  payload: id,
});
export const updateSingleUser = (payload) => ({
  type: UPDATE_SINGLE_USER,
  payload,
});

export const getUsersSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUsersError = (data) => ({
  type: GET_USER_ERROR,
  payload: data,
});

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: data,
});

export const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserError = (data) => ({
  type: CREATE_USER_ERROR,
  payload: data,
});

export const deleteUser = (data) => ({
  type: DELETE_USER,
  payload: data,
});
export const deleteUserSuccess = (data) => ({
  type: DELETE_USER_SUCCESS,
  payload: data,
});
export const deleteUserError = (data) => ({
  type: DELETE_USER_ERROR,
  payload: data,
});

// update_user_role_profiles
export const updateUserRoleProfiles = (payload) => {
  return {
    type: UPDATE_USER_ROLE_PROFILES,
    payload,
  };
};
export const updateUserRoleProfilesSuccessful = (payload) => {
  return {
    type: UPDATE_USER_ROLE_PROFILES_SUCCESSFUL,
    payload,
  };
};
export const updateUserRoleProfilesFailed = (payload) => {
  return {
    type: UPDATE_USER_ROLE_PROFILES_FAILED,
    payload,
  };
};
