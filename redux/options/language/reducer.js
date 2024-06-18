import {
  CREATE_LANGUAGE,
  CREATE_LANGUAGE_ERROR,
  CREATE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE,
  DELETE_LANGUAGE_ERROR,
  DELETE_LANGUAGE_SUCCESS,
  GET_ALL_LANGUAGE,
  GET_ALL_LANGUAGE_ERROR,
  GET_ALL_LANGUAGE_SUCCESS,
  GET_SINGLE_LANGUAGE,
  GET_SINGLE_LANGUAGE_ERROR,
  GET_SINGLE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_ERROR,
  UPDATE_LANGUAGE_SUCCESS,
} from '../../types/options/language';

const INIT_STATE = {
  loading: false,
  list: [],
  singleLanguage: null,
  newLanguage: null,
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case GET_SINGLE_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleLanguage: action.payload,
      };
    case GET_SINGLE_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_LANGUAGE:
      return {
        ...state,
        loading: true,
      };

    case CREATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };

    case CREATE_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_LANGUAGE_ERROR:
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
