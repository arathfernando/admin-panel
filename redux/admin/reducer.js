/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-case-declarations */
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
  GET_ALL_ADMIN,
  GET_ALL_ADMIN_ERROR,
  GET_ALL_ADMIN_SUCCESS,
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

const INIT_STATE = {
  loading: false,
  list: [],
  newAdmin: null,
  updateAdmin: null,
  error: '',
  currentAdmin: {
    loading: true,
    data: JSON.parse(
      localStorage.getItem('currentAdmin') || JSON.stringify({})
    ),
  },
  changeAdminPasswordAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateCurrentAdminAction: {
    status: 'idle',
    error: null,
    data: {},
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_ALL_PAGINATION_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_PAGINATION_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case GET_ALL_PAGINATION_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case CREATE_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        updateAdmin: action.payload,
      };
    case UPDATE_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // ------ current_admin ------
    case GET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: {
          ...state.currentAdmin,
          loading: true,
          error: null,
        },
      };
    case GET_CURRENT_ADMIN_SUCCESSFUL:
      const admin_permissions = {};
      action.payload?.admin_role?.forEach?.(({ permission }) => {
        const parsedPermissions = JSON.parse(permission || {});
        for (const key in parsedPermissions) {
          if (parsedPermissions[key]) {
            admin_permissions[key] = parsedPermissions[key];
          }
        }
      });
      const data = {
        ...(action.payload || {}),
        admin_permissions,
      };
      localStorage.setItem('currentAdmin', JSON.stringify(data));
      return {
        ...state,
        currentAdmin: {
          ...state.currentAdmin,
          loading: false,
          error: null,
          data,
        },
      };
    case GET_CURRENT_ADMIN_FAILED:
      localStorage.setItem('currentAdmin', JSON.stringify({}));
      return {
        ...state,
        currentAdmin: {
          ...state.currentAdmin,
          loading: false,
          error: null,
        },
      };
    case UPDATE_CURRENT_ADMIN_DATA:
      const currentAdminData = { ...state.currentAdmin, ...action.payload };
      localStorage.setItem('currentAdmin', JSON.stringify(currentAdminData));
      return {
        ...state,
        currentAdmin: {
          ...state.currentAdminData,
          loading: false,
          error: null,
        },
      };
    // ------ update_user_data ------
    case UPDATE_CURRENT_ADMIN:
      return {
        ...state,
        updateCurrentAdminAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CURRENT_ADMIN_SUCCESSFUL:
      return {
        ...state,
        updateCurrentAdminAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_CURRENT_ADMIN_FAILED:
      return {
        ...state,
        updateCurrentAdminAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ change_admin_password ------
    case CHANGE_ADMIN_PASSWORD:
      return {
        ...state,
        changeAdminPasswordAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case CHANGE_ADMIN_PASSWORD_SUCCESSFUL:
      return {
        ...state,
        changeAdminPasswordAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case CHANGE_ADMIN_PASSWORD_FAILED:
      return {
        ...state,
        changeAdminPasswordAction: {
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
