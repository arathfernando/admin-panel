import {
  CREATE_TIMEZONE,
  CREATE_TIMEZONE_ERROR,
  CREATE_TIMEZONE_SUCCESS,
  DELETE_TIMEZONE,
  DELETE_TIMEZONE_ERROR,
  DELETE_TIMEZONE_SUCCESS,
  GET_ALL_TIMEZONE,
  GET_ALL_TIMEZONE_ERROR,
  GET_ALL_TIMEZONE_SUCCESS,
  GET_SINGLE_TIMEZONE,
  GET_SINGLE_TIMEZONE_ERROR,
  GET_SINGLE_TIMEZONE_SUCCESS,
  UPDATE_TIMEZONE,
  UPDATE_TIMEZONE_ERROR,
  UPDATE_TIMEZONE_SUCCESS,
} from '../../types/options/timezone';

const INIT_STATE = {
  loading: false,
  list: [],
  singleTimezone: null,
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TIMEZONE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TIMEZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_TIMEZONE_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_TIMEZONE:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_TIMEZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleTimezone: action.payload,
      };
    case GET_SINGLE_TIMEZONE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_TIMEZONE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TIMEZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_TIMEZONE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TIMEZONE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TIMEZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_TIMEZONE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TIMEZONE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TIMEZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_TIMEZONE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
