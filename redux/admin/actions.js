import {
  CHANGE_ADMIN_PASSWORD,
  CHANGE_ADMIN_PASSWORD_FAILED,
  CHANGE_ADMIN_PASSWORD_SUCCESSFUL,
  CREATE_ADMIN,
  CREATE_ADMIN_ERROR,
  CREATE_ADMIN_SUCCESS,
  DELETE_ADMIN,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_SUCCESS,
  GET_ALL_PAGINATION_ADMIN,
  GET_ALL_PAGINATION_ADMIN_ERROR,
  GET_ALL_PAGINATION_ADMIN_SUCCESS,
  GET_CURRENT_ADMIN,
  GET_CURRENT_ADMIN_FAILED,
  GET_CURRENT_ADMIN_SUCCESSFUL,
  UPDATE_ADMIN,
  UPDATE_ADMIN_ERROR,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_CURRENT_ADMIN,
  UPDATE_CURRENT_ADMIN_DATA,
  UPDATE_CURRENT_ADMIN_FAILED,
  UPDATE_CURRENT_ADMIN_SUCCESSFUL,
} from '../types/admin';

export const getAdminsByPagenation = (data) => ({
  type: GET_ALL_PAGINATION_ADMIN,
  payload: data,
});

export const getAdminsByPagenationSuccess = (data) => ({
  type: GET_ALL_PAGINATION_ADMIN_SUCCESS,
  payload: data,
});

export const getAdminsByPagenationErr = (data) => ({
  type: GET_ALL_PAGINATION_ADMIN_ERROR,
  payload: data,
});

export const createAdmin = (data) => ({
  type: CREATE_ADMIN,
  payload: data,
});
export const createAdminSuccess = (data) => ({
  type: CREATE_ADMIN_SUCCESS,
  payload: data,
});
export const createAdminError = (data) => ({
  type: CREATE_ADMIN_ERROR,
  payload: data,
});

export const updateAdmin = (data) => ({
  type: UPDATE_ADMIN,
  payload: data,
});
export const updateAdminSuccess = (data) => ({
  type: UPDATE_ADMIN_SUCCESS,
  payload: data,
});
export const updateAdminError = (data) => ({
  type: UPDATE_ADMIN_ERROR,
  payload: data,
});

export const deleteAdmin = (data) => ({
  type: DELETE_ADMIN,
  payload: data,
});
export const deleteAdminSuccess = (data) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: data,
});
export const deleteAdminError = (data) => ({
  type: DELETE_ADMIN_ERROR,
  payload: data,
});

// ------ current_admin ------
export const getCurrentAdmin = (payload, options) => {
  return {
    type: GET_CURRENT_ADMIN,
    payload,
    options,
  };
};
export const getCurrentAdminSuccessful = (payload) => {
  return {
    type: GET_CURRENT_ADMIN_SUCCESSFUL,
    payload,
  };
};
export const getCurrentAdminFailed = (payload) => {
  return {
    type: GET_CURRENT_ADMIN_FAILED,
    payload,
  };
};

export const updateCurrentAdminData = (payload) => {
  return {
    type: UPDATE_CURRENT_ADMIN_DATA,
    payload,
  };
};

// update_user_data
export const updateCurrentAdmin = (payload) => {
  return {
    type: UPDATE_CURRENT_ADMIN,
    payload,
  };
};
export const updateCurrentAdminSuccessful = (payload) => {
  return {
    type: UPDATE_CURRENT_ADMIN_SUCCESSFUL,
    payload,
  };
};
export const updateCurrentAdminFailed = (payload) => {
  return {
    type: UPDATE_CURRENT_ADMIN_FAILED,
    payload,
  };
};

// change_admin_password
export const changeAdminPassword = (payload) => {
  return {
    type: CHANGE_ADMIN_PASSWORD,
    payload,
  };
};
export const changeAdminPasswordSuccessful = (payload) => {
  return {
    type: CHANGE_ADMIN_PASSWORD_SUCCESSFUL,
    payload,
  };
};
export const changeAdminPasswordFailed = (payload) => {
  return {
    type: CHANGE_ADMIN_PASSWORD_FAILED,
    payload,
  };
};

