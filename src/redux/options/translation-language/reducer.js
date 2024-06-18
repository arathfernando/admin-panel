import {
  CREATE_TRANSLATION_LANGUAGE,
  CREATE_TRANSLATION_LANGUAGE_ERROR,
  CREATE_TRANSLATION_LANGUAGE_SUCCESS,
  DELETE_TRANSLATION_LANGUAGE,
  DELETE_TRANSLATION_LANGUAGE_ERROR,
  DELETE_TRANSLATION_LANGUAGE_SUCCESS,
  GET_ALL_TRANSLATION_LANGUAGES,
  GET_ALL_TRANSLATION_LANGUAGES_ERROR,
  GET_ALL_TRANSLATION_LANGUAGES_SUCCESS,
  UPDATE_TRANSLATION_LANGUAGE,
  UPDATE_TRANSLATION_LANGUAGE_ERROR,
  UPDATE_TRANSLATION_LANGUAGE_SUCCESS,
} from '../../types/options/translation-language';

const INIT_STATE = {
  loading: false,
  list: [],
  error: '',
  msg: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TRANSLATION_LANGUAGES:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TRANSLATION_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload?.reverse?.() || [],
      };
    case GET_ALL_TRANSLATION_LANGUAGES_ERROR:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };
    case CREATE_TRANSLATION_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TRANSLATION_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };
    case CREATE_TRANSLATION_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TRANSLATION_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TRANSLATION_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case UPDATE_TRANSLATION_LANGUAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TRANSLATION_LANGUAGE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRANSLATION_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.payload,
      };
    case DELETE_TRANSLATION_LANGUAGE_ERROR:
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
