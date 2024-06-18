import {
  CREATE_PERMISSION,
  CREATE_PERMISSION_FAILED,
  CREATE_PERMISSION_SUCCESSFUL,
  DELETE_PERMISSION,
  DELETE_PERMISSION_FAILED,
  DELETE_PERMISSION_SUCCESSFUL,
  GET_PERMISSION,
  GET_PERMISSION_FAILED,
  GET_PERMISSION_SUCCESSFUL,
  UPDATE_PERMISSION,
  UPDATE_PERMISSION_FAILED,
  UPDATE_PERMISSION_SUCCESSFUL,
} from '../../types/managements/permission';

// get_permission
export const getPermissions = () => {
  return {
    type: GET_PERMISSION,
  };
};
export const getPermissionsSuccessful = (payload) => {
  return {
    type: GET_PERMISSION_SUCCESSFUL,
    payload,
  };
};
export const getPermissionsFailed = (payload) => {
  return {
    type: GET_PERMISSION_FAILED,
    payload,
  };
};

// create_permission
export const createPermission = (payload) => {
  return {
    type: CREATE_PERMISSION,
    payload,
  };
};
export const createPermissionSuccessful = (payload) => {
  return {
    type: CREATE_PERMISSION_SUCCESSFUL,
    payload,
  };
};
export const createPermissionFailed = (payload) => {
  return {
    type: CREATE_PERMISSION_FAILED,
    payload,
  };
};

// update_permission
export const updatePermission = (payload) => {
  return {
    type: UPDATE_PERMISSION,
    payload,
  };
};
export const updatePermissionSuccessful = (payload) => {
  return {
    type: UPDATE_PERMISSION_SUCCESSFUL,
    payload,
  };
};
export const updatePermissionFailed = (payload) => {
  return {
    type: UPDATE_PERMISSION_FAILED,
    payload,
  };
};

// delete_permission
export const deletePermission = (payload) => {
  return {
    type: DELETE_PERMISSION,
    payload,
  };
};
export const deletePermissionSuccessful = (payload) => {
  return {
    type: DELETE_PERMISSION_SUCCESSFUL,
    payload,
  };
};
export const deletePermissionFailed = (payload) => {
  return {
    type: DELETE_PERMISSION_FAILED,
    payload,
  };
};
