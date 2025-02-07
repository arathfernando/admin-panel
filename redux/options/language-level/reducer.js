import {
  CREATE_LANGUAGE_LEVEL,
  CREATE_LANGUAGE_LEVEL_ERROR,
  CREATE_LANGUAGE_LEVEL_SUCCESS,
  DELETE_LANGUAGE_LEVEL,
  DELETE_LANGUAGE_LEVEL_ERROR,
  DELETE_LANGUAGE_LEVEL_SUCCESS,
  GET_ALL_LANGUAGE_LEVEL,
  GET_ALL_LANGUAGE_LEVEL_ERROR,
  GET_ALL_LANGUAGE_LEVEL_SUCCESS,
  GET_SINGLE_LANGUAGE_LEVEL,
  GET_SINGLE_LANGUAGE_LEVEL_ERROR,
  GET_SINGLE_LANGUAGE_LEVEL_SUCCESS,
  UPDATE_LANGUAGE_LEVEL,
  UPDATE_LANGUAGE_LEVEL_ERROR,
  UPDATE_LANGUAGE_LEVEL_SUCCESS,
} from '../../types/options/language-level';

const INIT_STATE = {
  loading: false,
  list: [],
  singleLanguageLevel: null,
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_LANGUAGE_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LANGUAGE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_LANGUAGE_LEVEL_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_LANGUAGE_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_LANGUAGE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        singleLanguageLevel: action.payload,
      };
    case GET_SINGLE_LANGUAGE_LEVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_LANGUAGE_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case CREATE_LANGUAGE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_LANGUAGE_LEVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_LANGUAGE_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LANGUAGE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_LANGUAGE_LEVEL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_LANGUAGE_LEVEL:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LANGUAGE_LEVEL_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_LANGUAGE_LEVEL_ERROR:
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
