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

const INIT_STATE = {
  permissions: {
    loading: false,
    error: null,
    data: [],
  },
  createPermissionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updatePermissionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deletePermissionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ get_permission ------
    case GET_PERMISSION:
      return {
        ...state,
        permissions: {
          ...state.permissions,
          loading: true,
          error: null,
        },
      };
    case GET_PERMISSION_SUCCESSFUL:
      return {
        ...state,
        permissions: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_PERMISSION_FAILED:
      return {
        ...state,
        permissions: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ create_permission ------
    case CREATE_PERMISSION:
      return {
        ...state,
        createPermissionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PERMISSION_SUCCESSFUL:
      return {
        ...state,
        createPermissionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CREATE_PERMISSION_FAILED:
      return {
        ...state,
        createPermissionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_permission ------
    case UPDATE_PERMISSION:
      return {
        ...state,
        updatePermissionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PERMISSION_SUCCESSFUL:
      return {
        ...state,
        updatePermissionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_PERMISSION_FAILED:
      return {
        ...state,
        updatePermissionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_permission ------
    case DELETE_PERMISSION:
      return {
        ...state,
        deletePermissionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PERMISSION_SUCCESSFUL:
      return {
        ...state,
        deletePermissionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_PERMISSION_FAILED:
      return {
        ...state,
        deletePermissionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    default:
      return {
        ...state,
      };
  }
};
